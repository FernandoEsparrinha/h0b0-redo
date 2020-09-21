# h0b0-redo ♫
[h0b0](https://h0b0.me/) redo web album experience project.

This project is inspired by the circularity of the album's concept, redo. The loop is ever present — a circle.

Official album content available [here](https://drive.google.com/drive/folders/1kbU2m7MsgDR70X9ytpOXQHqAP5D7XkWZ).

[h0b0_dissatisfaction](https://youtu.be/twTQTY6uEU8)

[h0b0_another_missed_call](https://youtu.be/5mxBF0tPP5g)

## Development
### Background visuals (shaders):
- [ ] generate noise instead of using a static image;
- [ ] finetune feedback behaviour for each song;
- [ ] prevent fullscreen "colour cycling";

### Responsiveness
- [ ] adapt to canvas/screen resize (e.g. device rotation);

### Mobile
- [ ] issue: screen shuts down after a while;
- [ ] issue: MusicController stop() not working;
- [ ] issue: speed buttons stay highlighted on click;
- [ ] issue: resolve conflict between showing #display div on wide screens and not showing it during loading;
- [ ] layout: iOS Safari displays buttons differently;
- [ ] layout: rework polygon size and position;

## Technical
### Web:
- [x] deploy for preview ([github page](https://fernandoesparrinha.github.io/h0b0-redo/));
- [ ] download music to cache (faster loading if page is refreshed, save data);

[h0b0's website](hobo.me) is currently hosted on [Cargo](https://cargo.site/).
  - can the project be hosted there?
    - access required to the account.
  - can the project specific page be hosted in GitHub and keep the **h0b0.me** url?
    - example: h0b0.me/redo
    - is GitHub fast enough for a fast loading?
