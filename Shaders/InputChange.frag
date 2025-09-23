#version 330 core
out vec4 fragColor;
uniform float iTime;
uniform vec2 iResolution;
uniform int iMouseClick;

vec4 DrawSquare(vec2 uv, vec2 refrencePoint, vec4 Color)
{
    //if scrren pos (uv) is within square
    if(uv.x > refrencePoint.x - 0.1 
    && uv.y > refrencePoint.y - 0.1 
    && uv.x < refrencePoint.x + 0.1 
    && uv.y < refrencePoint.y + 0.1)
    {
        return Color;
    }
    return vec4(0);
}
// Funcao pega de outro codigo (ela esta pintando a tela toda modificando apenas o alpha)
// Funcao para desenhar circulo com borda suave
vec4 DrawCircle(vec2 uv, vec3 color, vec2 pos, float radius, float edge) {
    vec2 posn = pos / iResolution.xy;
    float dist = distance(uv, posn);
    float alpha = smoothstep(radius, radius - edge, dist);
    return vec4(color, alpha);
}

void main()
{
     // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/iResolution.xy;
    float changeClolor = 1f;
    fragColor = vec4(0.0, 0, 0, 1);

    if(iMouseClick == 1){ 
        changeClolor = 2f;
    }
    if(changeClolor == 1f){
        fragColor += DrawCircle(uv, vec3(0.5, 0, 0), vec2(0.5, 0.5),1 , 0.05);
        }
    else
    fragColor += DrawSquare(uv, vec2(0.5, 0.5), vec4(1, 0, 0, 1));
}
