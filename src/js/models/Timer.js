export default class Timer {
  constructor(timerElement) {
    this.timerElement = timerElement;
    this.digitElement1 = null;
    this.digitElement2 = null;
    this.digitElement3 = null;
    this.timerId = null;
    this.startTime = null;
    this.endTime = null;
    this.seconds = 0;
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  static formatTimerComponent(component) {
    switch (true) {
      case component < 10:
        return `00${component}`;
      case component < 100:
        return `0${component}`;
      default:
        return component;
    }
  }

  initTimer() {
    this.digitElement1 = document.createElement('span');
    this.digitElement2 = document.createElement('span');
    this.digitElement3 = document.createElement('span');
    this.digitElement1.classList.add('timer__digit');
    this.digitElement2.classList.add('timer__digit');
    this.digitElement3.classList.add('timer__digit');
    this.timerElement.appendChild(this.digitElement1);
    this.timerElement.appendChild(this.digitElement2);
    this.timerElement.appendChild(this.digitElement3);
    this.updateTimerImages();
  }

  startTimer() {
    if (this.timerId) {
      return;
    }
    this.startTime = new Date();

    this.timerId = setInterval(() => {
      this.seconds++;
      this.updateTimerImages();
    }, 1000);
  }

  stopTimer() {
    if (!this.timerId) {
      return;
    }
    clearInterval(this.timerId);
    this.endTime = new Date();
    this.timerId = null;
  }

  updateTimer(timeStamp) {
    this.seconds = timeStamp;
    this.updateTimerImages();
  }

  resetTimer() {
    this.stopTimer();
    this.endTime = null;
    this.startTime = null;
    this.seconds = 0;
    this.updateTimerImages();
    this.startTimer();
  }

  getCurrentTime() {
    if (this.startTime) {
      if (this.endTime) {
        return (this.endTime - this.startTime) / 1000;
      }
      return (new Date() - this.startTime) / 1000;
    }
    return 0;
  }

  updateTimerImages() {
    const timeString = Timer.formatTimerComponent(`${this.seconds}`);
    [this.digitElement1, this.digitElement2, this.digitElement3].forEach(
      (el, indx) => {
        el.classList.remove(
          'd-0',
          'd-1',
          'd-2',
          'd-3',
          'd-4',
          'd-5',
          'd-6',
          'd-7',
          'd-8',
          'd-9',
        );
        el.classList.add(`d-${timeString.charAt(indx)}`);
      },
    );
  }
}
