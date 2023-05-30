export default class OptionsPanel {
  constructor(parentContainer) {
    this.parentContainer = parentContainer;
    this.sizeSelectElement = this.createSizeSelect();
    this.mineSliderElement = this.createMineSlider();
  }

  createSizeSelect() {
    const selectElement = document.createElement('select');
    selectElement.classList.add('select');
    selectElement.innerHTML = `
      <option value="10">10x10</option>
      <option value="15">15x15</option>
      <option value="25">25x25</option>
    `;
    this.parentContainer
      .querySelector('.app__select-mode')
      .appendChild(selectElement);
    return selectElement;
  }

  createMineSlider() {
    const sliderElement = document.createElement('input');
    const sliderContainer = this.parentContainer.querySelector('.app__slider-mine');
    sliderElement.setAttribute('type', 'range');
    sliderElement.setAttribute('min', '10');
    sliderElement.setAttribute('max', '99');
    sliderElement.setAttribute('value', '10');
    sliderElement.classList.add('slider');
    sliderContainer.appendChild(sliderElement);
    return sliderElement;
  }

  setOnSizeChange(callback) {
    this.sizeSelectElement.addEventListener('change', () => {
      const size = this.getSelectedSize();
      callback(size);
    });
  }

  setOnMinesChange(callback) {
    this.mineSliderElement.addEventListener('input', () => {
      const mines = this.getSliderMines();
      callback(mines);
    });
  }

  getSelectedSize() {
    return +this.sizeSelectElement.value;
  }

  getSliderMines() {
    return +this.mineSliderElement.value;
  }
}
