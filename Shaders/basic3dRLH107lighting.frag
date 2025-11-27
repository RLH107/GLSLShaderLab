#version 330 core 

out vec4 FragColor; 

in vec3 FragPos; 
in vec3 Normal; 
in vec2 TexCoord; 
in vec3 WorldPos; 

uniform float iTime; 
uniform vec2 iResolution; 
uniform vec3 viewPos;
uniform sampler2D texture0;

vec3 lightDir = -normalize(vec3(0.2, 1.0, 0.2)); 
float ambient = 0.2; 

vec2 uv = TexCoord;
vec4 Flag()
{
	vec4 outColor = vec4(0);
    //Cross
	if(uv.x>-0.075 && uv.x<0.075 && uv.y>-0.19 && uv.y<0.19 || uv.x>-0.19 && uv.x<0.19 && uv.y>-0.075 && uv.y<0.075)
    {
        outColor += vec4(1,1,1,1);
    }
	//Backgroundflag
	else
    {
        outColor += vec4(1,0,0,0);
    }
	//BackGroundnotFlag
    return outColor;
}

void main() {     
	// Calculo do brilho com o produto escalar entre a normal e a direcao da luz,
	// limitado entre 0 e 1
	float brightness = clamp(dot(Normal, -lightDir),0.0, 1.0);
	// Definindo a cor branca com brilho e luz ambiente
	FragColor = texture(texture0, TexCoord) * (brightness + ambient);
}