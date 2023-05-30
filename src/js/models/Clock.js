export default class Clock {
  constructor(clockElement) {
    this.clockElement = clockElement;
  }

  updateClock() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const meridiem = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = Clock.formatClockComponent(hours);
    const formattedMinutes = Clock.formatClockComponent(minutes);

    const timeString = `${formattedHours}:${formattedMinutes} ${meridiem}`;
    this.clockElement.textContent = timeString;
  }

  static formatClockComponent(component) {
    return component < 10 ? `0${component}` : component;
  }
}
