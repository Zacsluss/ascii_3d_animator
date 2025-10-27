/**
 * Main Application class
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

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());

    // Set initial theme to dark
    document.body.classList.add('dark');
    this.asciiManager.setTheme(true);
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
      CONFIG.CAMERA.FAR
    );
    this.camera.position.set(
      CONFIG.CAMERA.DEFAULT_POSITION.x,
      CONFIG.CAMERA.DEFAULT_POSITION.y,
      CONFIG.CAMERA.DEFAULT_POSITION.z
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
   * Load the initial model
   */
  async loadInitialModel() {
    const modelName = CONFIG.MODELS.NAMES[0];
    const result = await this.modelManager.loadModel(modelName);

    this.animationManager.initialize(
      result.model,
      result.animations,
      result.preferredAnimation
    );

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
    const delta = this.clock.getDelta();
    this.animationManager.update(delta);
    this.controls.update();
    this.asciiManager.render(this.scene, this.camera);
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
   */
  async switchModel() {
    const modelName = await this.modelManager.switchToNext();
    const result = await this.modelManager.loadModel(modelName);

    this.animationManager.initialize(
      result.model,
      result.animations,
      result.preferredAnimation
    );

    return modelName;
  }

  /**
   * Switch to next animation
   */
  switchAnimation() {
    return this.animationManager.switchToNext();
  }

  /**
   * Set ASCII density
   */
  setAsciiDensity(scale) {
    this.asciiManager.setScale(scale);
  }

  /**
   * Update ASCII characters
   */
  updateAsciiCharacters(chars) {
    this.asciiManager.updateCharacters(chars);
    // Recreate controls with new ASCII element
    this.controls = new OrbitControls(this.camera, this.asciiManager.getDomElement());
    this.setupControls();
  }

  /**
   * Set animation speed
   */
  setAnimationSpeed(speed) {
    this.animationManager.setSpeed(speed);
  }

  /**
   * Toggle auto rotation
   */
  toggleAutoRotation() {
    this.controls.autoRotate = !this.controls.autoRotate;
    return this.controls.autoRotate;
  }

  /**
   * Set rotation speed
   */
  setRotationSpeed(speed) {
    this.controls.autoRotateSpeed = speed;
  }

  /**
   * Set camera distance
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
   */
  setLightingPreset(preset) {
    this.lightingManager.setPreset(preset);
  }

  /**
   * Set individual light intensity
   */
  setLightIntensity(lightName, intensity) {
    this.lightingManager.setIntensity(lightName, intensity);
  }

  /**
   * Get current light intensities
   */
  getLightIntensities() {
    return this.lightingManager.getIntensities();
  }

  /**
   * Set theme (dark or light)
   */
  setTheme(isDark) {
    this.asciiManager.setTheme(isDark);
  }

  /**
   * Get ASCII art as text
   */
  getAsciiText() {
    return this.asciiManager.getText();
  }

  /**
   * Get current model name
   */
  getCurrentModelName() {
    return this.modelManager.getCurrentModelName();
  }
}

// Initialize app when DOM is loaded
const app = new AsciiAnimatorApp();
app.initialize();
