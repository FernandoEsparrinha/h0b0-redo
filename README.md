# ♪ h0b0 𝓻𝓮𝓭𝓸 ♫

Welcome to the repository for the online audiovisual experience of *h0b0*'s 𝓻𝓮𝓭𝓸 album. This project is inspired by the underlying circularity of the album's concept. As 𝓻𝓮𝓭𝓸 implies, this circle is ever present — *a loop*. Each song is a circle by itself, loopable, infinite. Join these pieces and compose the larger circle, the album.

### [Enjoy the experience *here*.](https://redo.h0b0.me)

---

You can find more on h0b0 in the following places:
- [Official website](https://h0b0.me)
- [Instagram](https://www.instagram.com/h0b0.o/)
- [Bandcamp](https://h0b0.bandcamp.com/) ← *grab a tape!*

You can also listen to it in the usual platforms:
- [Apple Music](https://music.apple.com/pt/artist/h0b0/1527390265)
- [Soundcloud](https://soundcloud.com/h0b0-music)
- [Spotify](https://open.spotify.com/artist/6UGDB3kkXgSU4xIM4bqEbJ?si=dUcpNSEQQ9OMOtVn29VvMw)
- [Tidal](https://listen.tidal.com/artist/20839036)

---

### Development

This project was developed using [p5.js](https://p5js.org/), a JavaScript library for creative coding. If you would like to learn more, we suggest you look at the official [p5.js website](https://p5js.org/) and references, along with [The Coding Train](https://thecodingtrain.com/)'s tutorials and content.

We can decompose the project into two layers.

#### Interface
> The interface gives the user the controls and information on the musical component. The circles allow the tracks to be changed. Below that, you have the display. There you can see the track name, time, loop status, and playback speed.

#### Visuals
> The background images can be regarded as a separate layer, although still related to the musical component. These visualisations are done through the use of **glsl shaders**.

You can learn more about shaders in p5js in this [guide](https://itp-xstory.github.io/p5js-shaders/#/) by *Casey Conchinha* and *Louise Lessél*. *Aferriss* has a great collection of heavily commented [p5js Shader Examples](https://github.com/aferriss/p5jsShaderExamples). And for even more examples and inspiration you can check [Shadertoy](https://www.shadertoy.com/).

#### In this project the following shaders were ported and modified:
- [Northern Lights Blazing Bright](https://www.shadertoy.com/view/wdf3Rf) by *TEttinger*, 2019-01-09
- [feedback hueish](https://www.shadertoy.com/view/ttSXzc) by *aferriss*, 2019-08-23
- [p5-canvas-crt](https://glitch.com/~p5-canvas-crt) by *kcconch*, *Lousielessel*, ported from [MattiasCRT](https://www.shadertoy.com/view/Ms23DR) by *Mattias*, 2013-12-08

---

### Issues
#### Mobile
- [ ] issue: MusicController stop() not working;
- [ ] issue: shaders not working in webapp landscape mode;
- [ ] issue: speed buttons stay highlighted on click;

#### Desktop
- [ ] issue: looping songs and changing with keyboard arrows does not remove looping state of previous track;

### Technical
#### Web:
- [ ] download music to cache (faster loading if page is refreshed, save data);
