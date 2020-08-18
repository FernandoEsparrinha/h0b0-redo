precision mediump float;

// our texture coming from p5
uniform sampler2D tex0;

// resolution
uniform vec2 u_resolution;

// video size
uniform vec2 u_texResolution;

void main() {
  // gl_FragCoord — contains the window-relative coordinates of the current fragment
  
  /*
  // center the coordinate system
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  float aspectRatio = u_texResolution.x / u_texResolution.y;

  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

  // get the webcam as a vec4 using texture2D
  vec4 tex = texture2D(tex0, uv);

  gl_FragColor = tex;
  */

  vec2 uv = gl_FragCoord.xy;

  vec2 margin = vec2(10);
  vec2 Sres = u_resolution.xy - 2.0 * margin;
  vec2 Tres = u_texResolution.xy;
  vec2 ratio = Sres / Tres;

  uv -= margin;

  // centering the blank part in case of rectangle fit
  uv -= 0.5 * Tres * max(vec2(ratio.x - ratio.y, ratio.y - ratio.x), 0.0);

  uv /= Tres * ratio.y;                 // fit height, keep ratio
  //uv /= Tres * ratio.x;                 // fit width, keep ratio
  //uv /= Tres * min(ratio.x, ratio.y);   // fit rectangle,  keep ratio
  uv *= 1.0;  // zoom out factor

  gl_FragColor = fract(uv) == uv ? texture2D(tex0, uv) : gl_FragColor - gl_FragColor;
}