export default class Popup {
  constructor() {
    this.popupElement = this.createPopup();
  }

  createPopup() {
    const popupElement = document.body.querySelector('.popup');
    document.body
      .querySelectorAll('[data-action="close-popup"]')
      .forEach((element) => {
        element.addEventListener('click', () => {
          this.closePopup();
        });
      });
    return popupElement;
  }

  openPopup(title, message, icon = null, isLayout = false) {
    if (message !== '') {
      if (isLayout) {
        this.popupElement
          .querySelector('.popup__message')
          .insertAdjacentHTML('afterBegin', message);
      } else {
        this.popupElement.querySelector('.popup__message').textContent = message;
      }
      this.popupElement.querySelector('.popup__title').textContent = title;
      this.popupElement
        .querySelector('.popup__icon')
        .classList.add(`icon_${icon}`);
      this.popupElement.classList.add('is-open');
    }
  }

  closePopup() {
    this.popupElement.classList.remove('is-open');
    this.popupElement.querySelector('.popup__title').textContent = '';
    this.popupElement.querySelector('.popup__message').textContent = '';
    this.popupElement
      .querySelector('.popup__icon')
      .classList.remove('icon_danger', 'icon_warning');
  }
}
