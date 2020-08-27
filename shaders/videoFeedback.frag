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

uniform float u_amplitude;
uniform float u_time;
uniform float u_playbackPosition;
uniform float u_playbackSpeed;

uniform float u_mouseDown;

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

  // scale the uvs up just a tad for a feedback zoom
  // feedbackUv *= 1.0 + (u_amplitude * 0.1);
  feedbackUv.x *= 0.999 + (u_amplitude * 0.001);
  feedbackUv.y *= 0.999 + (u_amplitude * 0.001);
  
  feedbackUv = rotate2d(sin(0.01) * 3.1415) * feedbackUv;
  
  // return the uvs to 0 - 1 range
  feedbackUv = feedbackUv * 0.5 + 0.5;
  
  // get the webcam
  vec4 cam = texture2D(tex0, uv);

  // make a copy of the camera
  vec4 tex = cam;
  
  // if the mouse isn't clicked we'll run the feedback loop
  if(u_mouseDown == 0.0){

    // calculate an angle from the hue
    // we will use these to offset the texture coordinates just a little bit
    vec3 hsb = rgb2hsb(cam.rgb);
    float angleX = sin((u_amplitude*0.1) * PI);
    float angleY = sin((u_amplitude*0.1) * PI);

    

    // add those angles to the tex coords and sample the feedback texture
    tex = texture2D(tex1, feedbackUv);

    // tex.r += 0.001;
    // tex.g -= 0.002;
    // tex.b += 0.002;

    // add some camera from the screen
    tex.rgb += cam.rgb * 0.002;

    // if tex.b > 1.0, invert the texture and swizzle the color channels around
    if(step(1.0,tex.r) == 1.0){
      tex.r = 0.0;
    }
    if(step(1.0,tex.g) == 1.0){
      tex.g = 0.0;
    }
    if(step(1.0,tex.b) == 1.0){
      tex.b = 0.0;
    }
    
    // tex.rgb = mix(tex.rgb, 1.0 -tex.gbr, step(1.0, tex.b) );
  } 
  
  // render the output
  gl_FragColor = tex;
}