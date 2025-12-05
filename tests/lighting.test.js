import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LightingManager } from '../js/lighting.js';
import { CONFIG } from '../js/constants.js';

// Mock THREE.js lighting components
const mockScene = {
  add: vi.fn(),
};

const createMockLight = (color, intensity = 0) => ({
  position: {
    set: vi.fn(),
  },
  intensity: intensity,
  target: {
    position: {
      set: vi.fn(),
    },
  },
  angle: 0,
  penumbra: 0,
  decay: 0,
  distance: 0,
});

vi.mock('../lib/three/three.module.js', () => ({
  PointLight: vi.fn((color, intensity, _distance, _decay) => createMockLight(color, intensity)),
  AmbientLight: vi.fn((color, intensity) => createMockLight(color, intensity)),
  SpotLight: vi.fn((color, intensity) => ({
    ...createMockLight(color, intensity),
    target: { position: { set: vi.fn() } },
  })),
}));

describe('LightingManager', () => {
  let lightingManager;

  beforeEach(() => {
    mockScene.add.mockClear();
    lightingManager = new LightingManager(mockScene);
  });

  describe('initialization', () => {
    it('should initialize with a scene', () => {
      expect(lightingManager.scene).toBe(mockScene);
    });

    it('should create all required lights', () => {
      expect(lightingManager.lights.main).toBeDefined();
      expect(lightingManager.lights.ambient).toBeDefined();
      expect(lightingManager.lights.red).toBeDefined();
      expect(lightingManager.lights.blue).toBeDefined();
      expect(lightingManager.lights.spotlight).toBeDefined();
    });

    it('should add all lights to the scene', () => {
      // 5 lights + 1 spotlight target = 6 add calls
      expect(mockScene.add).toHaveBeenCalled();
    });

    it('should set default intensities', () => {
      const defaultPreset = CONFIG.LIGHTING.PRESETS.default;
      expect(lightingManager.lights.main.intensity).toBe(defaultPreset.main);
      expect(lightingManager.lights.ambient.intensity).toBe(defaultPreset.ambient);
      expect(lightingManager.lights.red.intensity).toBe(defaultPreset.red);
      expect(lightingManager.lights.blue.intensity).toBe(defaultPreset.blue);
      expect(lightingManager.lights.spotlight.intensity).toBe(defaultPreset.spotlight);
    });
  });

  describe('setPreset', () => {
    it('should apply studio preset', () => {
      lightingManager.setPreset('studio');
      const studioPreset = CONFIG.LIGHTING.PRESETS.studio;
      expect(lightingManager.lights.main.intensity).toBe(studioPreset.main);
      expect(lightingManager.lights.ambient.intensity).toBe(studioPreset.ambient);
    });

    it('should apply dramatic preset', () => {
      lightingManager.setPreset('dramatic');
      const dramaticPreset = CONFIG.LIGHTING.PRESETS.dramatic;
      expect(lightingManager.lights.main.intensity).toBe(dramaticPreset.main);
      expect(lightingManager.lights.spotlight.intensity).toBe(dramaticPreset.spotlight);
    });

    it('should apply natural preset', () => {
      lightingManager.setPreset('natural');
      const naturalPreset = CONFIG.LIGHTING.PRESETS.natural;
      expect(lightingManager.lights.ambient.intensity).toBe(naturalPreset.ambient);
    });

    it('should handle invalid preset gracefully', () => {
      const beforeIntensity = lightingManager.lights.main.intensity;
      lightingManager.setPreset('nonexistent');
      expect(lightingManager.lights.main.intensity).toBe(beforeIntensity);
    });
  });

  describe('setIntensity', () => {
    it('should set main light intensity', () => {
      lightingManager.setIntensity('main', 15);
      expect(lightingManager.lights.main.intensity).toBe(15);
    });

    it('should set ambient light intensity', () => {
      lightingManager.setIntensity('ambient', 0.5);
      expect(lightingManager.lights.ambient.intensity).toBe(0.5);
    });

    it('should handle invalid light name gracefully', () => {
      expect(() => {
        lightingManager.setIntensity('nonexistent', 10);
      }).not.toThrow();
    });

    it('should accept zero intensity', () => {
      lightingManager.setIntensity('main', 0);
      expect(lightingManager.lights.main.intensity).toBe(0);
    });
  });

  describe('getIntensities', () => {
    it('should return all current intensities', () => {
      const intensities = lightingManager.getIntensities();
      expect(intensities).toHaveProperty('main');
      expect(intensities).toHaveProperty('ambient');
      expect(intensities).toHaveProperty('red');
      expect(intensities).toHaveProperty('blue');
      expect(intensities).toHaveProperty('spotlight');
    });

    it('should return correct intensity values', () => {
      lightingManager.setIntensity('main', 12);
      lightingManager.setIntensity('ambient', 0.3);
      const intensities = lightingManager.getIntensities();
      expect(intensities.main).toBe(12);
      expect(intensities.ambient).toBe(0.3);
    });

    it('should return 0 for undefined lights', () => {
      lightingManager.lights.main = null;
      const intensities = lightingManager.getIntensities();
      expect(intensities.main).toBe(0);
    });
  });
});
