export const Vertex = `
varying vec2 vUv;
uniform float uScroll;

void main() {
  vUv = uv;
  
  vec3 newPosition = position;

  float wave = sin(uv.x * 3.141);

  // ✅ direction automatically handled by uScroll (+ / -)
  newPosition.z -= wave * uScroll;


  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const Fragment = `
// fragment.glsl
uniform sampler2D uTexture;
uniform vec2 uPlaneResolution;   // plane size (width, height)
uniform vec2 uImageResolution;   // image size (width, height)

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // aspect ratios
  float planeRatio = uPlaneResolution.x / uPlaneResolution.y;
  float imageRatio = uImageResolution.x / uImageResolution.y;

  vec2 newUv = uv;

  if (planeRatio > imageRatio) {
    // plane is wider → scale Y
    float scale = imageRatio / planeRatio;
    newUv.y = uv.y * scale + (1.0 - scale) * 0.5;
  } else {
    // plane is taller → scale X
    float scale = planeRatio / imageRatio;
    newUv.x = uv.x * scale + (1.0 - scale) * 0.5;
  }

  vec4 color = texture2D(uTexture, newUv);
  gl_FragColor = color;
}
`;
