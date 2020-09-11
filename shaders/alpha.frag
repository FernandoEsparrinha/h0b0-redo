// The MIT License
// Copyright © 2017 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Compares compositing layers back to front and front to back. Inspired by ollj's https://www.shadertoy.com/view/4tscRf

// https://www.shadertoy.com/view/Xlsyzf


#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex0;
uniform sampler2D tex1;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 vTexCoord;


const float kGamma = 2.2;   // set this to 1.0 to see the wrong way to blend colors (the way Photoshop does)

vec4 over( in vec4 a, in vec4 b )
{
    return a + b*(1.0-a.w);
}

vec4 gamma2linear_premultalpha( vec4 c )
{
    return vec4( pow( c.xyz, vec3(kGamma) )*c.w, c.w);
}

vec4 linear2gamma_premultalpha( vec4 c )
{
    return vec4( pow(c.xyz/c.w,vec3(1.0/kGamma) ), 1.0 );
}
    
void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 u = (-u_resolution.xy + 2.0 * gl_FragCoord.xy) / min(u_resolution.x, u_resolution.y);

    vec4 bg = texture2D(tex0, uv);
    vec4 ui = texture2D(tex1, uv);
    
    // colors. Note gamma and premultiplication
    vec4 c0 = gamma2linear_premultalpha(bg);
    vec4 c1 = gamma2linear_premultalpha(ui);

    vec4 cr;
    
    cr = c0;
    cr = over(c1,cr);

    // undo premultiply and gamma, for display
    gl_FragColor = linear2gamma_premultalpha( cr );
}