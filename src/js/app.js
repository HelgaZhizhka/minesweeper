import layoutBase from './views/layoutBase.js';
import GameController from './controller/GameController.js';
import DesktopController from './controller/DesktopController.js';
import layoutPopup from './views/layoutPopup.js';

const onLoadPage = () => {
  const layout = layoutBase();
  const layoutMod = layoutPopup();
  document.body.insertAdjacentHTML('afterBegin', layout);
  document.body.insertAdjacentHTML('afterBegin', layoutMod);
  const appContainer = document.querySelector('.app');
  const desktopContainer = document.querySelector('.desktop');

  const desktop = new DesktopController(
    desktopContainer,
  );

  const controller = new GameController(
    appContainer,
  );
  desktop.init();
  controller.init();
};

document.addEventListener('DOMContentLoaded', onLoadPage);
