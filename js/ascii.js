/**
 * ASCII Effect management
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
   */
  updateScale() {
    if (!this.effect || !this.container) return;

    const rect = this.container.getBoundingClientRect();
    this.effect.setSize(rect.width * this.scaleFactor, rect.height * this.scaleFactor);
    this.effect.domElement.style.transform = `translate(-50%, -50%) scale(${1 / this.scaleFactor})`;
  }

  /**
   * Set the scale factor for ASCII density
   * @param {number} factor - Scale factor (0.5 - 3.0)
   */
  setScale(factor) {
    this.scaleFactor = Math.max(
      CONFIG.ASCII.MIN_SCALE,
      Math.min(CONFIG.ASCII.MAX_SCALE, factor)
    );
    this.updateScale();
  }

  /**
   * Update the character set used for rendering
   * @param {string} customChars - Custom character string (empty for default)
   */
  updateCharacters(customChars) {
    let chars;

    if (!customChars || customChars.trim() === '') {
      chars = CONFIG.ASCII.DEFAULT_CHARS;
    } else {
      // Create gradient: spaces (dark) -> user characters (bright)
      const userText = customChars.trim();
      chars = '   ' + userText;

      // For short text, create more gradations
      if (userText.length < 3) {
        chars = '    .' + userText + userText.toUpperCase();
      }

      // Repeat to have enough characters
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
   * @param {Object} oldEffect - Old ASCII effect
   * @param {Object} newEffect - New ASCII effect
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
