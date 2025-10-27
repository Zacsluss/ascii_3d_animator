/**
 * Professional lighting system management for the 3D scene
 * @module lighting
 */

import * as THREE from '../lib/three/three.module.js';
import { CONFIG } from './constants.js';

export class LightingManager {
  constructor(scene) {
    this.scene = scene;
    this.lights = {
      main: null,
      ambient: null,
      red: null,
      blue: null,
      spotlight: null,
    };

    this.initializeLights();
  }

  /**
   * Initialize all lights in the scene
   */
  initializeLights() {
    const { POSITIONS, COLORS, PRESETS } = CONFIG.LIGHTING;
    const defaultPreset = PRESETS.default;

    // Main front light
    this.lights.main = new THREE.PointLight(COLORS.WHITE, defaultPreset.main, 0, 0);
    this.lights.main.position.set(POSITIONS.MAIN.x, POSITIONS.MAIN.y, POSITIONS.MAIN.z);
    this.scene.add(this.lights.main);

    // Ambient fill light
    this.lights.ambient = new THREE.AmbientLight(COLORS.WHITE, defaultPreset.ambient);
    this.scene.add(this.lights.ambient);

    // Right rim light (red)
    this.lights.red = new THREE.PointLight(COLORS.RED, defaultPreset.red, 0, 0);
    this.lights.red.position.set(POSITIONS.RED.x, POSITIONS.RED.y, POSITIONS.RED.z);
    this.scene.add(this.lights.red);

    // Left rim light (blue)
    this.lights.blue = new THREE.PointLight(COLORS.BLUE, defaultPreset.blue, 0, 0);
    this.lights.blue.position.set(POSITIONS.BLUE.x, POSITIONS.BLUE.y, POSITIONS.BLUE.z);
    this.scene.add(this.lights.blue);

    // Overhead spotlight
    this.lights.spotlight = new THREE.SpotLight(COLORS.WHITE, defaultPreset.spotlight);
    this.lights.spotlight.position.set(
      POSITIONS.SPOTLIGHT.x,
      POSITIONS.SPOTLIGHT.y,
      POSITIONS.SPOTLIGHT.z,
    );
    this.lights.spotlight.target.position.set(0, 0, 0);
    this.lights.spotlight.angle = Math.PI / 4;
    this.lights.spotlight.penumbra = 0.2;
    this.lights.spotlight.decay = 0;
    this.lights.spotlight.distance = 0;
    this.scene.add(this.lights.spotlight);
    this.scene.add(this.lights.spotlight.target);
  }

  /**
   * Set lighting preset
   * @param {string} presetName - Name of the preset (studio, dramatic, natural, minimal, default)
   */
  setPreset(presetName) {
    const preset = CONFIG.LIGHTING.PRESETS[presetName];
    if (!preset) {
      return;
    }

    this.lights.main.intensity = preset.main;
    this.lights.ambient.intensity = preset.ambient;
    this.lights.red.intensity = preset.red;
    this.lights.blue.intensity = preset.blue;
    this.lights.spotlight.intensity = preset.spotlight;
  }

  /**
   * Set individual light intensity
   * @param {string} lightName - Name of the light (main, ambient, red, blue, spotlight)
   * @param {number} intensity - Intensity value
   */
  setIntensity(lightName, intensity) {
    if (this.lights[lightName]) {
      this.lights[lightName].intensity = intensity;
    }
  }

  /**
   * Get current light intensities
   * @returns {object} Current intensities for all lights
   */
  getIntensities() {
    return {
      main: this.lights.main?.intensity || 0,
      ambient: this.lights.ambient?.intensity || 0,
      red: this.lights.red?.intensity || 0,
      blue: this.lights.blue?.intensity || 0,
      spotlight: this.lights.spotlight?.intensity || 0,
    };
  }
}
