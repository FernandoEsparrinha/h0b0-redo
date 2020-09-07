# h0b0-redo ♫
[h0b0](https://h0b0.me/) redo web album experience project.

This project is inspired by the circularity of the album's concept, redo. The loop is ever present — a circle.

Official album content available [here](https://drive.google.com/drive/folders/1kbU2m7MsgDR70X9ytpOXQHqAP5D7XkWZ).

[h0b0_dissatisfaction](https://youtu.be/twTQTY6uEU8)

[h0b0_another_missed_call](https://youtu.be/5mxBF0tPP5g)

## Development
### Create a circular element that represents the album:
- [x] polygon with n vertices (18 → album-size);
- [x] each vertex contains a circle (song);
- [x] clickable circles that jump to song;

### Music Controller
- [x] song loop mode;
- [x] album loop mode;
- [x] user controls for album / song mode;

### Circles
- [x] on hover: animate color;
- [x] on hover: animate circle size;
- [x] isPlaying: circle reacts to sound;

### Background visuals (shaders):
- [x] made template gradient background with GLSL;
- [x] imported and played video on the background;
- [x] applied effects to imported video;
- [ ] effect manipulation: audio reactivity;

### Responsiveness
- [ ] adapt to canvas/screen resize (e.g. device rotation);
- [ ] polygon/circles drawing on smaller screens (does the polygon method work);

### Lyrics
- [ ] use album typeface to write the song's lyrics;

## Technical
### Web:
- [ ] deploy for testing (github page);

[h0b0's website](hobo.me) is currently hosted on [Cargo](https://cargo.site/).
  - can the project be hosted there?
    - access required to the account.
  - can the project specific page be hosted in GitHub and keep the **h0b0.me** url?
    - example: h0b0.me/redo
