varying vec2 vUv;
void main(){
    vUv = uv;

    //gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec4 mvPositon = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 2000.0 * (1.0 / - mvPositon.z);
    //gl_PointSize = size*10.0;
    //gl_PointCoord;
    gl_Position = projectionMatrix * mvPositon;
}