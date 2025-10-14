#version 330 core 

out vec4 FragColor; 

in vec3 FragPos; 
in vec3 Normal; 
in vec2 TexCoord; 
in vec3 WorldPos; 

uniform float iTime; 
uniform vec2 iResolution; 
uniform vec3 viewPos; 

vec3 lightDir = normalize(vec3(0.2, 1.0, 0.2)); 
float ambient = 0.2; 

void main() {     
// Cálculo do brilho com o produto escalar entre a normal e a direção da luz,
// limitado entre 0 e 1
float brightness = clamp(dot(Normal, -lightDir), 0.0, 1.0);
// Definindo a cor branca com brilho e luz ambiente
FragColor = vec4(1.0, 1.0, 1.0, 1.0) * (brightness + ambient); 
}