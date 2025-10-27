/**
 * Mock Three.js for testing
 */

export const Vector3 = jest.fn().mockImplementation((x = 0, y = 0, z = 0) => ({
  x,
  y,
  z,
  clone: jest.fn().mockReturnThis(),
  normalize: jest.fn().mockReturnThis(),
  multiplyScalar: jest.fn().mockReturnThis(),
  set: jest.fn(),
  copy: jest.fn()
}));

export const Color = jest.fn().mockImplementation((color) => ({
  color,
  r: 1,
  g: 1,
  b: 1
}));

export const Scene = jest.fn().mockImplementation(() => ({
  background: null,
  children: [],
  add: jest.fn(),
  remove: jest.fn(),
  traverse: jest.fn()
}));

export const PerspectiveCamera = jest.fn().mockImplementation(() => ({
  position: new Vector3(),
  aspect: 1,
  updateProjectionMatrix: jest.fn(),
  lookAt: jest.fn()
}));

export const WebGLRenderer = jest.fn().mockImplementation(() => ({
  setSize: jest.fn(),
  setAnimationLoop: jest.fn(),
  shadowMap: {
    enabled: false,
    type: null
  }
}));

export const PointLight = jest.fn().mockImplementation((color, intensity) => ({
  color,
  intensity,
  position: new Vector3(),
  type: 'PointLight'
}));

export const AmbientLight = jest.fn().mockImplementation((color, intensity) => ({
  color,
  intensity,
  type: 'AmbientLight'
}));

export const SpotLight = jest.fn().mockImplementation((color, intensity) => ({
  color,
  intensity,
  position: new Vector3(),
  target: {
    position: new Vector3()
  },
  angle: 0,
  penumbra: 0,
  decay: 0,
  distance: 0,
  type: 'SpotLight'
}));

export const AnimationMixer = jest.fn().mockImplementation(() => ({
  clipAction: jest.fn(),
  update: jest.fn(),
  stopAllAction: jest.fn()
}));

export const Clock = jest.fn().mockImplementation(() => ({
  getDelta: jest.fn(() => 0.016)
}));

export const Box3 = jest.fn().mockImplementation(() => ({
  setFromObject: jest.fn().mockReturnThis(),
  getSize: jest.fn(),
  getCenter: jest.fn()
}));

export const MeshLambertMaterial = jest.fn().mockImplementation((params) => ({
  ...params,
  type: 'MeshLambertMaterial',
  needsUpdate: false
}));

export const PCFSoftShadowMap = 2;
export const LoopRepeat = 2201;

export default {
  Vector3,
  Color,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PointLight,
  AmbientLight,
  SpotLight,
  AnimationMixer,
  Clock,
  Box3,
  MeshLambertMaterial,
  PCFSoftShadowMap,
  LoopRepeat
};
