export default class Cell {
  constructor(x, y, hasMine = false) {
    this.x = x;
    this.y = y;
    this.hasMine = hasMine;
    this.flagged = false;
    this.isOpen = false;
    this.minesAround = 0;
    this.element = this.createCell();
  }

  createCell() {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.x = this.x;
    cell.dataset.y = this.y;
    return cell;
  }

  open() {
    this.isOpen = true;
    this.updateCell();
  }

  flag() {
    this.flagged = !this.flagged;
    this.updateCell();
  }

  updateCell() {
    this.element.classList.remove('is-open', 'is-mine', 'is-flagged');
    this.element.textContent = '';
    if (this.isOpen) {
      this.element.classList.add('is-open');
      if (!this.hasMine && this.minesAround > 0) {
        this.element.dataset.number = this.minesAround;
        this.element.textContent = this.minesAround;
      }
      if (!this.flagged && this.hasMine) {
        this.element.classList.add('is-mine');
      }
      if (this.flagged && !this.hasMine) {
        this.flagged = !this.flagged;
        this.element.classList.remove('is-flagged');
      }
    }
    if (this.flagged) {
      this.element.classList.add('is-flagged');
    }
  }
}
