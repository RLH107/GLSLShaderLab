#version 330 core
out vec4 fragColor;
uniform float iTime;
uniform vec2 iResolution;
uniform int iMouseClick;

void main()
{
     // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/iResolution.xy;
    float changeClolor = 1f;

    if(iMouseClick == 1){ 
        changeClolor = 2f;
    }
    if(changeClolor == 1f){
        fragColor = vec4(0,0.7,0,0);
        }
    else
    fragColor = vec4(0.7,0,0,0);
}
