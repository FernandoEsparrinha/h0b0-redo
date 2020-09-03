// obtained from
// https://www.shadertoy.com/view/ttSXzc

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
uniform sampler2D tex1;

uniform vec2 u_resolution;

uniform float u_time;
uniform float u_mouseDown;

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(clamp(fract(c.xxx + K.xyz), 0.0, 0.999) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 texel = 1.0 / u_resolution.xy;
    
    // zoom texture coordinates
    vec2 tc = uv;
    tc = tc * 2.0 - 1.0;
    tc *= 0.997;
    tc = tc * 0.5 + 0.5;
    
    vec4 fb = texture2D(tex0, tc);
    fb.rgb = rgb2hsv(fb.rgb);
    
    // get the xy angles from the hue
    float xAngle = cos(fb.r * 6.28);
    float yAngle = sin(fb.r * 6.28);
    
    // The amount
    vec2 amt = texel.xy;
    
    // Sample texture
    vec4 colOut = texture2D(tex1, tc - vec2(xAngle, yAngle) * amt);
    
    // Update hsv a little every time through the loop
    colOut.rgb = rgb2hsv(colOut.rgb);
    colOut.r += 0.001;
    colOut.g += 0.004;
    colOut.b += 0.001; 
    
    colOut.rgb = hsv2rgb(colOut.rgb);
    
    gl_FragColor = colOut;
    
    // Seed the buffer with noise
    if(u_time < 1.0){
        gl_FragColor = texture2D(tex0, uv);
    }
    
    if(u_mouseDown == 0.0){
        gl_FragColor = colOut;
    } else {
        gl_FragColor = texture2D(tex0, uv);
    }   
}