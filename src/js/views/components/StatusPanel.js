export default class StatusPanel {
  constructor(statusContainer) {
    this.parentContainer = statusContainer;
    this.statusElement = this.createStatusPanel();
    this.updateStatus('New game');
  }

  createStatusPanel() {
    const statusElement = document.createElement('span');
    statusElement.classList.add('status');
    this.parentContainer.appendChild(statusElement);
    return statusElement;
  }

  updateStatus(status) {
    this.statusElement.textContent = status;
  }
}
