#version 330 core
out vec4 FragColor;
uniform float iTime;
uniform vec2 iResolution;

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/iResolution.xy;
    
    float aspectRatio = iResolution.y/iResolution.x;
    float speed = 3.;
    float waveLength = -30.0;
    float size = .04;
    float wave = speed * iTime + waveLength * uv.x;
    
    float offset = size*sin(wave);
    uv.y -= offset;
    
    uv -= vec2(.5);
    uv = uv*vec2(1,aspectRatio);
    //Cross
    if(uv.x>-0.075 && uv.x<0.075 && uv.y>-0.19 && uv.y<0.19 || uv.x>-0.19 && uv.x<0.19 && uv.y>-0.075 && uv.y<0.075)
    {
        FragColor = vec4(1,1,1,1);
    }
    //backGround
    else
    {
        FragColor = vec4(1,0,0,0);
    }
    
    if(uv.y + .29 < size || uv.y > .28-size)
    {        
        FragColor = vec4(0,0,0,0);        
    }
    
    if(uv.x + .45 < size || uv.x > .45-size)
    {        
        FragColor = vec4(0,0,0,0);        
    }
}
