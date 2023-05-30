import shuffleArray from '../utils/shuffleArray.js';
import Timer from './Timer.js';
import Cell from './Cell.js';

export default class GameModel {
  constructor(
    appContainer,
    size = 10,
    minesCount = 10,
  ) {
    this.size = size;
    this.minesCount = minesCount;
    this.flagsCount = 0;
    this.mines = [];
    this.openedCells = [];
    this.firstMove = false;
    this.directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]; // all possible directions
    this.gameOver = false; // game over flag
    this.timer = new Timer(appContainer.querySelector('.timer'));
    this.timer.initTimer();
    this.clickCount = 0;
    this.board = this.createEmptyBoard();
    this.highScores = [];
  }

  createEmptyBoard() {
    const board = [];
    for (let i = 0; i < this.size; i++) {
      board[i] = [];
      for (let j = 0; j < this.size; j++) {
        const cell = new Cell(
          i,
          j,
          false,
        );
        board[i][j] = cell;
      }
    }
    return board;
  }

  // generates mines on the board,
  // except for the cell with the coordinates (firstX, firstY)
  generateMines(firstX, firstY) {
    let allCoordinates = [];

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (x !== firstX || y !== firstY) {
          allCoordinates.push({ x, y });
        }
      }
    }
    allCoordinates = shuffleArray(allCoordinates);

    this.mines = allCoordinates.slice(0, this.minesCount);
    this.mines.forEach(({ x, y }) => {
      const cell = this.getCell(x, y);
      cell.hasMine = true;
      this.calculateMinesAround(x, y);
    });
  }

  // calculates the number of mines around the cell
  calculateMinesAround(x, y) {
    this.directions.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;

      if (this.isValidCell(newX, newY)) {
        const cell = this.getCell(newX, newY);
        cell.minesAround++;
      }
    });
  }

  // checks if the cell is a mine on first click
  makeFirstMove(x, y) {
    this.firstMove = true;
    this.generateMines(x, y);
    this.openCell(x, y);
  }

  // get cell by coordinates
  getCell(x, y) {
    return this.board[x][y];
  }

  // Checks if the cell with the given x and y coordinates is within the playing field.
  isValidCell(x, y) {
    return x >= 0 && y >= 0 && x < this.size && y < this.size;
  }

  revealAllCells() {
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        const cell = this.getCell(x, y);
        cell.open();
        if (cell.flagged && cell.hasMine) {
          cell.element.classList.add('is-flagged-mine');
        }
      }
    }
  }

  isCellOpen(x, y) {
    const cell = this.getCell(x, y);
    return cell.isOpen || cell.flagged;
  }

  openCell(x, y) {
    const cell = this.board[x][y];
    if (cell.isOpen || cell.hasMine) {
      return; // cell already open
    }
    cell.open();
    this.openedCells.push({ x, y });
    if (cell.minesAround === 0) {
      // if there are no mines around the cell
      this.directions.forEach(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        if (this.isValidCell(newX, newY)) {
          this.openCell(newX, newY);
        }
      });
    }
  }

  flagCell(x, y) {
    const cell = this.board[x][y];
    if (cell.isOpen) {
      return;
    }
    cell.flag();
    if (cell.flagged) {
      this.flagsCount++;
    } else {
      this.flagsCount--;
    }
  }

  startTimer() {
    this.timer.startTimer();
  }

  resetTimer() {
    this.timer.resetTimer();
  }

  stopTimer() {
    this.timer.stopTimer();
  }

  getCurrentTime() {
    return this.timer.getCurrentTime();
  }

  updateTimer(timeStamp) {
    return this.timer.updateTimer(timeStamp);
  }

  getTimerSeconds() {
    return this.timer.seconds;
  }

  addHighScore(score) {
    this.highScores.push(score);
    if (this.highScores.length > 10) {
      this.highScores.shift();
    }
  }

  getHighScores() {
    return this.highScores;
  }

  serialize() {
    const state = {
      board: this.board,
      gameOver: this.gameOver,
      openedCells: this.openedCells,
      flagsCount: this.flagsCount,
      size: this.size,
      firstMove: this.firstMove,
      minesCount: this.minesCount,
      clickCount: this.clickCount,
      highScores: this.highScores,
    };
    return JSON.stringify(state);
  }

  deserialize(serializedState) {
    const state = JSON.parse(serializedState);
    this.size = state.size;
    this.firstMove = state.firstMove;
    this.minesCount = state.minesCount;
    this.clickCount = state.clickCount;
    this.openedCells = state.openedCells;
    this.flagsCount = state.flagsCount;
    this.highScores = state.highScores;
    this.gameOver = state.gameOver;
    this.board = state.board.map((row) => row.map((cellData) => {
      const cell = new Cell(
        cellData.x,
        cellData.y,
        cellData.hasMine,
      );
      cell.flagged = cellData.flagged;
      cell.isOpen = cellData.isOpen;
      cell.minesAround = cellData.minesAround;
      return cell;
    }));
  }
}
