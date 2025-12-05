import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AsciiManager } from '../js/ascii.js';
import { CONFIG } from '../js/constants.js';

// Mock AsciiEffect component
const mockDomElement = {
  style: {},
  textContent: 'ASCII art here',
};

const mockEffect = {
  domElement: mockDomElement,
  setSize: vi.fn(),
  render: vi.fn(),
};

vi.mock('../lib/three/AsciiEffect.js', () => ({
  AsciiEffect: vi.fn(() => mockEffect),
}));

describe('AsciiManager', () => {
  let asciiManager;
  let mockRenderer;
  let mockContainer;

  beforeEach(() => {
    mockRenderer = { name: 'MockRenderer' };
    mockContainer = {
      appendChild: vi.fn(),
      removeChild: vi.fn(),
      contains: vi.fn(() => true),
      getBoundingClientRect: vi.fn(() => ({ width: 1920, height: 1080 })),
    };
    mockEffect.setSize.mockClear();
    mockEffect.render.mockClear();
    mockContainer.appendChild.mockClear();
    asciiManager = new AsciiManager(mockRenderer, mockContainer);
  });

  describe('initialization', () => {
    it('should initialize with renderer and container', () => {
      expect(asciiManager.renderer).toBe(mockRenderer);
      expect(asciiManager.container).toBe(mockContainer);
    });

    it('should set default scale factor', () => {
      expect(asciiManager.scaleFactor).toBe(CONFIG.ASCII.DEFAULT_SCALE);
    });

    it('should initialize current characters', () => {
      expect(asciiManager.currentChars).toBeTruthy();
      expect(typeof asciiManager.currentChars).toBe('string');
    });

    it('should create effect', () => {
      expect(asciiManager.effect).toBeDefined();
    });

    it('should append effect to container', () => {
      expect(mockContainer.appendChild).toHaveBeenCalledWith(mockDomElement);
    });
  });

  describe('setScale', () => {
    it('should set scale factor', () => {
      asciiManager.setScale(1.5);
      expect(asciiManager.scaleFactor).toBe(1.5);
    });

    it('should clamp to minimum scale', () => {
      asciiManager.setScale(0.1);
      expect(asciiManager.scaleFactor).toBe(CONFIG.ASCII.MIN_SCALE);
    });

    it('should clamp to maximum scale', () => {
      asciiManager.setScale(10);
      expect(asciiManager.scaleFactor).toBe(CONFIG.ASCII.MAX_SCALE);
    });

    it('should call updateScale', () => {
      const spy = vi.spyOn(asciiManager, 'updateScale');
      asciiManager.setScale(1.5);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('updateCharacters', () => {
    it('should use default chars when given empty string', () => {
      asciiManager.updateCharacters('');
      expect(asciiManager.currentChars).toBe(CONFIG.ASCII.DEFAULT_CHARS);
    });

    it('should use custom characters', () => {
      asciiManager.updateCharacters('HELLO');
      expect(asciiManager.currentChars).toContain('HELLO');
    });

    it('should create gradient with spaces for dark areas', () => {
      asciiManager.updateCharacters('ABC');
      expect(asciiManager.currentChars).toMatch(/^\s+/); // Should start with spaces
    });

    it('should handle short text by adding variations', () => {
      asciiManager.updateCharacters('A');
      expect(asciiManager.currentChars.length).toBeGreaterThan(1);
    });

    it('should repeat characters to reach target length', () => {
      asciiManager.updateCharacters('AB');
      expect(asciiManager.currentChars.length).toBeGreaterThanOrEqual(50);
    });

    it('should recreate effect', () => {
      asciiManager.updateCharacters('TEST');
      // Effect should be recreated (a new instance)
      expect(mockContainer.removeChild).toHaveBeenCalled();
      expect(mockContainer.appendChild).toHaveBeenCalled();
    });
  });

  describe('setTheme', () => {
    it('should set dark theme', () => {
      asciiManager.setTheme(true);
      expect(mockDomElement.style.color).toBe('white');
      expect(mockDomElement.style.backgroundColor).toBe('black');
    });

    it('should set light theme', () => {
      asciiManager.setTheme(false);
      expect(mockDomElement.style.color).toBe('black');
      expect(mockDomElement.style.backgroundColor).toBe('white');
    });
  });

  describe('getText', () => {
    it('should return ASCII text content', () => {
      const text = asciiManager.getText();
      expect(text).toBe('ASCII art here');
    });

    it('should return empty string if no effect', () => {
      asciiManager.effect = null;
      const text = asciiManager.getText();
      expect(text).toBe('');
    });
  });

  describe('render', () => {
    it('should call effect render', () => {
      const mockScene = { name: 'scene' };
      const mockCamera = { name: 'camera' };
      asciiManager.render(mockScene, mockCamera);
      expect(mockEffect.render).toHaveBeenCalledWith(mockScene, mockCamera);
    });
  });

  describe('getDomElement', () => {
    it('should return effect DOM element', () => {
      const element = asciiManager.getDomElement();
      expect(element).toBe(mockDomElement);
    });
  });

  describe('updateScale', () => {
    it('should call setSize on effect', () => {
      asciiManager.updateScale();
      expect(mockEffect.setSize).toHaveBeenCalled();
    });

    it('should apply scale transform', () => {
      asciiManager.scaleFactor = 2.0;
      asciiManager.updateScale();
      expect(mockDomElement.style.transform).toContain('scale(0.5)');
    });

    it('should handle missing container gracefully', () => {
      asciiManager.container = null;
      expect(() => {
        asciiManager.updateScale();
      }).not.toThrow();
    });

    it('should handle missing effect gracefully', () => {
      asciiManager.effect = null;
      expect(() => {
        asciiManager.updateScale();
      }).not.toThrow();
    });
  });
});
