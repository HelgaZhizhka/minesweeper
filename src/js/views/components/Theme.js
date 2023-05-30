export default class Theme {
  constructor(parentContainer, themeModel) {
    this.parentContainer = parentContainer;
    this.themeModel = themeModel;
    this.switcher = this.createSwitcher();
    this.updateTheme();
    this.switcher.checked = this.themeModel.getCurrentTheme() === 'dark';
  }

  createSwitcher() {
    const switcher = this.parentContainer.querySelector(
      'input[type="checkbox"]',
    );
    switcher.addEventListener('change', () => {
      this.themeModel.toggleTheme();
      this.updateTheme();
    });
    return switcher;
  }

  updateTheme() {
    const html = document.documentElement;
    html.classList.remove('light-theme', 'dark-theme');
    html.classList.add(`${this.themeModel.getCurrentTheme()}-theme`);
  }
}
