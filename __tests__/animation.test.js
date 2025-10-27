/**
 * Tests for AnimationManager
 */

import { AnimationManager } from '../js/animation.js';
import { CONFIG } from '../js/constants.js';

// Mock Three.js
jest.mock('../lib/three/three.module.js', () => require('../__mocks__/three.js'));

describe('AnimationManager', () => {
  let animationManager;

  beforeEach(() => {
    animationManager = new AnimationManager();
  });

  describe('constructor', () => {
    test('should initialize with null mixer', () => {
      expect(animationManager.mixer).toBeNull();
    });

    test('should initialize with default animation speed', () => {
      expect(animationManager.animationSpeed).toBe(CONFIG.ANIMATION.DEFAULT_SPEED);
    });

    test('should initialize with empty animations array', () => {
      expect(animationManager.currentAnimations).toEqual([]);
    });
  });

  describe('initialize', () => {
    const mockModel = { name: 'testModel' };
    const mockAnimations = [
      { name: 'walk', duration: 1.5 },
      { name: 'run', duration: 1.0 },
      { name: 'jump', duration: 0.8 }
    ];

    test('should handle empty animations array', () => {
      animationManager.initialize(mockModel, []);

      expect(animationManager.mixer).toBeNull();
      expect(animationManager.currentAnimations).toEqual([]);
    });

    test('should create mixer with animations', () => {
      animationManager.initialize(mockModel, mockAnimations);

      expect(animationManager.mixer).not.toBeNull();
      expect(animationManager.currentAnimations).toEqual(mockAnimations);
    });

    test('should use first animation as default', () => {
      animationManager.initialize(mockModel, mockAnimations);

      expect(animationManager.currentAnimationIndex).toBe(0);
    });

    test('should use preferred animation if available', () => {
      animationManager.initialize(mockModel, mockAnimations, 'run');

      expect(animationManager.currentAnimationIndex).toBe(1);
    });

    test('should fallback to first if preferred not found', () => {
      animationManager.initialize(mockModel, mockAnimations, 'nonexistent');

      expect(animationManager.currentAnimationIndex).toBe(0);
    });
  });

  describe('setSpeed', () => {
    test('should update animation speed', () => {
      animationManager.setSpeed(2.0);
      expect(animationManager.animationSpeed).toBe(2.0);
    });

    test('should update playing action speed', () => {
      const mockModel = { name: 'testModel' };
      const mockAnimations = [{ name: 'walk', duration: 1.5 }];
      animationManager.initialize(mockModel, mockAnimations);

      animationManager.setSpeed(1.5);

      expect(animationManager.animationSpeed).toBe(1.5);
    });
  });

  describe('switchToNext', () => {
    const mockModel = { name: 'testModel' };
    const mockAnimations = [
      { name: 'walk', duration: 1.5 },
      { name: 'run', duration: 1.0 },
      { name: 'jump', duration: 0.8 }
    ];

    beforeEach(() => {
      animationManager.initialize(mockModel, mockAnimations);
    });

    test('should cycle through animations', () => {
      expect(animationManager.currentAnimationIndex).toBe(0);

      animationManager.switchToNext();
      expect(animationManager.currentAnimationIndex).toBe(1);

      animationManager.switchToNext();
      expect(animationManager.currentAnimationIndex).toBe(2);
    });

    test('should wrap back to first animation', () => {
      animationManager.currentAnimationIndex = 2;

      animationManager.switchToNext();
      expect(animationManager.currentAnimationIndex).toBe(0);
    });

    test('should return animation info', () => {
      const info = animationManager.switchToNext();

      expect(info).toHaveProperty('name');
      expect(info).toHaveProperty('index');
      expect(info).toHaveProperty('total');
      expect(info.total).toBe(3);
    });

    test('should return null if no animations', () => {
      const emptyManager = new AnimationManager();
      const info = emptyManager.switchToNext();

      expect(info).toBeNull();
    });
  });

  describe('getInfo', () => {
    test('should return info for manager with no animations', () => {
      const info = animationManager.getInfo();

      expect(info.hasAnimations).toBe(false);
      expect(info.count).toBe(0);
      expect(info.currentName).toBeNull();
    });

    test('should return info for manager with animations', () => {
      const mockModel = { name: 'testModel' };
      const mockAnimations = [
        { name: 'walk', duration: 1.5 },
        { name: 'run', duration: 1.0 }
      ];
      animationManager.initialize(mockModel, mockAnimations);

      const info = animationManager.getInfo();

      expect(info.hasAnimations).toBe(true);
      expect(info.count).toBe(2);
      expect(info.currentIndex).toBe(0);
      expect(info.currentName).toBe('walk');
      expect(info.speed).toBe(CONFIG.ANIMATION.DEFAULT_SPEED);
    });
  });

  describe('dispose', () => {
    test('should clean up resources', () => {
      const mockModel = { name: 'testModel' };
      const mockAnimations = [{ name: 'walk', duration: 1.5 }];
      animationManager.initialize(mockModel, mockAnimations);

      animationManager.dispose();

      expect(animationManager.mixer).toBeNull();
      expect(animationManager.currentAnimations).toEqual([]);
      expect(animationManager.currentPlayingAction).toBeNull();
    });

    test('should handle dispose when already disposed', () => {
      expect(() => animationManager.dispose()).not.toThrow();
    });
  });
});
