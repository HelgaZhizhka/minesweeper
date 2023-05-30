export default class CountersPanel {
  constructor(parentContainer) {
    this.parentContainer = parentContainer;
    this.mineElement = this.createMineCounter();
    this.flagElement = this.createFlagCounter();
    this.moveElement = this.createMoveCounter();
  }

  createMineCounter() {
    const mineElement = document.createElement('span');
    mineElement.classList.add('mine', 'app__input');
    this.parentContainer
      .querySelector('.counters__mine')
      .appendChild(mineElement);
    return mineElement;
  }

  createFlagCounter() {
    const flagElement = document.createElement('span');
    flagElement.classList.add('flag', 'app__input');
    this.parentContainer
      .querySelector('.counters__flag')
      .appendChild(flagElement);
    return flagElement;
  }

  createMoveCounter() {
    const moveElement = document.createElement('span');
    moveElement.classList.add('move', 'app__input');
    this.parentContainer
      .querySelector('.counters__move')
      .appendChild(moveElement);
    return moveElement;
  }

  updateMinesCounter(count = 0) {
    this.mineElement.textContent = count;
  }

  updateMoveCounter(count = 0) {
    this.moveElement.textContent = count;
  }

  updateFlagsCounter(count = 0) {
    this.flagElement.textContent = count;
  }
}
