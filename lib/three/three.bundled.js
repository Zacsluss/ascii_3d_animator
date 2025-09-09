// Three.js Bundled Module - Optimized for ASCII 3D Animator
// This is a wrapper to load Three.js modules efficiently

// Re-export everything from the modular version
export * from './three.module.js';

// Performance optimization: Mark as loaded
if (typeof window !== 'undefined') {
    window.__THREE_LOADED__ = true;
    console.log('Three.js bundle loaded successfully');
}