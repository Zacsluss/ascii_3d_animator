import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AnimationManager } from '../js/animation.js';
import { CONFIG } from '../js/constants.js';

// Mock THREE.js animation components
const mockAnimationAction = {
  stop: vi.fn(),
  setLoop: vi.fn().mockReturnThis(),
  setEffectiveTimeScale: vi.fn().mockReturnThis(),
  reset: vi.fn().mockReturnThis(),
  play: vi.fn().mockReturnThis(),
};

const mockAnimationMixer = {
  clipAction: vi.fn(() => mockAnimationAction),
  update: vi.fn(),
  stopAllAction: vi.fn(),
};

const mockClock = {
  getDelta: vi.fn(() => 0.016), // 60 FPS
};

vi.mock('../lib/three/three.module.js', () => ({
  AnimationMixer: vi.fn(() => mockAnimationMixer),
  Clock: vi.fn(() => mockClock),
  LoopRepeat: 2201,
}));

describe('AnimationManager', () => {
  let animationManager;
  let mockModel;
  let mockAnimations;

  beforeEach(() => {
    animationManager = new AnimationManager();
    mockModel = { name: 'TestModel' };
    mockAnimations = [
      { name: 'walk', duration: 1.0 },
      { name: 'run', duration: 0.5 },
      { name: 'idle', duration: 2.0 },
    ];
    mockAnimationMixer.clipAction.mockClear();
    mockAnimationMixer.update.mockClear();
    mockAnimationAction.stop.mockClear();
    mockAnimationAction.play.mockClear();
  });

  describe('initialization', () => {
    it('should initialize with default values', () => {
      expect(animationManager.mixer).toBeNull();
      expect(animationManager.currentAnimations).toEqual([]);
      expect(animationManager.currentAnimationIndex).toBe(0);
      expect(animationManager.currentPlayingAction).toBeNull();
      expect(animationManager.animationSpeed).toBe(CONFIG.ANIMATION.DEFAULT_SPEED);
    });

    it('should initialize with animations', () => {
      animationManager.initialize(mockModel, mockAnimations);
      expect(animationManager.mixer).not.toBeNull();
      expect(animationManager.currentAnimations).toHaveLength(3);
    });

    it('should handle empty animations array', () => {
      animationManager.initialize(mockModel, []);
      expect(animationManager.mixer).toBeNull();
      expect(animationManager.currentAnimations).toEqual([]);
    });

    it('should handle null animations', () => {
      animationManager.initialize(mockModel, null);
      expect(animationManager.mixer).toBeNull();
    });

    it('should play first animation by default', () => {
      animationManager.initialize(mockModel, mockAnimations);
      expect(mockAnimationAction.play).toHaveBeenCalled();
    });

    it('should play preferred animation if specified', () => {
      animationManager.initialize(mockModel, mockAnimations, 'run');
      expect(animationManager.currentAnimationIndex).toBe(1);
    });

    it('should fallback to first animation if preferred not found', () => {
      animationManager.initialize(mockModel, mockAnimations, 'nonexistent');
      expect(animationManager.currentAnimationIndex).toBe(0);
    });
  });

  describe('playAnimation', () => {
    beforeEach(() => {
      animationManager.initialize(mockModel, mockAnimations);
    });

    it('should stop current animation before playing new one', () => {
      animationManager.playAnimation(mockAnimations[1]);
      expect(mockAnimationAction.stop).toHaveBeenCalled();
      expect(mockAnimationAction.play).toHaveBeenCalled();
    });

    it('should set animation speed', () => {
      animationManager.setSpeed(2.0);
      animationManager.playAnimation(mockAnimations[0]);
      expect(mockAnimationAction.setEffectiveTimeScale).toHaveBeenCalledWith(2.0);
    });

    it('should handle null clip gracefully', () => {
      expect(() => {
        animationManager.playAnimation(null);
      }).not.toThrow();
    });
  });

  describe('switchToNext', () => {
    beforeEach(() => {
      animationManager.initialize(mockModel, mockAnimations);
    });

    it('should switch to next animation', () => {
      const info = animationManager.switchToNext();
      expect(info.index).toBe(1);
      expect(info.name).toBe('run');
    });

    it('should wrap around to first animation', () => {
      animationManager.currentAnimationIndex = 2;
      const info = animationManager.switchToNext();
      expect(info.index).toBe(0);
      expect(info.name).toBe('walk');
    });

    it('should return null if no animations', () => {
      animationManager.initialize(mockModel, []);
      const info = animationManager.switchToNext();
      expect(info).toBeNull();
    });

    it('should return total count', () => {
      const info = animationManager.switchToNext();
      expect(info.total).toBe(3);
    });
  });

  describe('setSpeed', () => {
    beforeEach(() => {
      animationManager.initialize(mockModel, mockAnimations);
    });

    it('should set animation speed', () => {
      animationManager.setSpeed(1.5);
      expect(animationManager.animationSpeed).toBe(1.5);
    });

    it('should update current playing action', () => {
      animationManager.setSpeed(2.5);
      expect(mockAnimationAction.setEffectiveTimeScale).toHaveBeenCalledWith(2.5);
    });

    it('should handle zero speed', () => {
      animationManager.setSpeed(0);
      expect(animationManager.animationSpeed).toBe(0);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      animationManager.initialize(mockModel, mockAnimations);
    });

    it('should update mixer with delta', () => {
      animationManager.update(0.016);
      expect(mockAnimationMixer.update).toHaveBeenCalled();
    });

    it('should clamp large delta values', () => {
      animationManager.update(1.0); // Very large delta
      expect(mockAnimationMixer.update).toHaveBeenCalledWith(CONFIG.ANIMATION.MAX_DELTA);
    });

    it('should not update if no mixer', () => {
      animationManager.mixer = null;
      expect(() => {
        animationManager.update(0.016);
      }).not.toThrow();
    });
  });

  describe('getInfo', () => {
    it('should return info with no animations', () => {
      const info = animationManager.getInfo();
      expect(info.hasAnimations).toBe(false);
      expect(info.count).toBe(0);
      expect(info.currentName).toBeNull();
    });

    it('should return info with animations', () => {
      animationManager.initialize(mockModel, mockAnimations);
      const info = animationManager.getInfo();
      expect(info.hasAnimations).toBe(true);
      expect(info.count).toBe(3);
      expect(info.currentName).toBe('walk');
      expect(info.currentIndex).toBe(0);
      expect(info.speed).toBe(CONFIG.ANIMATION.DEFAULT_SPEED);
    });
  });

  describe('dispose', () => {
    beforeEach(() => {
      animationManager.initialize(mockModel, mockAnimations);
    });

    it('should stop all actions', () => {
      animationManager.dispose();
      expect(mockAnimationMixer.stopAllAction).toHaveBeenCalled();
    });

    it('should clear mixer', () => {
      animationManager.dispose();
      expect(animationManager.mixer).toBeNull();
    });

    it('should clear animations array', () => {
      animationManager.dispose();
      expect(animationManager.currentAnimations).toEqual([]);
    });

    it('should clear current action', () => {
      animationManager.dispose();
      expect(animationManager.currentPlayingAction).toBeNull();
    });

    it('should handle double dispose gracefully', () => {
      animationManager.dispose();
      expect(() => {
        animationManager.dispose();
      }).not.toThrow();
    });
  });
});
