export default class Theme {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  toggleTheme() {
    if (this.currentTheme === 'light') {
      this.currentTheme = 'dark';
    } else {
      this.currentTheme = 'light';
    }
    this.saveTheme();
  }

  saveTheme() {
    localStorage.setItem('theme', this.currentTheme);
  }
}
