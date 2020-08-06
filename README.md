# h0b0-redo ♫
[h0b0](https://h0b0.me/) redo web album experience project.

This project is inspired by the circularity of the album's concept, redo. The loop is ever present — a circle.

## Development
### Create a circular element that represents the album:
- [x] polygon with n vertices (18 → album-size);
- [x] each vertex contains a circle (song);
- [x] clickable circles that jump to song;

### Music Controller
- [x] song loop mode;
- [x] album loop mode;
- [ ] user controls for album / song mode;

### Circles
- [x] on hover: animate color;
- [ ] on hover: animate circle size;
- [ ] isPlaying: circle reacts to sound;

### Background visuals (shaders):
- [x] made template gradient background with GLSL;
- [ ] imported and played video on the background;
- [ ] applied effects to imported video;
- [ ] effect manipulation: mouseXY changes;
- [ ] effect manipulation: audio reactivity;

### Responsiveness
- [ ] adapt to canvas/screen resize (e.g. device rotation);
- [ ] polygon/circles drawing on smaller screens (does the polygon method work);

## Technical
### Web:
- [ ] deploy for testing (github page);

[h0b0's website](hobo.me) is currently hosted on [Cargo](https://cargo.site/).
  - can the project be hosted there?
    - access required to the account.
  - can the project specific page be hosted in GitHub and keep the **h0b0.me** url?
    - example: h0b0.me/redo
