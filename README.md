# Speach

Speach is an experimental API to offer a simple interface on top of the very cool web Speech Synthesis API.

Try it out [here](https://speach.glitch.me/).

Speach works like this:

```js
const speaker = speach();

speaker
    .voice("UK Google English Female")
    .speak("Hi")
    .voice("Bells")
    .speak("there")
    .then(() => console.log("Done speaking."));
```
