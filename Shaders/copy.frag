#version 330 core
out vec4 FragColor;
uniform sampler2D inputTexture;
uniform vec2 iResolution;
uniform vec2 TexCoord;

void main()
{
    //vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 uv = TexCoord;
    FragColor = texture(inputTexture, uv);
}