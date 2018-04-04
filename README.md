# Speach

Speach is an experimental API to offer a simple interface on top of the very cool web Speech Synthesis API.

Try it out [here](https://speach.glitch.me/).

Speach works like this:

```js
const speaker = speach();

speaker
    .voice("UK Google English Female")
    .speak("Hello")
    .voice("Fred")
    .speak("there")
    .then(() => console.log("Done speaking."));
```

## Why?

### Cover up cross-browser curiosities

The Speech Synthesis API is funky across browsers. In Chrome you add a `voiceschanged` event listener to the `speechSynthesis` global before you can access it, in others you can access it immediately. Speach takes care of this business for you.

The package also papers over at least one [browser bug](https://github.com/ericandrewlewis/speach/blob/e8350c4a1f8a019440828cdcf3824c294aaaf527/script.js#L65-L68) for you.

### A declarative API

In the Speech Synthesis API you create Utterances which you send to the Speech Synthesis API:

```js
const utterance = new SpeechSynthesisUtterance(textToSpeak);
utterance.voice = speechSynthesis.getVoices[0];
speechSynthesis.speak(utterance);
```

Speach offers a declarative API so you can say something with two lines of code:

```js
const speaker = speach();
speaker.speak("Hi");
```

### Chainable API calls

Speach offers a chainable API to link together separate spoken phrases. You can change the voice for the next `speak` like this:

```js
speaker
    .voice("UK Google English Female")
    .speak("Good day to you")
    .voice("Fred")
    .speak("Thank you how are you")
    .voice("UK Google English Female")
    .speak("Just fine thank you");
```

You can use `.then()` within the chain and pass an onFulfilled function much like you do with Promise chains:

```js
speaker
    .voice("Fred")
    .speak("When is the next train")
    .then(() => console.log("Google English Female checks the schedule"))
    .voice("UK Google English Female")
    .speak("Just fine thank you")
    .then(() => console.log("End scene"));
```

## What voices are offered?

It depends on the browser and operating system! Check out [the Speech Synthesis API Voices demo](https://speech-synthesis-api-voices-demo.glitch.me/) to see what are available on your platform.

Speach will fallback to the default voice if you try to use a voice that doesn't exist in someone's browser:

```js
speaker
    .voice("Keanu Reeves")
    .speak("Woah");
```
