export default class ControlButton {
  constructor(parentContainer) {
    this.parentContainer = parentContainer;
    this.controlElement = this.createControl();
    this.updateControlStatus('new');
  }

  createControl() {
    const controlElement = document.createElement('button');
    controlElement.classList.add('control', 'cell');
    this.parentContainer.appendChild(controlElement);
    return controlElement;
  }

  updateControlStatus(status) {
    const statusBtn = this.controlElement;
    statusBtn.classList.remove('is-start', 'is-lose', 'is-win');
    switch (status) {
      case 'new':
        statusBtn.classList.add('is-start');
        break;
      case 'lose':
        statusBtn.classList.add('is-lose');
        break;
      case 'win':
        statusBtn.classList.add('is-win');
        break;
      default:
        break;
    }
  }
}
