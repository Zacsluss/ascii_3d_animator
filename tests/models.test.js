import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ModelManager } from '../js/models.js';
import { CONFIG } from '../js/constants.js';

// Mock THREE.js model components
const mockMaterial = {
  type: 'MeshStandardMaterial',
  metalness: 0,
  roughness: 1,
  dispose: vi.fn(),
  map: {
    dispose: vi.fn(),
  },
  color: { r: 1, g: 1, b: 1 },
  transparent: false,
  opacity: 1.0,
  needsUpdate: false,
};

const mockMesh = {
  isMesh: true,
  geometry: {
    dispose: vi.fn(),
  },
  material: mockMaterial,
  castShadow: false,
  receiveShadow: false,
};

const mockGLTFLoader = {
  load: vi.fn(),
};

vi.mock('../lib/three/GLTFLoader.js', () => ({
  GLTFLoader: vi.fn(() => mockGLTFLoader),
}));

vi.mock('../lib/three/three.module.js', () => ({
  Box3: vi.fn(() => ({
    setFromObject: vi.fn().mockReturnThis(),
    getSize: vi.fn((v) => {
      v.x = 100;
      v.y = 100;
      v.z = 100;
      return v;
    }),
    getCenter: vi.fn((v) => {
      v.x = 0;
      v.y = 0;
      v.z = 0;
      return v;
    }),
  })),
  Vector3: vi.fn(() => ({ x: 0, y: 0, z: 0 })),
  MeshLambertMaterial: vi.fn((params) => ({
    ...mockMaterial,
    type: 'MeshLambertMaterial',
    ...params,
  })),
  Color: vi.fn((_color) => ({ r: 1, g: 1, b: 1 })),
}));

describe('ModelManager', () => {
  let modelManager;
  let mockScene;

  beforeEach(() => {
    mockScene = {
      add: vi.fn(),
      remove: vi.fn(),
    };
    mockGLTFLoader.load.mockClear();
    modelManager = new ModelManager(mockScene);
  });

  describe('initialization', () => {
    it('should initialize with a scene', () => {
      expect(modelManager.scene).toBe(mockScene);
    });

    it('should have no current model', () => {
      expect(modelManager.currentModel).toBeNull();
    });

    it('should start with index 0', () => {
      expect(modelManager.currentModelIndex).toBe(0);
    });

    it('should initialize load version', () => {
      expect(modelManager.modelLoadVersion).toBe(0);
    });
  });

  describe('configureMaterial', () => {
    it('should configure MeshStandardMaterial', () => {
      const mesh = { ...mockMesh };
      mesh.material = { ...mockMaterial, type: 'MeshStandardMaterial' };
      modelManager.configureMaterial(mesh);
      expect(mesh.material.metalness).toBe(0.1);
      expect(mesh.material.roughness).toBe(0.8);
    });

    it('should configure MeshPhysicalMaterial', () => {
      const mesh = { ...mockMesh };
      mesh.material = { ...mockMaterial, type: 'MeshPhysicalMaterial' };
      modelManager.configureMaterial(mesh);
      expect(mesh.material.metalness).toBe(0.1);
      expect(mesh.material.roughness).toBe(0.8);
    });

    it('should convert MeshBasicMaterial to MeshLambertMaterial', () => {
      const mesh = { ...mockMesh };
      mesh.material = { ...mockMaterial, type: 'MeshBasicMaterial' };
      modelManager.configureMaterial(mesh);
      expect(mesh.material.type).toBe('MeshLambertMaterial');
    });

    it('should handle mesh without material', () => {
      const mesh = { isMesh: true };
      expect(() => {
        modelManager.configureMaterial(mesh);
      }).not.toThrow();
    });

    it('should set needsUpdate flag', () => {
      const mesh = { ...mockMesh };
      mesh.material = { ...mockMaterial, needsUpdate: false };
      modelManager.configureMaterial(mesh);
      expect(mesh.material.needsUpdate).toBe(true);
    });
  });

  describe('getCurrentModelName', () => {
    it('should return first model name initially', () => {
      const name = modelManager.getCurrentModelName();
      expect(name).toBe(CONFIG.MODELS.NAMES[0]);
    });

    it('should return correct name after index change', () => {
      modelManager.currentModelIndex = 1;
      const name = modelManager.getCurrentModelName();
      expect(name).toBe(CONFIG.MODELS.NAMES[1]);
    });
  });

  describe('switchToNext', () => {
    it('should increment model index', async () => {
      const initialIndex = modelManager.currentModelIndex;

      // Mock successful load
      mockGLTFLoader.load.mockImplementation((path, onSuccess) => {
        onSuccess({
          scene: {
            scale: { setScalar: vi.fn() },
            position: { set: vi.fn(), clone: vi.fn(() => ({ x: 0, y: 0, z: 0 })) },
            traverse: vi.fn(),
          },
          animations: [],
        });
      });

      await modelManager.switchToNext();
      expect(modelManager.currentModelIndex).toBe((initialIndex + 1) % CONFIG.MODELS.NAMES.length);
    });

    it('should wrap around to first model', async () => {
      modelManager.currentModelIndex = CONFIG.MODELS.NAMES.length - 1;

      // Mock successful load
      mockGLTFLoader.load.mockImplementation((path, onSuccess) => {
        onSuccess({
          scene: {
            scale: { setScalar: vi.fn() },
            position: { set: vi.fn(), clone: vi.fn(() => ({ x: 0, y: 0, z: 0 })) },
            traverse: vi.fn(),
          },
          animations: [],
        });
      });

      await modelManager.switchToNext();
      expect(modelManager.currentModelIndex).toBe(0);
    });
  });

  describe('disposeCurrentModel', () => {
    it('should do nothing if no current model', () => {
      expect(() => {
        modelManager.disposeCurrentModel();
      }).not.toThrow();
    });

    it('should remove model from scene', () => {
      modelManager.currentModel = {
        traverse: vi.fn(),
      };
      modelManager.disposeCurrentModel();
      expect(mockScene.remove).toHaveBeenCalled();
    });

    it('should dispose geometry and material', () => {
      const geometry = { dispose: vi.fn() };
      const material = { dispose: vi.fn(), map: { dispose: vi.fn() } };
      const mesh = {
        isMesh: true,
        geometry,
        material,
      };
      modelManager.currentModel = {
        traverse: (callback) => {
          callback(mesh);
        },
      };
      modelManager.disposeCurrentModel();
      expect(geometry.dispose).toHaveBeenCalled();
      expect(material.dispose).toHaveBeenCalled();
    });

    it('should handle array of materials', () => {
      const material1 = { dispose: vi.fn() };
      const material2 = { dispose: vi.fn(), map: { dispose: vi.fn() } };
      const mesh = {
        isMesh: true,
        geometry: { dispose: vi.fn() },
        material: [material1, material2],
      };
      modelManager.currentModel = {
        traverse: (callback) => {
          callback(mesh);
        },
      };
      modelManager.disposeCurrentModel();
      expect(material1.dispose).toHaveBeenCalled();
      expect(material2.dispose).toHaveBeenCalled();
    });

    it('should clear currentModel reference', () => {
      modelManager.currentModel = { traverse: vi.fn() };
      modelManager.disposeCurrentModel();
      expect(modelManager.currentModel).toBeNull();
    });
  });

  describe('loadVersion tracking', () => {
    it('should increment load version on each load', () => {
      const initialVersion = modelManager.modelLoadVersion;

      // Trigger load (will fail but that's ok for this test)
      modelManager.loadModel('duck').catch(() => {});

      expect(modelManager.modelLoadVersion).toBe(initialVersion + 1);
    });
  });
});
