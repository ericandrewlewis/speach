# Speach

Speach is an experimental API to offer a simple interface on top of the very cool web Speech Synthesis API.

Speach works like this:

```js
const speaker = speach();

speaker
    .voice("UK Google English Female")
    .speak("Oh hello")
    .voice("Bells")
    .speak("How are you today?")
    .then(() => console.log("Done speaking."));
```
