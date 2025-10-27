/**
 * Tests for LightingManager
 */

import { LightingManager } from '../js/lighting.js';
import { CONFIG } from '../js/constants.js';

describe('LightingManager', () => {
  let scene;
  let lightingManager;

  beforeEach(() => {
    scene = {
      add: jest.fn(),
      remove: jest.fn(),
      children: []
    };
    lightingManager = new LightingManager(scene);
  });

  describe('constructor', () => {
    test('should initialize with scene', () => {
      expect(lightingManager.scene).toBe(scene);
    });

    test('should initialize all lights', () => {
      expect(lightingManager.lights.main).not.toBeNull();
      expect(lightingManager.lights.ambient).not.toBeNull();
      expect(lightingManager.lights.red).not.toBeNull();
      expect(lightingManager.lights.blue).not.toBeNull();
      expect(lightingManager.lights.spotlight).not.toBeNull();
    });

    test('should add lights to scene', () => {
      // 5 lights total (main, ambient, red, blue, spotlight) + 1 spotlight target
      expect(scene.add).toHaveBeenCalled();
    });
  });

  describe('setPreset', () => {
    test('should apply studio preset', () => {
      lightingManager.setPreset('studio');

      const preset = CONFIG.LIGHTING.PRESETS.studio;
      expect(lightingManager.lights.main.intensity).toBe(preset.main);
      expect(lightingManager.lights.ambient.intensity).toBe(preset.ambient);
      expect(lightingManager.lights.red.intensity).toBe(preset.red);
      expect(lightingManager.lights.blue.intensity).toBe(preset.blue);
      expect(lightingManager.lights.spotlight.intensity).toBe(preset.spotlight);
    });

    test('should apply dramatic preset', () => {
      lightingManager.setPreset('dramatic');

      const preset = CONFIG.LIGHTING.PRESETS.dramatic;
      expect(lightingManager.lights.main.intensity).toBe(preset.main);
    });

    test('should handle invalid preset gracefully', () => {
      const originalIntensity = lightingManager.lights.main.intensity;
      lightingManager.setPreset('nonexistent');

      // Intensity should remain unchanged
      expect(lightingManager.lights.main.intensity).toBe(originalIntensity);
    });

    test('should apply all presets without errors', () => {
      const presets = ['studio', 'dramatic', 'natural', 'minimal', 'default'];

      presets.forEach(preset => {
        expect(() => lightingManager.setPreset(preset)).not.toThrow();
      });
    });
  });

  describe('setIntensity', () => {
    test('should set main light intensity', () => {
      lightingManager.setIntensity('main', 15);
      expect(lightingManager.lights.main.intensity).toBe(15);
    });

    test('should set ambient light intensity', () => {
      lightingManager.setIntensity('ambient', 0.5);
      expect(lightingManager.lights.ambient.intensity).toBe(0.5);
    });

    test('should handle invalid light name gracefully', () => {
      expect(() => lightingManager.setIntensity('invalid', 10)).not.toThrow();
    });

    test('should accept various intensity values', () => {
      lightingManager.setIntensity('main', 0);
      expect(lightingManager.lights.main.intensity).toBe(0);

      lightingManager.setIntensity('main', 7.5);
      expect(lightingManager.lights.main.intensity).toBe(7.5);

      lightingManager.setIntensity('main', 20);
      expect(lightingManager.lights.main.intensity).toBe(20);
    });
  });

  describe('getIntensities', () => {
    test('should return all light intensities', () => {
      const intensities = lightingManager.getIntensities();

      expect(intensities).toHaveProperty('main');
      expect(intensities).toHaveProperty('ambient');
      expect(intensities).toHaveProperty('red');
      expect(intensities).toHaveProperty('blue');
      expect(intensities).toHaveProperty('spotlight');
    });

    test('should return current intensity values', () => {
      lightingManager.setIntensity('main', 12.5);
      lightingManager.setIntensity('red', 8);

      const intensities = lightingManager.getIntensities();

      expect(intensities.main).toBe(12.5);
      expect(intensities.red).toBe(8);
    });

    test('should return updated values after preset change', () => {
      lightingManager.setPreset('dramatic');
      const intensities = lightingManager.getIntensities();

      expect(intensities.main).toBe(CONFIG.LIGHTING.PRESETS.dramatic.main);
    });
  });
});
