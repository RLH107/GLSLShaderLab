#version 330 core
out vec4 FragColor;
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iMouseClick;



// Funcao para desenhar circulo com borda suave
vec4 DrawCircle(vec2 uv, vec3 color, vec2 pos, float radius, float edge) {
    vec2 posn = pos / iResolution.xy; //0 to 1
    float dist = distance(uv, posn); //Where to draw
    float alpha = smoothstep(radius, radius - edge, dist); //Draws Circle? or Draws a change in Color
    return vec4(color, alpha);
}

vec4 quad(in vec2 uv, float size, in vec2 pos, vec3 color)
{
    vec2 posn = pos / iResolution.xy; //0 to 1
    float dist = distance(uv, posn); //Where to draw

    vec2 d = step(abs(uv - dist) - size, vec2(0.0));
    return vec4(color, d.x * d.y);
    
}

void main()
{
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 mouseNorm = iMouse.xy ;
    vec3 baseColor = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0,2,4));

    vec4 circle = DrawCircle(uv, vec3(0.0, 0.0, 1.0), mouseNorm, 0.1, 0.01);

    if(iMouseClick != 0.){
        FragColor = quad(uv, 0.001, mouseNorm, vec3(0.0));
    }
    else{
    
        // Mistura a cor base com o circulo usando o alpha do circulo // Que?
        FragColor = mix(vec4(baseColor, 1.0), circle, circle.a);
    }
}


