#ifdef GL_ES
precision mediump float;
#endif

#define PI      3.14159265359
#define TWO_PI  6.28318530718

varying vec2 vTexCoord; // texcoords from vert shader
uniform sampler2D tex0; // image
uniform sampler2D tex1; // feedback buffer-texture

uniform vec2 u_resolution;
uniform float u_mouseDown;
uniform float u_time;

vec3 rgb2hsv(vec3 c){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(clamp(fract(c.xxx + K.xyz), 0.0, 0.999) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 texel = 1.0 / u_resolution.xy;
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.y = 1.0 - uv.y;          // textures are loaded upside down, flip them

    vec2 tc = uv;               // texture coordinates
    tc = tc * 2.0 - 1.0;        // move the uv space between -1 and 1
    tc *= 1.0001;               // zoom the uvs
    tc = tc * 0.5 + 0.5;        // return the uvs to 0 - 1 range

    vec4 source = texture2D(tex0, uv);  // original image-video

    vec4 fb = texture2D(tex1, tc);
    fb.rgb = rgb2hsv(fb.rgb);

    // get the xy angles from the hue
    float xAngle = cos(fb.r * TWO_PI);
    float yAngle = sin(fb.r * TWO_PI);

    // The amount
    vec2 amt = texel.xy * 2.;

    // Sample texture
    vec4 colOut = texture2D(tex1, tc - vec2(xAngle, yAngle) * amt);

    // Update hsv a little every time through the loop
    colOut.rgb = rgb2hsv(colOut.rgb);
    colOut.r += 0.0020;
    colOut.g += 0.0040;
    colOut.b += 0.0030;
    
    colOut.rgb = hsv2rgb(colOut.rgb);

    // if COLOR > 1.0, invert the texture and swizzle the color channels around
    // if(step(1.0, colOut.r) == 1.0) {
    //   colOut.r = 0.0;
    // }
    // if(step(1.0, colOut.g) == 1.0){
    //   colOut.g = 0.0;
    // }
    // if(step(1.0, colOut.b) == 1.0){
    //   colOut.b = 0.0;
    // }

    gl_FragColor = colOut;

    // Seed the buffer with noise
    if(u_time < 1.0) {
        gl_FragColor = texture2D(tex0, uv);
    }
    
    if(u_mouseDown > 0.0) {
        gl_FragColor = texture2D(tex0, uv);
    }
}