import GameModel from '../models/GameModel';
import SoundModel from '../models/SoundModel.js';
import GameView from '../views/GameView.js';

export default class GameController {
  constructor(appContainer) {
    this.sound = new SoundModel();
    this.soundToggle = document.querySelector('.sound');
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleFlagCell = this.handleFlagCell.bind(this);
    this.isLoadedState = false;
    this.model = new GameModel(appContainer);
    this.view = new GameView(
      appContainer,
      this.handleCellClick,
      this.handleFlagCell,
      this.popupElement,
    );
  }

  init() {
    if (localStorage.getItem('userGameState')) {
      this.view.updateLoadedGameState(true);
    }
    this.model.size = this.view.options.getSelectedSize();
    this.model.minesCount = this.view.options.getSliderMines();
    this.view.renderBoard(this.model.board);
    this.view.updateMineCounter(this.model.minesCount);
    this.view.updateMoveCounter(this.model.ClickCount);
    this.view.updateFlagsCounter(this.model.flagsCount);
    this.view.handleControlClick(this.handleStartGameClick.bind(this));
    this.view.handleSizeChange(this.handleSizeChange.bind(this));
    this.view.handleMinesChange(this.handleMinesChange.bind(this));
    this.view.handleHighScores(this.handleHighScores.bind(this));
    this.view.handleSaveGame(this.handleSaveGame.bind(this));
    this.view.handleLoadGame(this.handleLoadGame.bind(this));
    this.sound.loadSound('click', 'audio/btn-click.mp3');
    this.sound.loadSound('over', 'audio/game-over.wav');
    this.sound.loadSound('win', 'audio/game-win.wav');
    this.sound.loadSound('mine', 'audio/mine.wav');
    this.sound.loadSound('flag', 'audio/flag.wav');
    this.soundToggle.addEventListener('click', this.toggleSound.bind(this));
  }

  updateBoardView() {
    for (let x = 0; x < this.model.board.length; x++) {
      for (let y = 0; y < this.model.board[x].length; y++) {
        const cell = this.model.getCell(x, y);
        cell.updateCell();
      }
    }
  }

  toggleSound() {
    this.sound.toggleMute();
    if (this.sound.isMuted) {
      this.soundToggle.classList.add('muted');
    } else {
      this.soundToggle.classList.remove('muted');
    }
  }

  resetGame(size, minesCount) {
    this.sound.stopAllSounds();
    this.model.resetTimer();
    this.model.stopTimer();
    this.model.gameOver = false;
    this.model.firstMove = false;
    this.model.openedCells = [];
    this.model.flagsCount = 0;
    this.model.size = size;
    this.model.minesCount = minesCount;
    this.model.board = this.model.createEmptyBoard();
    this.view.renderBoard(this.model.board);
    this.view.updateMineCounter(this.model.minesCount);
    this.view.updateGameStatus('new');
    this.model.clickCount = 0;
    this.model.flagsCount = 0;
    this.view.updateFlagsCounter(this.model.flagsCount);
    this.view.updateMoveCounter(this.model.clickCount);
  }

  setScore(status) {
    const score = {
      name: 'Gamer1',
      mode: this.model.size,
      moves: this.model.clickCount,
      time: this.model.getCurrentTime(),
      gameStatus: status,
    };
    this.model.addHighScore(score);
  }

  handleHighScores() {
    const scores = this.model.getHighScores();
    this.view.openPopup('scoreTable', 0, 0, scores, true);
  }

  handleSaveGame() {
    if (!this.model.gameOver && this.model.openedCells.length > 0) {
      this.saveGameState();
      this.isLoadedState = true;
      this.view.updateLoadedGameState(this.isLoadedState);
      this.view.openPopup('saveGame');
    }
  }

  handleLoadGame() {
    this.loadGameState();
    this.view.openPopup('loadGame');
  }

  handleCellClick(x, y) {
    if (this.model.gameOver) {
      return;
    }
    const cell = this.model.getCell(x, y);
    if (cell.isFlagged || cell.isOpen) {
      return;
    }

    this.model.clickCount++;
    this.view.updateMoveCounter(this.model.clickCount);
    this.view.updateFlagsCounter(this.model.flagsCount);

    if (!this.model.firstMove) {
      this.model.makeFirstMove(x, y);
      this.model.startTimer();
    }

    if (this.isLoadedState) {
      this.model.startTimer();
      this.isLoadedState = false;
    }

    this.model.openCell(x, y);

    // If a cell was open, then update all open cells
    if (cell.isOpen) {
      this.model.openedCells.forEach(({ x: openedX, y: openedY }) => {
        const currCell = this.model.getCell(openedX, openedY);
        currCell.updateCell();
      });
    }

    if (cell.hasMine) {
      // Game Over
      if (!this.sound.isMuted) {
        this.sound.playSound('mine');
        this.sound.playSound('over');
      }
      this.model.gameOver = true;
      this.view.updateGameStatus('lose');
      this.model.stopTimer();
      this.view.markActiveMine(x, y);
      this.model.revealAllCells();
      this.updateBoardView();
    } else if (
      this.model.openedCells.length ===
      this.model.size ** 2 - this.model.minesCount
    ) {
      if (!this.sound.isMuted) {
        this.sound.playSound('win');
      }
      this.model.gameOver = true;
      this.model.stopTimer();
      const time = Math.floor(this.model.getCurrentTime());
      const gameStatus = 'win';
      this.setScore(gameStatus);
      this.view.updateGameStatus(gameStatus);
      const scores = this.model.getHighScores();
      this.view.openPopup(gameStatus, time, this.model.clickCount, scores);
    } else if (!this.sound.isMuted) {
      this.sound.playSound('click');
    }
  }

  handleStartGameClick() {
    const size = this.view.options.getSelectedSize();
    const mines = this.view.options.getSliderMines();
    this.resetGame(size, mines);
  }

  handleFlagCell(x, y) {
    this.model.flagCell(x, y);
    const cell = this.model.getCell(x, y);
    this.view.updateFlagsCounter(this.model.flagsCount);
    if (!this.sound.isMuted && !cell.isOpen) {
      this.sound.playSound('flag');
    }
  }

  handleOptionsChange(size, mines) {
    this.resetGame(size, mines);
  }

  handleSizeChange(size) {
    this.resetGame(size, this.model.minesCount);
  }

  handleMinesChange(mines) {
    this.resetGame(this.model.size, mines);
  }

  saveGameState() {
    const serializedState = this.model.serialize();
    const time = this.model.getTimerSeconds();
    localStorage.setItem('userGameState', serializedState);
    localStorage.setItem('userGameTime', time);
  }

  loadGameState() {
    const serializedState = localStorage.getItem('userGameState');
    const time = localStorage.getItem('userGameTime');
    if (serializedState) {
      this.isLoadedState = true;
      this.model.deserialize(serializedState);
      this.model.updateTimer(time);
      this.view.renderBoard(this.model.board);
      this.updateBoardView();
      this.view.updateGameStatus('new');
      this.view.updateMineCounter(this.model.minesCount);
      this.view.updateMoveCounter(this.model.clickCount);
      this.view.updateFlagsCounter(this.model.flagsCount);
    }
  }
}
