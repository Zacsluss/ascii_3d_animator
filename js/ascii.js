/**
 * ASCII effect rendering management
 * @module ascii
 */

import { AsciiEffect } from '../lib/three/AsciiEffect.js';
import { CONFIG } from './constants.js';

export class AsciiManager {
  constructor(renderer, container) {
    this.renderer = renderer;
    this.container = container;
    this.effect = null;
    this.scaleFactor = CONFIG.ASCII.DEFAULT_SCALE;
    this.currentChars = CONFIG.ASCII.DEFAULT_CHARS.slice(0, CONFIG.ASCII.BASE_DENSITY);

    this.initialize();
  }

  /**
   * Initialize the ASCII effect
   */
  initialize() {
    this.effect = new AsciiEffect(this.renderer, this.currentChars, { invert: true });
    this.applyStyles();
    this.container.appendChild(this.effect.domElement);
    this.updateScale();
  }

  /**
   * Apply CSS styles to the ASCII effect element
   */
  applyStyles() {
    const style = this.effect.domElement.style;
    style.color = 'black';
    style.backgroundColor = 'white';
    style.fontWeight = CONFIG.ASCII.FONT_WEIGHT;
    style.fontFamily = CONFIG.ASCII.FONT_FAMILY;
    style.fontSize = CONFIG.ASCII.FONT_SIZE;
    style.textShadow = 'none';
    style.position = 'absolute';
    style.top = '50%';
    style.left = '50%';
    style.transformOrigin = 'center center';
  }

  /**
   * Update the scale of the ASCII effect
   *
   * How ASCII density works:
   * - Higher scaleFactor (e.g., 2.0) = MORE characters = HIGHER detail
   * - Lower scaleFactor (e.g., 0.5) = FEWER characters = LOWER detail
   *
   * We achieve this through a clever trick:
   * 1. Render ASCII at LARGER size (rect.width * 2.0 = 2x more characters)
   * 2. Then SCALE DOWN the DOM element to fit container (scale(1/2.0) = 50% size)
   * Result: More characters squeezed into same space = higher density
   *
   * Example with 800px container:
   * - scaleFactor=1.0: Render 800px worth of chars, scale(1.0) = normal density
   * - scaleFactor=2.0: Render 1600px worth of chars, scale(0.5) = 2x density (chars appear smaller)
   * - scaleFactor=0.5: Render 400px worth of chars, scale(2.0) = 0.5x density (chars appear larger)
   */
  updateScale() {
    if (!this.effect || !this.container) {
      return;
    }

    // Get current container dimensions
    const rect = this.container.getBoundingClientRect();

    // Step 1: Tell ASCII effect to render MORE/FEWER characters
    // scaleFactor=2.0 means "render as if canvas is 2x bigger" (more chars)
    this.effect.setSize(rect.width * this.scaleFactor, rect.height * this.scaleFactor);

    // Step 2: Scale the DOM element back down to fit container
    // Inverse scale keeps visual size same but changes char density
    // translate(-50%, -50%) centers the element first
    this.effect.domElement.style.transform = `translate(-50%, -50%) scale(${1 / this.scaleFactor})`;
  }

  /**
   * Set the scale factor for ASCII density
   * @param {number} factor - Scale factor (0.5 - 3.0)
   */
  setScale(factor) {
    this.scaleFactor = Math.max(CONFIG.ASCII.MIN_SCALE, Math.min(CONFIG.ASCII.MAX_SCALE, factor));
    this.updateScale();
  }

  /**
   * Update the character set used for rendering
   * @param {string} customChars - Custom character string (empty for default)
   */
  updateCharacters(customChars) {
    let chars;

    if (!customChars || customChars.trim() === '') {
      // Use default gradient: ' .\'`^",:;Il!i' and more (60+ chars from dark to bright)
      chars = CONFIG.ASCII.DEFAULT_CHARS;
    } else {
      // ASCII rendering works by mapping depth/brightness values to characters
      // Characters at the start of the string = dark pixels
      // Characters at the end of the string = bright pixels
      // So we create a gradient: spaces (shadows) -> custom chars (highlights)

      const userText = customChars.trim();

      // Start with spaces for dark areas (shadows, background)
      // Then user's custom characters for mid-tones and highlights
      // Example: "ZAC" becomes "   ZAC" (3 spaces for darks, ZAC for brights)
      chars = '   ' + userText;

      // For very short input (1-2 chars), we need more variation to avoid
      // banding artifacts (where distinct brightness levels show clear boundaries)
      // Add intermediate gradations: spaces -> dot -> lowercase -> UPPERCASE
      // Example: "A" becomes "    .aA" (4 brightness levels instead of 2)
      if (userText.length < 3) {
        chars = '    .' + userText + userText.toUpperCase();
      }

      // ASCII Effect expects ~50+ characters for smooth gradients
      // If user provides "ABC" (3 chars), repeat it: "   ABC   ABC   ABC..."
      // This gives the renderer more options when mapping brightness values
      const targetLength = 50;
      if (chars.length < targetLength) {
        const repeats = Math.ceil(targetLength / chars.length);
        chars = chars.repeat(repeats);
      }
    }

    this.currentChars = chars;
    this.recreateEffect();
  }

  /**
   * Recreate the ASCII effect with new settings
   */
  recreateEffect() {
    const oldEffect = this.effect;
    this.effect = new AsciiEffect(this.renderer, this.currentChars, { invert: true });

    // Copy styles
    this.copyStyles(oldEffect, this.effect);

    // Replace in DOM
    if (this.container.contains(oldEffect.domElement)) {
      this.container.removeChild(oldEffect.domElement);
      this.container.appendChild(this.effect.domElement);
      this.updateScale();
    }
  }

  /**
   * Copy styles from old effect to new effect
   * @param {object} oldEffect - Old ASCII effect
   * @param {object} newEffect - New ASCII effect
   */
  copyStyles(oldEffect, newEffect) {
    const oldStyle = oldEffect.domElement.style;
    const newStyle = newEffect.domElement.style;

    newStyle.color = oldStyle.color;
    newStyle.backgroundColor = oldStyle.backgroundColor;
    newStyle.fontWeight = oldStyle.fontWeight;
    newStyle.fontFamily = oldStyle.fontFamily;
    newStyle.fontSize = oldStyle.fontSize;
    newStyle.textShadow = oldStyle.textShadow;
    newStyle.position = oldStyle.position;
    newStyle.top = oldStyle.top;
    newStyle.left = oldStyle.left;
    newStyle.transformOrigin = oldStyle.transformOrigin;
  }

  /**
   * Set the theme (dark or light)
   * @param {boolean} isDark - True for dark theme, false for light
   */
  setTheme(isDark) {
    if (isDark) {
      this.effect.domElement.style.color = 'white';
      this.effect.domElement.style.backgroundColor = 'black';
    } else {
      this.effect.domElement.style.color = 'black';
      this.effect.domElement.style.backgroundColor = 'white';
    }
  }

  /**
   * Get the current ASCII art as text
   * @returns {string} ASCII art text
   */
  getText() {
    return this.effect?.domElement?.textContent || '';
  }

  /**
   * Render the scene
   * @param {THREE.Scene} scene - The 3D scene
   * @param {THREE.Camera} camera - The camera
   */
  render(scene, camera) {
    this.effect.render(scene, camera);
  }

  /**
   * Get the DOM element for controls
   * @returns {HTMLElement} The ASCII effect DOM element
   */
  getDomElement() {
    return this.effect.domElement;
  }
}
