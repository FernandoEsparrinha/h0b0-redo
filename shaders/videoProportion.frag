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
  vec2 uv = gl_FragCoord.xy / resolution;
  
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

  // get the webcam as a vec4 using texture2D
  vec4 tex = texture2D(tex0, uv);

  gl_FragColor = tex;
}