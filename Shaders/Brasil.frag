#version 330 core
out vec4 FragColor;
uniform float iTime;
uniform vec2 iResolution;


float st(float s) { return smoothstep(0.99,1.0,s); }
vec3 brazil(vec2 uv) {
	vec3 col = vec3(0.0,0.6,0.0); //verde

	//Lozangulo amarelo
	col = mix(col,	vec3(0.9,0.8,0.0),		1.0-st(abs(uv.x/1.6)  +  abs(uv.y)+0.25)); //abs = Absolute Value
	//circulo azul
	col = mix(col,	vec3(0.0,0.0,0.25),		1.0-st(length(uv)+0.5)); //length = return the length of a vector
	//faixa branca
	col = mix(col,	vec3(1.0),				st(1.0-abs(  uv.y-0.15+pow(uv.x/1.5+0.15 , 2.0)  )+0.04) * (1.0-st(length(uv)+0.5))); //pow = value1 to the power of value2 :pow(value1, value2)


	col *= 1.0-st(abs(uv.y));// barra preta horizontal
	col *= 1.0-st(abs(uv.x)-0.6);// barra preta vertical
	return col;
}
void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    //vec2 uv = gl_FragCoord.xy/iResolution.xy;
	vec2 uv = (2.0*gl_FragCoord.xy-iResolution.xy)/iResolution.y;
	float x = uv.x*2.0+iTime*1.5;
	//uv.y *= 1.0+sin(x)*0.05;
	vec3 col = brazil(uv*1.25);
	//*(3.0-sin(x))/3.0
	FragColor = vec4(col,1.0);
}
