export default class SoundModel {
  constructor() {
    this.sounds = {};
    this.isMuted = false;
  }

  loadSound(key, src) {
    const audio = new Audio();
    audio.src = src;
    this.sounds[key] = audio;
  }

  playSound(key) {
    const audio = this.sounds[key];
    if (audio) {
      audio.play();
    }
  }

  pauseSound(key) {
    const audio = this.sounds[key];
    if (audio) {
      audio.pause();
    }
  }

  stopSound(key) {
    const audio = this.sounds[key];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  stopAllSounds() {
    Object.values(this.sounds).forEach((audio) => {
      const curAudio = audio;
      curAudio.pause();
      curAudio.currentTime = 0;
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAllSounds();
    }
  }
}
