precision mediump float;

// our texture coming from p5
uniform sampler2D tex0;

// resolution
uniform vec2 resolution;

// video size
uniform float videoSizeW;
uniform float videoSizeH;

// define the center
vec2 center = vec2(0.5, 0.5);

void main() {
  vec2 coord = gl_FragCoord.xy / resolution;
  vec3 color = vec3(0.0);

  gl_FragColor = texture2D(tex0, coord);
}