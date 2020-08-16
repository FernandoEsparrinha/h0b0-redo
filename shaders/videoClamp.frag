// Shader obtained from
// https://www.shadertoy.com/view/MtyXRc
//
// solved texture issue with
// https://github.com/Jam3/jam3-lesson-webgl-shader-intro/issues/1

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;

uniform sampler2D tex0;

#define mode 4

void main() {

    vec2 uv    = gl_FragCoord.xy / resolution.xy;
    vec2 mouse = mouse.xy / resolution.xy;

    #if mode == 0 
        //vertical stripes
        vec4 t = texture2D(tex0, vec2(uv.x + mouse.x, clamp(uv.y, mouse.y-0.005, mouse.y) + mouse.y));
    #endif
        
    #if mode == 1
        //horizontal halfsies
        vec4 t = texture2D(tex0, vec2(clamp(uv.x, mouse.x-0.005, mouse.x), uv.y + mouse.y));
    #endif
        
    #if mode == 2
        //top down curtain
        vec4 t = texture2D(tex0, vec2(uv.x, clamp(uv.y, 0.0, mouse.y)));
    #endif
        
    #if mode == 3
        //left right curtain
        vec4 t = texture2D(tex0, vec2(clamp(uv.x, 0.0, mouse.x), uv.y));
    #endif
        
    #if mode == 4
        //horizontal stripes meet in the middle 
        vec4 t = texture2D(tex0, vec2(clamp(uv.x, 1.0 - mouse.x, mouse.x) + mouse.y, uv.y));
    #endif
        
    #if mode == 5
        //vertical stripes meet in the middle
        vec4 t = texture2D(tex0, vec2(uv.x, clamp(uv.y, 1.0 - mouse.y, mouse.y) + mouse.x));
    #endif
    
    gl_FragColor = t;
}