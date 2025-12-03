#version 330 core
out vec4 FragColor;

uniform vec2  iResolution; 
uniform vec2  iMouse;        // pixels
uniform int   iMouseClick;   // 0 or 1
uniform sampler2D iChannel0; // previous frame
uniform float iTime;
// params
const float SCALE  = 1.0001;  // >1.0 = expand outward (zoom-in)
const float RADIUS = 0.02;   // brush radius (normalized)
const float EDGE   = 0.01;   // brush soft edge (normalized)

float softCircle(vec2 uvN, vec2 centerN, float r, float edge) {
	float d = distance(uvN, centerN);
	return 1.0 - smoothstep(r - edge, r, d);
}
float isInsideAndScaled(vec2 scaledUV)
{
	vec2 isInside = step(vec2(0.0), scaledUV) * step(scaledUV, vec2(1.0));
	float inside = isInside.x * isInside.y;
	return inside;
}
vec3 fcolor(float inside, vec2 uv, vec3 colUnscaled, vec3 colScaled)
{
	vec2 mouse = iMouse / iResolution;
	vec3 color = mix(colUnscaled, colScaled, inside);
	
	if (iMouseClick == 1) {
	float a = softCircle(uv, mouse, RADIUS, EDGE);
	vec3 paint = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0,2,4));
	return mix(color, paint, a);
	}
}
void main() 
{
	vec2 uv = gl_FragCoord.xy / iResolution.xy;
	vec3 cUnscaled = texture(iChannel0, uv).rgb;
	float invScale = 1.0 / SCALE + cos(iTime * 1000.0) * 0.001;
	vec2 scaledUV = vec2(0.5) +(uv - vec2(0.5)) * invScale;
	vec3 cScaled = texture(iChannel0, clamp(scaledUV, 0.0, 1.0)).rgb;
	vec3 c = mix(cUnscaled, cScaled, isInsideAndScaled(scaledUV));
	c = fcolor(isInsideAndScaled(scaledUV), uv, cUnscaled, cScaled);
	FragColor = vec4(c, 1.0);
}
