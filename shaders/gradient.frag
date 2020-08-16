// webgl requires that the first line of the fragment shader specify the precision
// precision is dependent on device, but higher precision variables have more zeros
// sometimes you'll see bugs if you use lowp so stick to mediump or highp
precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

// pass in the width and height of the screen
uniform vec2 resolution;

// define the center for the radial graident
vec2 center = vec2(0.5, 0.5);

// colors
vec4 color1 = vec4(0.1, 0.8, 0.9, 1.0); // cyan
vec4 color2 = vec4(0.9, 0.1, 0.8, 1.0); // magenta

// mode 0 (radial gradient), mode 1 (linear gradient)
#define mode 0

// the fragment shader has one main function too
// this is kinda of like the draw() function in p5
// main outputs a variable called gl_FragColor which will contain all the colors of our shader
// the word void means that the function doesn't return a value
// this function is always called main()
void main() {

  // copy the vTexCoord
  // vTexCoord is a value that goes from 0.0 - 1.0 depending on the pixels location
  // we can use it to access every pixel on the screen
  // vec2 uv = vTexCoord;

  #if mode == 0
    // https://www.shadertoy.com/view/XtXyWH
    float aspect = resolution.x / resolution.y;
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    
	  uv.x *= aspect;
    center.x *= aspect;
    float dist = distance(uv, center);
    
    vec4 gradient = mix(color2, color1, dist);
  #endif
  
  #if mode == 1
    vec2 uv = vTexCoord;

    // colors in shaders go from 0.0 to 1.0
    // glsl is very finicky about the decimal points 
    // lets make a gradient by mixing two colors
    // we are going to use the built in mix() function to blend between two vec3's
    // mix takes 3 arguments
    // mix(color1, color2, gradient mask)

    // lets use the texcoords as a mask for the mix function
    // what happens if you choose uv.y instead?
    // what about length(uv) ?
    float mask = uv.x;

    // the mix function
    vec4 gradient = mix(color1, color2, mask);
  #endif

  // gl_FragColor is a vec4 and is expecting red, green, blue, alpha
  gl_FragColor = vec4(gradient);
}