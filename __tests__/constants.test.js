/**
 * Tests for constants module
 */

import { CONFIG } from '../js/constants.js';

describe('CONFIG constants', () => {
  describe('ASCII configuration', () => {
    test('should have valid scale range', () => {
      expect(CONFIG.ASCII.MIN_SCALE).toBeLessThan(CONFIG.ASCII.MAX_SCALE);
      expect(CONFIG.ASCII.DEFAULT_SCALE).toBeGreaterThanOrEqual(CONFIG.ASCII.MIN_SCALE);
      expect(CONFIG.ASCII.DEFAULT_SCALE).toBeLessThanOrEqual(CONFIG.ASCII.MAX_SCALE);
    });

    test('should have default characters defined', () => {
      expect(CONFIG.ASCII.DEFAULT_CHARS).toBeDefined();
      expect(typeof CONFIG.ASCII.DEFAULT_CHARS).toBe('string');
      expect(CONFIG.ASCII.DEFAULT_CHARS.length).toBeGreaterThan(0);
    });

    test('should have font settings', () => {
      expect(CONFIG.ASCII.FONT_SIZE).toBeDefined();
      expect(CONFIG.ASCII.FONT_FAMILY).toBeDefined();
      expect(CONFIG.ASCII.FONT_WEIGHT).toBeDefined();
    });
  });

  describe('Camera configuration', () => {
    test('should have valid distance range', () => {
      expect(CONFIG.CAMERA.MIN_DISTANCE).toBeLessThan(CONFIG.CAMERA.MAX_DISTANCE);
      expect(CONFIG.CAMERA.DEFAULT_DISTANCE).toBeGreaterThanOrEqual(CONFIG.CAMERA.MIN_DISTANCE);
      expect(CONFIG.CAMERA.DEFAULT_DISTANCE).toBeLessThanOrEqual(CONFIG.CAMERA.MAX_DISTANCE);
    });

    test('should have valid FOV', () => {
      expect(CONFIG.CAMERA.FOV).toBeGreaterThan(0);
      expect(CONFIG.CAMERA.FOV).toBeLessThan(180);
    });

    test('should have default position', () => {
      expect(CONFIG.CAMERA.DEFAULT_POSITION).toHaveProperty('x');
      expect(CONFIG.CAMERA.DEFAULT_POSITION).toHaveProperty('y');
      expect(CONFIG.CAMERA.DEFAULT_POSITION).toHaveProperty('z');
    });
  });

  describe('Animation configuration', () => {
    test('should have valid speed range', () => {
      expect(CONFIG.ANIMATION.MIN_SPEED).toBeGreaterThan(0);
      expect(CONFIG.ANIMATION.MAX_SPEED).toBeGreaterThan(CONFIG.ANIMATION.MIN_SPEED);
      expect(CONFIG.ANIMATION.DEFAULT_SPEED).toBeGreaterThanOrEqual(CONFIG.ANIMATION.MIN_SPEED);
      expect(CONFIG.ANIMATION.DEFAULT_SPEED).toBeLessThanOrEqual(CONFIG.ANIMATION.MAX_SPEED);
    });

    test('should have valid max delta', () => {
      expect(CONFIG.ANIMATION.MAX_DELTA).toBeGreaterThan(0);
      expect(CONFIG.ANIMATION.MAX_DELTA).toBeLessThan(1);
    });
  });

  describe('Lighting presets', () => {
    test('should have all required presets', () => {
      expect(CONFIG.LIGHTING.PRESETS).toHaveProperty('studio');
      expect(CONFIG.LIGHTING.PRESETS).toHaveProperty('dramatic');
      expect(CONFIG.LIGHTING.PRESETS).toHaveProperty('natural');
      expect(CONFIG.LIGHTING.PRESETS).toHaveProperty('minimal');
      expect(CONFIG.LIGHTING.PRESETS).toHaveProperty('default');
    });

    test('each preset should have all light intensities', () => {
      Object.values(CONFIG.LIGHTING.PRESETS).forEach(preset => {
        expect(preset).toHaveProperty('main');
        expect(preset).toHaveProperty('ambient');
        expect(preset).toHaveProperty('red');
        expect(preset).toHaveProperty('blue');
        expect(preset).toHaveProperty('spotlight');
      });
    });

    test('light intensities should be non-negative', () => {
      Object.values(CONFIG.LIGHTING.PRESETS).forEach(preset => {
        expect(preset.main).toBeGreaterThanOrEqual(0);
        expect(preset.ambient).toBeGreaterThanOrEqual(0);
        expect(preset.red).toBeGreaterThanOrEqual(0);
        expect(preset.blue).toBeGreaterThanOrEqual(0);
        expect(preset.spotlight).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Model configuration', () => {
    test('should have model names array', () => {
      expect(Array.isArray(CONFIG.MODELS.NAMES)).toBe(true);
      expect(CONFIG.MODELS.NAMES.length).toBeGreaterThan(0);
    });

    test('each model should have configuration', () => {
      CONFIG.MODELS.NAMES.forEach(name => {
        expect(CONFIG.MODELS.CONFIGS).toHaveProperty(name);
        expect(CONFIG.MODELS.CONFIGS[name]).toHaveProperty('path');
        expect(CONFIG.MODELS.CONFIGS[name]).toHaveProperty('scaleMultiplier');
      });
    });

    test('model paths should be strings', () => {
      Object.values(CONFIG.MODELS.CONFIGS).forEach(config => {
        expect(typeof config.path).toBe('string');
        expect(config.path.length).toBeGreaterThan(0);
      });
    });

    test('scale multipliers should be positive', () => {
      Object.values(CONFIG.MODELS.CONFIGS).forEach(config => {
        expect(config.scaleMultiplier).toBeGreaterThan(0);
      });
    });
  });

  describe('Scene configuration', () => {
    test('should have background color', () => {
      expect(typeof CONFIG.SCENE.BACKGROUND_COLOR).toBe('number');
    });

    test('should have shadow settings', () => {
      expect(typeof CONFIG.SCENE.SHADOW_MAP_ENABLED).toBe('boolean');
      expect(CONFIG.SCENE.SHADOW_MAP_TYPE).toBeDefined();
    });
  });
});
