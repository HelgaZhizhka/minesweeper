import Clock from './Clock.js';

export default class DesktopModel {
  constructor(desktopContainer) {
    this.desktopContainer = desktopContainer;
    this.clock = this.createClock();
  }

  createClock() {
    const clockElement = this.desktopContainer.querySelector('.desktop__clock');
    const clock = new Clock(clockElement);
    return clock;
  }

  updateClock() {
    this.clock.updateClock();
  }
}
