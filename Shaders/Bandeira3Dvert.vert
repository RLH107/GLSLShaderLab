#version 330 core
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoord;
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform float iTime;
out vec3 FragPos;
out vec3 Normal;
out vec2 TexCoord;
out vec3 WorldPos;
void main() {     
	// Deformacao senoidal simulando o movimento da bandeira
	vec3 displacedPos = aPos + vec3(sin(iTime + aPos.y * 2.0) * 0.2, 0.0, sin(iTime + aPos.x * 2.0) * 0.2);
	WorldPos = vec3(model * vec4(displacedPos, 1.0));
	FragPos = WorldPos;
	Normal = mat3(transpose(inverse(model))) * aNormal;
	TexCoord = aTexCoord;
	gl_Position = projection * view * vec4(FragPos, 1.0);
}