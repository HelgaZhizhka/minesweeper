import DesktopModel from '../models/DesktopModel.js';
import DesktopView from '../views/DesktopView.js';
import ThemeModel from '../models/Theme.js';
import Theme from '../views/components/Theme.js';

export default class DesktopController {
  constructor(desktopContainer) {
    this.model = new DesktopModel(desktopContainer);
    this.view = new DesktopView(desktopContainer);
    this.themeModel = new ThemeModel();
    this.themeView = new Theme(
      desktopContainer.querySelector('.switcher'),
      this.themeModel,
    );
  }

  init() {
    this.model.updateClock();
  }
}
