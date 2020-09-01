// obtained from
// https://github.com/aferriss/p5jsShaderExamples

precision mediump float;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our textures coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;

uniform float u_time;
uniform float u_mouseDown;

uniform float u_amplitude;
uniform float u_playbackPosition;
uniform float u_playbackSpeed;

// convolution kernel
// 0 emboss, 1 sharpen, 2 gaussian blur, 3 edge detect
#define mode 1
uniform vec2 stepSize;
uniform float dist;
vec2 offset[9];
float kernel[9];
float kernelWeight = 0.0;
vec4 conv = vec4(0.0);

// color conversion functions
vec3 rgb2hsb(vec3 c){
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
  vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsb2rgb(vec3 c){
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// 2d rotation function
mat2 rotate2d(float angle)
{
  return mat2(cos(angle), -sin(angle),
              sin(angle), cos(angle));
}

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  
  // make a copy of the uvs
  vec2 feedbackUv = uv;

  // move the uv space between -1 and 1
  feedbackUv = uv * 2.0 - 1.0;

  // zoom
  feedbackUv.x *= 1. + (0.2 - (u_amplitude * 0.6));
  feedbackUv.y *= 1. + (0.2 - (u_amplitude * 0.6));
  
  // rotate
  feedbackUv = rotate2d(sin(u_amplitude) * 0.01 * TWO_PI) * feedbackUv;
  
  // return the uvs to 0 - 1 range
  feedbackUv = feedbackUv * 0.5 + 0.5;

  #if mode == 0 // emboss kernel
    kernel[0] = -2.0; kernel[1] = -1.0; kernel[2] = 0.0;
    kernel[3] = -1.0; kernel[4] = 1.0; kernel[5] = 1.0;
    kernel[6] = 0.0; kernel[7] = 1.0; kernel[8] = 2.0;
  #endif

  #if mode == 1 // sharpen kernel
    kernel[0] = -1.0; kernel[1] = 0.0; kernel[2] = -1.0;
    kernel[3] = 0.0; kernel[4] = 5.0; kernel[5] = 0.0;
    kernel[6] = -1.0; kernel[7] = 0.0; kernel[8] = -1.0;
  #endif

  #if mode == 2 // gaussian blur kernel
    kernel[0] = 1.0; kernel[1] = 2.0; kernel[2] = 1.0;
    kernel[3] = 2.0; kernel[4] = 4.0; kernel[5] = 2.0;
    kernel[6] = 1.0; kernel[7] = 2.0; kernel[8] = 1.0;
  #endif

  #if mode == 3 // edge detect kernel
    kernel[0] = -1.0; kernel[1] = -1.0; kernel[2] = -1.0;
    kernel[3] = -1.0; kernel[4] = 8.0; kernel[5] = -1.0;
    kernel[6] = -1.0; kernel[7] = -1.0; kernel[8] = -1.0;
  #endif

  offset[0] = vec2(-stepSize.x, -stepSize.y);     // top left
  offset[1] = vec2(0.0, -stepSize.y);             // top middle
  offset[2] = vec2(stepSize.x, -stepSize.y);      // top right
  offset[3] = vec2(-stepSize.x, 0.0);             // middle left
  offset[4] = vec2(0.0, 0.0);                     // middle
  offset[5] = vec2(stepSize.x, 0.0);              // middle right
  offset[6] = vec2(-stepSize.x, stepSize.y);      // bottom left
  offset[7] = vec2(0.0, stepSize.y);              // bottom middle
  offset[8] = vec2(stepSize.x, stepSize.y);       // bottom right

  for(int i = 0; i<9; i++) {
    //sample a 3x3 grid of pixels
    vec4 color = texture2D(tex0, uv + offset[i]*dist);

    // multiply the color by the kernel value and add it to our conv total
    conv += color * kernel[i];

    // keep a running tally of the kernel weights
    kernelWeight += kernel[i];
  }

  // normalize the convolution by dividing by the kernel weight
  conv.rgb /= kernelWeight;

  // grab the texture
  //vec4 tex = texture2D(tex0, uv);
  vec4 tex = vec4(conv.rgb, 1.0);

  // make a copy of the texture
  vec4 texCopy = tex;
  
  // if the mouse isn't clicked we'll run the feedback loop
  if(u_mouseDown == 0.0){

    // calculate an angle from the hue
    // we will use these to offset the texture coordinates just a little bit
    vec3 hsb = rgb2hsb(tex.rgb);
    float angleX = sin(u_amplitude) * TWO_PI;
    float angleY = sin(u_amplitude) * TWO_PI;

    // add those angles to the tex coords and sample the feedback texture
    texCopy = texture2D(tex1, feedbackUv);

    tex.r += 0.02;
    tex.g -= 0.06;
    tex.b += 0.02;

    // add some tex from the screen
    texCopy.rgb += tex.rgb * 0.5;

    // if tex.b > 1.0, invert the texture and swizzle the color channels around
    if(step(1.0,texCopy.r) == 1.0){
      texCopy.r = 0.0;
    }
    if(step(1.0,texCopy.g) == 1.0){
      texCopy.g = 0.0;
    }
    if(step(1.0,texCopy.b) == 1.0){
      texCopy.b = 0.0;
    }
    
    //texCopy.rgb = mix(texCopy.rgb, 1.0 -texCopy.gbr, step(1.0, texCopy.b));
  } 
  
  // render the output
  gl_FragColor = texCopy;
}