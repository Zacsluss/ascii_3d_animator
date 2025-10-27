/**
 * 3D animation system management
 * @module animation
 */

import * as THREE from '../lib/three/three.module.js';
import { CONFIG } from './constants.js';

export class AnimationManager {
  constructor() {
    this.mixer = null;
    this.clock = new THREE.Clock();
    this.currentAnimations = [];
    this.currentAnimationIndex = 0;
    this.currentPlayingAction = null;
    this.animationSpeed = CONFIG.ANIMATION.DEFAULT_SPEED;
  }

  /**
   * Initialize animations for a model
   * @param {THREE.Object3D} model - The 3D model
   * @param {Array} animations - Array of animation clips
   * @param {string} preferredAnimation - Name of preferred default animation
   */
  initialize(model, animations, preferredAnimation = null) {
    if (!animations || animations.length === 0) {
      this.mixer = null;
      this.currentAnimations = [];
      return;
    }

    this.mixer = new THREE.AnimationMixer(model);
    this.currentAnimations = [...animations];
    this.currentAnimationIndex = 0;

    // Find preferred animation or use first
    let defaultClip = this.currentAnimations[0];
    let defaultIndex = 0;

    if (preferredAnimation) {
      const preferredClip = this.currentAnimations.find((clip) => clip.name === preferredAnimation);
      if (preferredClip) {
        defaultClip = preferredClip;
        defaultIndex = this.currentAnimations.indexOf(preferredClip);
      }
    }

    this.currentAnimationIndex = defaultIndex;
    this.playAnimation(defaultClip);
  }

  /**
   * Play a specific animation clip
   * @param {THREE.AnimationClip} clip - Animation clip to play
   */
  playAnimation(clip) {
    if (!this.mixer || !clip) {
      return;
    }

    if (this.currentPlayingAction) {
      this.currentPlayingAction.stop();
    }

    this.currentPlayingAction = this.mixer.clipAction(clip);
    this.currentPlayingAction.setLoop(THREE.LoopRepeat, Infinity);
    this.currentPlayingAction.setEffectiveTimeScale(this.animationSpeed);
    this.currentPlayingAction.reset().play();
  }

  /**
   * Switch to next animation in the list
   * @returns {object | null} Current animation info or null
   */
  switchToNext() {
    if (this.currentAnimations.length === 0 || !this.mixer) {
      return null;
    }

    this.currentAnimationIndex = (this.currentAnimationIndex + 1) % this.currentAnimations.length;
    const nextClip = this.currentAnimations[this.currentAnimationIndex];

    this.playAnimation(nextClip);

    return {
      name: nextClip.name,
      index: this.currentAnimationIndex,
      total: this.currentAnimations.length,
    };
  }

  /**
   * Set animation speed
   * @param {number} speed - Speed multiplier
   */
  setSpeed(speed) {
    this.animationSpeed = speed;
    if (this.currentPlayingAction) {
      this.currentPlayingAction.setEffectiveTimeScale(speed);
    }
  }

  /**
   * Update animations (call every frame)
   * @param {number} delta - Time delta (optional, uses internal clock if not provided)
   */
  update(delta = null) {
    if (!this.mixer) {
      return;
    }

    const dt = delta !== null ? delta : this.clock.getDelta();
    const clampedDelta = Math.min(dt, CONFIG.ANIMATION.MAX_DELTA);
    this.mixer.update(clampedDelta);
  }

  /**
   * Get information about current animations
   * @returns {object} Animation info
   */
  getInfo() {
    return {
      hasAnimations: this.currentAnimations.length > 0,
      count: this.currentAnimations.length,
      currentIndex: this.currentAnimationIndex,
      currentName: this.currentAnimations[this.currentAnimationIndex]?.name || null,
      speed: this.animationSpeed,
    };
  }

  /**
   * Dispose of animation resources
   */
  dispose() {
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer = null;
    }
    this.currentAnimations = [];
    this.currentPlayingAction = null;
  }
}
