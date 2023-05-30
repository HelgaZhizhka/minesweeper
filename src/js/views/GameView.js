import ControlButton from './components/ControlButton.js';
import StatusPanel from './components/StatusPanel.js';
import CountersPanel from './components/CountersPanel.js';
import OptionsPanel from './components/OptionsPanel.js';
import Popup from './components/Popup.js';

export default class GameView {
  constructor(appContainer, cellCallback, flagCallback) {
    this.appContainer = appContainer;
    this.boardElement = this.createBoard();
    this.options = this.createOptions();
    this.control = this.createControl();
    this.statusPanel = this.createStatusPanel();
    this.cellCallback = cellCallback;
    this.flagCallback = flagCallback;
    this.counters = new CountersPanel(
      this.appContainer.querySelector('.app__counters'),
    );
    this.scoreTable = this.createScoreTable();
    this.popupElement = new Popup();
    this.popupLinks = this.createPopupLinks();
  }

  createPopupLinks() {
    const popupLinks = this.appContainer.querySelectorAll('[data-popup]');
    popupLinks.forEach((link) => {
      if (link.dataset.popup === 'loadGame') {
        const button = link;
        button.disabled = true;
      }
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const state = event.currentTarget.dataset.popup;
        if (this.highScoresHandler && state === 'scoreTable') {
          this.highScoresHandler();
        } else if (this.saveGameHandler && state === 'saveGame') {
          this.saveGameHandler();
        } else if (this.loadGameHandler && state === 'loadGame') {
          this.loadGameHandler();
        } else {
          this.openPopup(state);
        }
      });
    });
    return popupLinks;
  }

  createBoard() {
    const boardContainer = this.appContainer.querySelector('.app__board');
    const boardElement = document.createElement('div');
    boardElement.classList.add('board');
    boardContainer.appendChild(boardElement);
    return boardElement;
  }

  createControl() {
    const controlContainer = this.appContainer.querySelector('.app__control');
    const control = new ControlButton(controlContainer); // create control button for new game
    return control;
  }

  createOptions() {
    const optionsContainer = this.appContainer.querySelector('.app__options');
    const options = new OptionsPanel(optionsContainer);
    return options;
  }

  createStatusPanel() {
    const statusContainer = this.appContainer.querySelector('.app__footer');
    const statusPanel = new StatusPanel(statusContainer); // create panel for game status
    return statusPanel;
  }

  createScoreTable() {
    const scoreTable = document.createElement('div');
    scoreTable.classList.add('score-table');
    this.appContainer.querySelector('.app__score').appendChild(scoreTable);
    return scoreTable;
  }

  renderBoard(board) {
    this.boardElement.innerHTML = ''; // board cleaning
    const size = board.length;
    for (let y = 0; y < size; y++) {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row', `row_${size}`);
      for (let x = 0; x < board[y].length; x++) {
        const cell = board[x][y];
        rowElement.appendChild(cell.element);
        cell.element.addEventListener('click', () => this.cellCallback(x, y));
        cell.element.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          this.flagCallback(x, y);
        });
      }
      this.boardElement.appendChild(rowElement);
    }
  }

  updateMineCounter(count) {
    this.counters.updateMinesCounter(count);
  }

  updateMoveCounter(count) {
    this.counters.updateMoveCounter(count);
  }

  updateFlagsCounter(count) {
    this.counters.updateFlagsCounter(count);
  }

  getCellElement(x, y) {
    return this.boardElement.querySelector(`[data-x="${x}"][data-y="${y}"]`); // getting a cell by coordinates
  }

  markActiveMine(x, y) {
    const cellElement = this.getCellElement(x, y);
    cellElement.classList.add('is-active-mine');
  }

  updateLoadedGameState(isLoaded) {
    const loadGameBtn = this.appContainer.querySelectorAll(
      '[data-popup="loadGame"]',
    );
    loadGameBtn[0].disabled = !isLoaded;
  }

  updateGameStatus(status) {
    this.control.updateControlStatus(status);
    let statusString = '';
    switch (status) {
      case 'new':
        statusString = 'New game';
        break;
      case 'lose':
        statusString = 'Game over 😫 Try again 👆';
        break;
      case 'win':
        statusString = 'You are a winner! 🥳';
        break;
      default:
        break;
    }
    this.statusPanel.updateStatus(statusString);
  }

  handleHighScores(callback) {
    this.highScoresHandler = callback;
  }

  handleSaveGame(callback) {
    this.saveGameHandler = callback;
  }

  handleLoadGame(callback) {
    this.loadGameHandler = callback;
  }

  handleControlClick(callback) {
    this.control.controlElement.addEventListener('click', () => callback());
  }

  handleSizeChange(callback) {
    this.options.setOnSizeChange(callback);
  }

  handleMinesChange(callback) {
    this.options.setOnMinesChange(callback);
  }

  static formatScoreTable(scores) {
    if (!scores.length) {
      return 'No scores yet';
    }
    const layoutTable = `<table class="table">
      <thead><tr><th>№</th><th>Name</th><th>Mode</th><th>Time</th><th>Moves</th><th>Status</th></tr></thead>
      <tbody>
      ${scores.map((score, index) => `<tr>
      <td>${index + 1}</td>
      <td>${score.name}</td>
      <td>${score.mode}</td>
      <td>${score.time}</td>
      <td>${score.moves}</td>
      <td>${score.gameStatus}</td>
      </tr>`).join('')}
      </tbody>
    </table>`;
    return layoutTable;
  }

  openPopup(state, time = 0, moves = 0, scores = null, isLayout = false) {
    const scoreTable = scores ? GameView.formatScoreTable(scores) : '';
    switch (state) {
      case 'win':
        this.popupElement.openPopup(
          'MineSweeper',
          `Hooray!!!🔥🏆 You found all the mines in ${time} seconds and ${moves} moves!`,
        );
        break;
      case 'closeApp':
        this.popupElement.openPopup(
          'MineSweeper',
          'Эту игру невозможно закрыть. Продолжайте играть!',
          'warning',
        );
        break;
      case 'scoreTable':
        this.popupElement.openPopup('Scrore Table', scoreTable, 0, isLayout);
        break;
      case 'saveGame':
        this.popupElement.openPopup(
          'Save Game',
          'Игра сохранена. Можете ее загрузить по нажатию на кнопку Load Game',
        );
        break;
      case 'loadGame':
        this.popupElement.openPopup('load Game', 'Ваша игра загружена!');
        break;
      default:
        break;
    }
  }
}
