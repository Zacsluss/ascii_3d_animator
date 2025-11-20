import { describe, it, expect } from 'vitest';
import { CONFIG } from '../js/constants.js';

describe('CONFIG Constants', () => {
  describe('ASCII Configuration', () => {
    it('should have valid scale ranges', () => {
      expect(CONFIG.ASCII.MIN_SCALE).toBeLessThan(CONFIG.ASCII.MAX_SCALE);
      expect(CONFIG.ASCII.DEFAULT_SCALE).toBeGreaterThanOrEqual(CONFIG.ASCII.MIN_SCALE);
      expect(CONFIG.ASCII.DEFAULT_SCALE).toBeLessThanOrEqual(CONFIG.ASCII.MAX_SCALE);
    });

    it('should have non-empty character set', () => {
      expect(CONFIG.ASCII.DEFAULT_CHARS).toBeTruthy();
      expect(CONFIG.ASCII.DEFAULT_CHARS.length).toBeGreaterThan(0);
    });

    it('should have valid font configuration', () => {
      expect(CONFIG.ASCII.FONT_SIZE).toMatch(/\d+px/);
      expect(CONFIG.ASCII.FONT_FAMILY).toBeTruthy();
    });
  });

  describe('Camera Configuration', () => {
    it('should have valid FOV', () => {
      expect(CONFIG.CAMERA.FOV).toBeGreaterThan(0);
      expect(CONFIG.CAMERA.FOV).toBeLessThanOrEqual(180);
    });

    it('should have valid near/far planes', () => {
      expect(CONFIG.CAMERA.NEAR).toBeGreaterThan(0);
      expect(CONFIG.CAMERA.FAR).toBeGreaterThan(CONFIG.CAMERA.NEAR);
    });

    it('should have valid distance ranges', () => {
      expect(CONFIG.CAMERA.MIN_DISTANCE).toBeGreaterThan(0);
      expect(CONFIG.CAMERA.MAX_DISTANCE).toBeGreaterThan(CONFIG.CAMERA.MIN_DISTANCE);
      expect(CONFIG.CAMERA.DEFAULT_DISTANCE).toBeGreaterThanOrEqual(CONFIG.CAMERA.MIN_DISTANCE);
      expect(CONFIG.CAMERA.DEFAULT_DISTANCE).toBeLessThanOrEqual(CONFIG.CAMERA.MAX_DISTANCE);
    });
  });

  describe('Animation Configuration', () => {
    it('should have valid speed ranges', () => {
      expect(CONFIG.ANIMATION.MIN_SPEED).toBeGreaterThan(0);
      expect(CONFIG.ANIMATION.MAX_SPEED).toBeGreaterThan(CONFIG.ANIMATION.MIN_SPEED);
      expect(CONFIG.ANIMATION.DEFAULT_SPEED).toBeGreaterThanOrEqual(CONFIG.ANIMATION.MIN_SPEED);
      expect(CONFIG.ANIMATION.DEFAULT_SPEED).toBeLessThanOrEqual(CONFIG.ANIMATION.MAX_SPEED);
    });

    it('should have valid max delta', () => {
      expect(CONFIG.ANIMATION.MAX_DELTA).toBeGreaterThan(0);
    });
  });

  describe('Lighting Presets', () => {
    it('should have all required presets', () => {
      const requiredPresets = ['studio', 'dramatic', 'natural', 'minimal', 'default'];
      requiredPresets.forEach((preset) => {
        expect(CONFIG.LIGHTING.PRESETS[preset]).toBeDefined();
      });
    });

    it('should have valid intensity values', () => {
      Object.values(CONFIG.LIGHTING.PRESETS).forEach((preset) => {
        expect(preset.main).toBeGreaterThanOrEqual(0);
        expect(preset.ambient).toBeGreaterThanOrEqual(0);
        expect(preset.red).toBeGreaterThanOrEqual(0);
        expect(preset.blue).toBeGreaterThanOrEqual(0);
        expect(preset.spotlight).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have valid color codes', () => {
      expect(CONFIG.LIGHTING.COLORS.WHITE).toBe(0xffffff);
      expect(CONFIG.LIGHTING.COLORS.RED).toBe(0xff2222);
      expect(CONFIG.LIGHTING.COLORS.BLUE).toBe(0x2222ff);
    });
  });

  describe('Model Configuration', () => {
    it('should have valid model names array', () => {
      expect(Array.isArray(CONFIG.MODELS.NAMES)).toBe(true);
      expect(CONFIG.MODELS.NAMES.length).toBeGreaterThan(0);
    });

    it('should have configurations for all model names', () => {
      CONFIG.MODELS.NAMES.forEach((name) => {
        expect(CONFIG.MODELS.CONFIGS[name]).toBeDefined();
        expect(CONFIG.MODELS.CONFIGS[name].path).toBeTruthy();
        expect(CONFIG.MODELS.CONFIGS[name].scaleMultiplier).toBeGreaterThan(0);
      });
    });

    it('should have valid desired size', () => {
      expect(CONFIG.MODELS.DESIRED_SIZE).toBeGreaterThan(0);
    });
  });
});
