export default () => `<div class='desktop'>
  <div class="desktop__screen">
    <div class="desktop__labels">
      <ul class="desktop__list list">
        <li class="list__item"><span class="list__link" data-state="computer"><i class="icon icon_computer"></i>My Computer</span></li>
        <li class="list__item"><span class="list__link" data-state="ie"><i class="icon icon_ie"></i>Internet Explorer</span></li>
        <li class="list__item"><span class="list__link" data-state="bin"><i class="icon icon_bin"></i>Recycle Bin</span></li>
      </ul>
    </div>
    <div class='app desktop__app'>
      <div class='app__header'>
        <h2 class='app__heading'><i class="icon icon_mine"></i>Minesweeper</h2>
        <span class="app__close" data-popup="closeApp"><i class="icon icon_close"></i></span>
      </div>
      <div class="app__options">
        <div class="app__select-type">
          <div class="app__select-mode"></div>
          <div class="app__slider-mine"></div>
        </div>
        <div class="app__score"><button class="app__button button" data-popup="scoreTable"><span>Score Table</span></button></div>
        <div class="app__save"><button class="app__button button" data-popup="saveGame"><span>Save Game</span></button></div>
        <div class="app__save"><button class="app__button button" data-popup="loadGame"><span>Load Game</span></button></div>
      </div>
      <div class='app__board'>
        <div class='app__actions'>
          <span class="app__timer">
            <span class="timer"></span>
          </span>
          <span class='app__control'></span>
          <span class="app__counters counters">
          <span class="counters__item"><span class="counters__title">mines</span><span class="counters__mine"></span></span>
          <span class="counters__item"><span class="counters__title">steps</span><span class="counters__move"></span></span>
            <span class="counters__item"><span class="counters__title">flags</span><span class="counters__flag"></span></span>
          </span>
        </div>
      </div>
      <div class='app__footer'></div>
    </div>
    <div class="desktop__panel">
      <span class="desktop__start" data-state="windows"><i class="icon icon_windows"></i>Start</span>
      <div class="desktop__badges"></div>
      <div class="desktop__inform">
        <div class="switcher">
          <label class="switcher__label" for="theme">
            <input type="checkbox" id="theme" />
            <div class="switcher__slider"></div>
          </label>
        </div>
        <span class="sound"><i class="icon icon_sound"></i></span>
        <span class="desktop__clock"></span>
      </div>
    </div>
  </div>
</div>`;
