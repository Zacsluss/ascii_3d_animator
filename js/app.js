/**
 * Main Application Controller
 * @module app
 */

import * as THREE from '../lib/three/three.module.js';
import { OrbitControls } from '../lib/three/OrbitControls.js';
import { CONFIG } from './constants.js';
import { LightingManager } from './lighting.js';
import { ModelManager } from './models.js';
import { AnimationManager } from './animation.js';
import { AsciiManager } from './ascii.js';
import { UIManager } from './ui.js';
import { debounce } from './utils.js';

export class AsciiAnimatorApp {
  constructor() {
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.controls = null;
    this.container = null;

    this.lightingManager = null;
    this.modelManager = null;
    this.animationManager = null;
    this.asciiManager = null;
    this.uiManager = null;

    this.clock = new THREE.Clock();
  }

  /**
   * Initialize the application
   */
  async initialize() {
    this.setupScene();
    this.setupRenderer();
    this.container = document.getElementById('canvasContainer');

    // Initialize managers
    this.lightingManager = new LightingManager(this.scene);
    this.modelManager = new ModelManager(this.scene);
    this.animationManager = new AnimationManager();
    this.asciiManager = new AsciiManager(this.renderer, this.container);

    // Setup controls
    this.setupControls();

    // Setup container
    this.setupContainer();

    // Load initial model
    await this.loadInitialModel();

    // Initialize UI last (after all managers are ready)
    this.uiManager = new UIManager(this);

    // Start animation loop
    this.renderer.setAnimationLoop(() => this.animate());

    // Handle window resize with debouncing for better performance
    window.addEventListener(
      'resize',
      debounce(() => this.onWindowResize(), 250),
    );

    // Handle WebGL context loss
    this.setupWebGLContextHandling();

    // Handle visibility change for pause/resume
    this.setupVisibilityHandling();

    // Initial theme will be set by UIManager based on selected dropdown value
  }

  /**
   * Setup Three.js scene
   */
  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(CONFIG.SCENE.BACKGROUND_COLOR);

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(
      CONFIG.CAMERA.FOV,
      width / height,
      CONFIG.CAMERA.NEAR,
      CONFIG.CAMERA.FAR,
    );
    this.camera.position.set(
      CONFIG.CAMERA.DEFAULT_POSITION.x,
      CONFIG.CAMERA.DEFAULT_POSITION.y,
      CONFIG.CAMERA.DEFAULT_POSITION.z,
    );
  }

  /**
   * Setup Three.js renderer
   */
  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = CONFIG.SCENE.SHADOW_MAP_ENABLED;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  /**
   * Setup orbit controls
   */
  setupControls() {
    this.controls = new OrbitControls(this.camera, this.asciiManager.getDomElement());
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = CONFIG.ROTATION.DEFAULT_SPEED;
    this.controls.enableDamping = CONFIG.ROTATION.DAMPING;
    this.controls.enablePan = false;
    this.controls.enableRotate = true;
    this.controls.rotateSpeed = CONFIG.ROTATION.ROTATE_SPEED;
    this.controls.minDistance = CONFIG.CAMERA.MIN_DISTANCE;
    this.controls.maxDistance = CONFIG.CAMERA.MAX_DISTANCE;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.target.set(0, 0, 0);
  }

  /**
   * Setup canvas container
   */
  setupContainer() {
    this.container.style.width = window.innerWidth + 'px';
    this.container.style.height = window.innerHeight + 'px';
  }

  /**
   * Setup WebGL context loss/restore handling
   */
  setupWebGLContextHandling() {
    this.renderer.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();

      // Stop animation loop
      this.renderer.setAnimationLoop(null);

      // Show notification to user
      const errorDiv = document.createElement('div');
      errorDiv.id = 'webgl-context-error';
      errorDiv.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: #ff9800; color: white; padding: 20px 40px; border-radius: 8px;
        font-family: Arial, sans-serif; text-align: center; z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      `;
      errorDiv.innerHTML = `
        <h2 style="margin: 0 0 10px 0;">⚠️ Graphics Context Lost</h2>
        <p style="margin: 0;">Attempting to restore... Please wait.</p>
      `;
      document.body.appendChild(errorDiv);
    });

    this.renderer.domElement.addEventListener('webglcontextrestored', () => {
      // Remove error message
      const errorDiv = document.getElementById('webgl-context-error');
      if (errorDiv) {
        document.body.removeChild(errorDiv);
      }

      // Restart animation loop
      this.renderer.setAnimationLoop(() => this.animate());

      // Reload current model to restore GPU resources
      const currentModelName = this.modelManager.getCurrentModelName();
      this.modelManager.loadModel(currentModelName).then((result) => {
        this.animationManager.initialize(
          result.model,
          result.animations,
          result.preferredAnimation,
        );
      });
    });
  }

  /**
   * Setup visibility change handling for pause/resume
   */
  setupVisibilityHandling() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page is hidden, pause clock
        this.clock.stop();
      } else {
        // Page is visible again, resume clock
        this.clock.start();
        // Get delta to clear accumulated time
        this.clock.getDelta();
      }
    });
  }

  /**
   * Load the initial model
   */
  async loadInitialModel() {
    const modelName = CONFIG.MODELS.NAMES[0];
    const result = await this.modelManager.loadModel(modelName);

    this.animationManager.initialize(result.model, result.animations, result.preferredAnimation);

    this.camera.lookAt(0, 0, 0);

    // Update UI
    const modelInfo = document.getElementById('modelInfo');
    if (modelInfo) {
      modelInfo.textContent = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    }
  }

  /**
   * Main animation loop
   */
  animate() {
    try {
      const rawDelta = this.clock.getDelta();
      const delta = Math.min(rawDelta, CONFIG.ANIMATION.MAX_DELTA); // Clamp delta

      this.animationManager.update(delta);
      this.controls.update();
      this.asciiManager.render(this.scene, this.camera);
    } catch (error) {
      this.handleRenderError(error);
    }
  }

  /**
   * Handle rendering errors
   * @param {Error} error - The error that occurred
   */
  handleRenderError(_error) {
    // Stop animation loop to prevent error spam
    this.renderer.setAnimationLoop(null);

    // Show user-friendly error
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: #ff4444; color: white; padding: 20px 40px; border-radius: 8px;
      font-family: Arial, sans-serif; text-align: center; z-index: 10000;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    errorDiv.innerHTML = `
      <h2 style="margin: 0 0 10px 0;">⚠️ Rendering Error</h2>
      <p style="margin: 0 0 15px 0;">Something went wrong. Please refresh.</p>
      <button onclick="location.reload()" style="
        background: white; color: #ff4444; border: none; padding: 10px 20px;
        border-radius: 4px; cursor: pointer; font-weight: bold;
      ">Reload Page</button>
    `;
    document.body.appendChild(errorDiv);
  }

  /**
   * Handle window resize
   */
  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    if (this.container) {
      this.container.style.width = width + 'px';
      this.container.style.height = height + 'px';
    }

    this.asciiManager.updateScale();
  }

  /**
   * Switch to next model
   * @returns {Promise<string>} The name of the newly loaded model
   */
  async switchModel() {
    const modelName = await this.modelManager.switchToNext();
    const result = await this.modelManager.loadModel(modelName);

    this.animationManager.initialize(result.model, result.animations, result.preferredAnimation);

    return modelName;
  }

  /**
   * Load a model from a user-uploaded file
   * @param {File} file - The file to load
   * @returns {Promise<object>} Result containing fileName
   */
  async loadModelFromFile(file) {
    const result = await this.modelManager.loadModelFromFile(file);
    this.animationManager.initialize(result.model, result.animations, result.preferredAnimation);
    return result;
  }

  /**
   * Switch to next animation
   * @returns {string} The name of the newly loaded animation
   */
  switchAnimation() {
    return this.animationManager.switchToNext();
  }

  /**
   * Set ASCII density with validation
   * @param {number} scale - The ASCII scale/density value
   */
  setAsciiDensity(scale) {
    const clampedScale = Math.max(CONFIG.ASCII.MIN_SCALE, Math.min(CONFIG.ASCII.MAX_SCALE, scale));
    this.asciiManager.setScale(clampedScale);
  }

  /**
   * Update ASCII characters
   * @param {string} chars - The character set to use for ASCII rendering
   */
  updateAsciiCharacters(chars) {
    this.asciiManager.updateCharacters(chars);
    // Dispose old controls to prevent memory leak
    if (this.controls) {
      this.controls.dispose();
    }
    // Recreate controls with new ASCII element
    this.controls = new OrbitControls(this.camera, this.asciiManager.getDomElement());
    this.setupControls();
  }

  /**
   * Set animation speed with validation
   * @param {number} speed - The animation speed multiplier
   */
  setAnimationSpeed(speed) {
    const clampedSpeed = Math.max(
      CONFIG.ANIMATION.MIN_SPEED,
      Math.min(CONFIG.ANIMATION.MAX_SPEED, speed),
    );
    this.animationManager.setSpeed(clampedSpeed);
  }

  /**
   * Toggle auto rotation
   * @returns {boolean} The new auto-rotation state
   */
  toggleAutoRotation() {
    this.controls.autoRotate = !this.controls.autoRotate;
    return this.controls.autoRotate;
  }

  /**
   * Set rotation speed with validation
   * @param {number} speed - The rotation speed value
   */
  setRotationSpeed(speed) {
    const clampedSpeed = Math.max(
      CONFIG.ROTATION.MIN_SPEED,
      Math.min(CONFIG.ROTATION.MAX_SPEED, speed),
    );
    this.controls.autoRotateSpeed = clampedSpeed;
  }

  /**
   * Set camera distance
   * @param {number} distance - The distance from camera to target
   */
  setCameraDistance(distance) {
    const direction = this.camera.position.clone().normalize();
    this.camera.position.copy(direction.multiplyScalar(distance));
    this.controls.update();
  }

  /**
   * Reset camera to default
   */
  resetCamera() {
    this.controls.reset();
    this.asciiManager.setScale(CONFIG.ASCII.DEFAULT_SCALE);
    this.lightingManager.setPreset('default');
  }

  /**
   * Set lighting preset
   * @param {string} preset - The name of the lighting preset
   */
  setLightingPreset(preset) {
    this.lightingManager.setPreset(preset);
  }

  /**
   * Set individual light intensity with validation
   * @param {string} lightName - The name of the light to modify
   * @param {number} intensity - The intensity value for the light
   */
  setLightIntensity(lightName, intensity) {
    // Clamp intensity to reasonable range (0-20)
    const clampedIntensity = Math.max(0, Math.min(20, intensity));
    this.lightingManager.setIntensity(lightName, clampedIntensity);
  }

  /**
   * Get current light intensities
   * @returns {object} Object containing current light intensity values
   */
  getLightIntensities() {
    return this.lightingManager.getIntensities();
  }

  /**
   * Set theme (dark or light)
   * @param {boolean} isDark - True for dark theme, false for light theme
   */
  setTheme(isDark) {
    this.asciiManager.setTheme(isDark);
  }

  /**
   * Get ASCII art as text
   * @returns {string} The current ASCII art as text
   */
  getAsciiText() {
    return this.asciiManager.getText();
  }

  /**
   * Get current model name
   * @returns {string} The name of the currently loaded model
   */
  getCurrentModelName() {
    return this.modelManager.getCurrentModelName();
  }
}

// Initialize app when DOM is loaded with error handling
const app = new AsciiAnimatorApp();
app.initialize().catch((_error) => {
  // Display user-friendly error message
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: #ff4444; color: white; padding: 20px 40px; border-radius: 8px;
    font-family: Arial, sans-serif; text-align: center; z-index: 10000;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;
  errorDiv.innerHTML = `
    <h2 style="margin: 0 0 10px 0;">⚠️ Failed to Load</h2>
    <p style="margin: 0;">Could not initialize. Please refresh the page.</p>
  `;
  document.body.appendChild(errorDiv);
});
