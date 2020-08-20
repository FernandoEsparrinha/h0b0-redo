#ifdef GL_ES
precision mediump float;
#endif

#define mode 2

// our texture coming from p5
uniform sampler2D tex0;

// resolution
uniform vec2 u_resolution;

// video size
uniform vec2 u_texResolution;

void main() {
  vec2 uv = gl_FragCoord.xy;

  vec2 margin = vec2(10);
  vec2 screenRes = u_resolution.xy - 2.0 * margin;
  //vec2 screenRes = u_resolution.xy - 2.0;
  vec2 texRes = u_texResolution.xy;
  vec2 ratio = screenRes / texRes;

  uv = uv - margin;

  #if mode == 0 // fit height, keep ratio
    uv = uv / (texRes * ratio.y);
  #endif

  #if mode == 1 // fit width, keep ratio
    uv = uv / (texRes * ratio.x);
  #endif

  #if mode == 2 // fit rectangle, keep ratio
    // centering the blank part
    uv = uv - (0.5 * texRes * max(vec2(ratio.x - ratio.y, ratio.y - ratio.x), 0.0));
    uv = uv / (texRes * min(ratio.x, ratio.y));
  #endif

  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

  // zoom out factor
  uv = uv * 1.0;

  if (fract(uv) == uv) {
    gl_FragColor = texture2D(tex0, uv);
  } else {
    gl_FragColor = gl_FragColor-gl_FragColor;
  }

  //gl_FragColor = fract(uv) == uv ? texture2D(tex0, uv) : gl_FragColor-gl_FragColor;
}