export default () => `<div class="popup">
  <div class="popup__bg" data-action="close-popup"></div>
  <div class="popup__container">
    <div class="popup__header">
      <h3 class="popup__title"></h2>
      <span class="popup__close" data-action="close-popup"><i class="icon icon_close"></i></span>
    </div>
    <div class="popup__body">
      <i class="popup__icon"></i>
      <div class="popup__message">
      </div>
    </div>
  </div>
</div>`;
