import Popup from './components/Popup.js';

export default class DesktopView {
  constructor(desktopContainer) {
    this.desktopContainer = desktopContainer;
    this.popupElement = new Popup();
    this.labels = this.createLabels();
  }

  createLabels() {
    const desktopMenuLinks = this.desktopContainer.querySelectorAll(
      '.desktop__list .list__link',
    );
    const desktopStartLink = this.desktopContainer.querySelector('.desktop__start');
    desktopMenuLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const { state } = event.currentTarget.dataset;
        this.openPopup(state);
      });
    });
    desktopStartLink.addEventListener('click', (event) => {
      event.preventDefault();
      const { state } = event.currentTarget.dataset;
      this.openPopup(state);
    });
    return desktopMenuLinks;
  }

  openPopup(state) {
    switch (state) {
      case 'windows':
        this.popupElement.openPopup('Windows', 'А что вы ожидали тут увидеть? Это же всего лишь игра сапёр. Прододжайте играть!', 'warning');
        break;
      case 'computer':
        this.popupElement.openPopup(
          'Computer',
          'Ваши файлы в безопасности... наверное. Ну если нет, то купите себе новый. А пока играйте в сапёр!',
          'danger',
        );
        break;
      case 'bin':
        this.popupElement.openPopup(
          'Recycle Bin',
          'Ваша корзина пуста. Можете поместить туда эту игру, но лучше просто поиграйте в нее 🙂',
          'warning',
        );
        break;
      case 'ie':
        this.popupElement.openPopup(
          'Internet Explorer',
          'Ошибка. Повторите попытку позже. А лучше играйте в сапёр!',
          'danger',
        );
        break;
      default:
        break;
    }
  }
}
