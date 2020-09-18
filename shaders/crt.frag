// casey conchinha - @kcconch ( https://github.com/kcconch )
// louise lessel - @louiselessel ( https://github.com/louiselessel )
// more p5.js + shader examples: https://itp-xstory.github.io/p5js-shaders/
// ported from shadertoy 'MattiasCRT' by Mattias: https://www.shadertoy.com/view/Ms23DR

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

varying vec2 vTexCoord;     // texcoords from vert shader
uniform sampler2D tex0;     // feedback shader image

uniform vec2 u_resolution;  // [width, height]
uniform float u_time;       // millis() / 1000.0)

// Loosely based on postprocessing shader by inigo quilez, License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

vec2 curve(vec2 uv)
{
	uv = (uv - 0.5) * 2.0;                              // change coordinates to (-1, 1) range
	uv *= 1.1;                                          // zoom out
	uv.x *= 1.0 + pow((abs(uv.y) / 5.0), 2.0);          // x axis curvature distortion
	uv.y *= 1.0 + pow((abs(uv.x) / 4.0), 2.0);          // y axis curvature distortion
	uv  = (uv / 2.0) + 0.5;                             // reset coordinates back to (0, 1) range
	uv =  uv * 0.92 + 0.04;                             // zoom in
	return uv;
}

void main() {
    vec2 q = vTexCoord;                                 // q = original texture uv
    q.y = 1.0 - q.y;                                    // flip uv for proper display
    vec3 oriCol = texture2D(tex0, vec2(q.x,q.y) ).xyz;  // input texture and uv defined as original color

    vec2 uv = q;                                        // manipulated uv are initially equal to q
    uv = curve( uv );                                   // apply the curve distortion function to the uv
    
    // vertical oscillation
	float x = sin(0.30 * u_time + uv.y * 21.0)
            * sin(0.70 * u_time + uv.y * 29.0)
            * sin(0.33 * u_time + uv.y * 31.0 + 0.3)
            * tan(0.02 * u_time + uv.y * 2.0)
            * 0.0017;                                   // overall intensity of the effect

    // colors
    vec3 col;

    // color offset (rgb split) "layer1"
    // colorChannel = texture2D(tex0, oscillation + horizontal axis + offset, vertical axis + offset) + colorChannelSaturation
    col.r = texture2D(tex0, vec2(x + uv.x + 0.001, uv.y + 0.001)).x + 0.05;
    col.g = texture2D(tex0, vec2(x + uv.x + 0.000, uv.y - 0.002)).y + 0.05;
    col.b = texture2D(tex0, vec2(x + uv.x - 0.002, uv.y + 0.000)).z + 0.05;

    // color offset (rgb split) "layer2"
    // colorChannel += attenuationFactor * texture2D(...)
    col.r += 0.08 * texture2D(tex0, 0.75 * vec2(x + 0.025, -0.027) + vec2(uv.x + 0.001, uv.y + 0.001)).x;
    col.g += 0.05 * texture2D(tex0, 0.75 * vec2(x - 0.022, -0.020) + vec2(uv.x + 0.000, uv.y - 0.002)).y;
    col.b += 0.08 * texture2D(tex0, 0.75 * vec2(x - 0.020, -0.018) + vec2(uv.x - 0.002, uv.y + 0.000)).z;

    // darken
    col = clamp(col * 0.6 + 0.4 * col * col * 1.0, 0.0, 1.0);

    // vignette
    float vig = (0.0 + 1.0 * 16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y));
	col *= vec3(pow(vig, 0.3));

    // brighten
    col *= vec3(0.95, 1.05, 0.95);
	col *= 2.8;

    // flashing horizontal scanlines with vertical scrolling
	float scans = clamp(0.40 + 0.05 * sin(3.5 * u_time + uv.y * u_resolution.y), 0.0, 1.0);
    // float scans = clamp(0.35 + 0.35 * sin(3.5 * u_time + uv.y * u_resolution.y * 1.5), 0.0, 1.0);
	float s = pow(scans, 1.7);
    col = col * vec3(0.3 + 0.7 * s);
	// col = col * vec3(0.4 + 0.7 * s);

    // flashing effect
    col *= 1.0 + 0.01 * sin(120.0 * u_time);

    // black borders outside curvature
	if (uv.x < 0.0 || uv.x > 1.0)
		col *= 0.0;
	if (uv.y < 0.0 || uv.y > 1.0)
		col *= 0.0;
	
    // vertical scanlines with no scrolling
	col *= 1.0 - 0.65 * vec3(clamp((mod(gl_FragCoord.x, 2.0) - 1.0) * 2.0, 0.0, 1.0));

	// cross-fade between original and postprocess
    // float crossfade = smoothstep(0.1, 0.9, sin(u_time));
    // col = mix( col, oriCol, crossfade );

    gl_FragColor = vec4(col,1.0);
}