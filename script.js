class Speaker {
  constructor(afterAPILoaded) {
    this.browserSupportsFeature = this.browserSupportsFeature();
    if (!this.browserSupportsFeature) {
      console.warn("Your browser does not support the Speech Synthesis API 😔");
      return;
    }
    this._voice = null;
    this.utterances = {};
    this.loadAPI();
  }

  loadAPI() {
    this.promiseChain = new Promise((resolve, reject) => {
      if (!this.browserSupportsFeature) {
        resolve();
      }
      if (speechSynthesis.getVoices().length) {
        this.voices = speechSynthesis.getVoices();
        this.voice();
        resolve();
      } else {
        speechSynthesis.addEventListener("voiceschanged", () => {
          this.voices = speechSynthesis.getVoices();
          this.voice();
          resolve();
        });
      }
    });
  }

  voice(name) {
    if (!this.browserSupportsFeature) {
      return;
    }
    this.promiseChain = this.promiseChain.then(() => {
      let found = this.voices.find(voice => voice.name === name);
      if (!found) {
        found = this.voices.find(voice => voice.default);
      }
      this._voice = found;
      return;
    });
  }

  rate(rate) {
    this.promiseChain = this.promiseChain.then(() => {
      this._rate = rate;
    });
  }

  browserSupportsFeature() {
    return "speechSynthesis" in window;
  }

  speak(textToSpeak) {
    if (!this.browserSupportsFeature) {
      return;
    }
    this.promiseChain = this.promiseChain.then(() => {
      return new Promise((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.voice = this._voice;
        speechSynthesis.speak(utterance);

        // Store the utterance to ensure its onend event fires in Chrome.
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=509488
        const createdAt = new Date().getTime();
        this.utterances[createdAt] = utterance;

        utterance.onend = evt => {
          delete this.utterances[createdAt];
          resolve();
        };
      });
    });
  }

  then(thenable) {
    this.promiseChain = this.promiseChain.then(thenable);
  }
}

// Create a factory function so we only expose a shallow object as the public API
// which proxies function calls to the Speaker class.
const createSpeaker = () => {
  const speaker = new Speaker();
  return {
    voice(name) {
      speaker.voice(name);
      return this;
    },
    speak(textToSpeak) {
      speaker.speak(textToSpeak);
      return this;
    },
    then(thenable) {
      speaker.then(thenable);
      return this;
    }
  };
};

const speaker = createSpeaker();

speaker
  .voice("Google UK English Female")
  .speak("it was the best of times")
  .voice("Bells")
  .speak("it was the worst of times")
  .then(() => console.log("the book is over"));
