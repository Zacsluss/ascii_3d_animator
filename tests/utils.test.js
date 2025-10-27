import { describe, it, expect, vi } from 'vitest';
import { debounce, validateFileSize, validateFileExtension } from '../js/utils.js';

// Utility functions test suite
describe('Utils Module', () => {
  describe('debounce', () => {
    it('should delay function execution', async () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      expect(func).not.toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(func).toHaveBeenCalledOnce();
    });

    it('should cancel previous calls', async () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(func).toHaveBeenCalledOnce();
    });
  });

  describe('validateFileSize', () => {
    it('should return true for files within size limit', () => {
      const file = { size: 5 * 1024 * 1024 }; // 5MB
      expect(validateFileSize(file, 10)).toBe(true);
    });

    it('should return false for files exceeding size limit', () => {
      const file = { size: 15 * 1024 * 1024 }; // 15MB
      expect(validateFileSize(file, 10)).toBe(false);
    });

    it('should return true for files exactly at size limit', () => {
      const file = { size: 10 * 1024 * 1024 }; // 10MB
      expect(validateFileSize(file, 10)).toBe(true);
    });
  });

  describe('validateFileExtension', () => {
    it('should return true for allowed extensions', () => {
      const file = { name: 'model.glb' };
      expect(validateFileExtension(file, ['.glb', '.gltf'])).toBe(true);
    });

    it('should return false for disallowed extensions', () => {
      const file = { name: 'model.obj' };
      expect(validateFileExtension(file, ['.glb', '.gltf'])).toBe(false);
    });

    it('should be case insensitive', () => {
      const file = { name: 'model.GLB' };
      expect(validateFileExtension(file, ['.glb', '.gltf'])).toBe(true);
    });

    it('should handle files with multiple dots', () => {
      const file = { name: 'my.model.file.glb' };
      expect(validateFileExtension(file, ['.glb', '.gltf'])).toBe(true);
    });
  });
});
