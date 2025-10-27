/**
 * 3D model loading and management
 * @module models
 */

import * as THREE from '../lib/three/three.module.js';
import { GLTFLoader } from '../lib/three/GLTFLoader.js';
import { CONFIG } from './constants.js';

export class ModelManager {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.currentModel = null;
    this.currentModelIndex = 0;
    this.modelLoadVersion = 0;
  }

  /**
   * Load a model by name
   * @param {string} modelName - Name of the model to load
   * @returns {Promise} Promise that resolves when model is loaded
   */
  async loadModel(modelName) {
    // Cleanup old model
    this.disposeCurrentModel();

    const thisLoadVersion = ++this.modelLoadVersion;
    const config = CONFIG.MODELS.CONFIGS[modelName];

    if (!config) {
      throw new Error(`Model config not found for: ${modelName}`);
    }

    return new Promise((resolve, reject) => {
      this.loader.load(
        config.path,
        (gltf) => {
          // Skip if a newer load has occurred
          if (thisLoadVersion !== this.modelLoadVersion) {
            return;
          }

          this.currentModel = gltf.scene;
          this.processModel(gltf, config);
          this.scene.add(this.currentModel);

          resolve({
            model: this.currentModel,
            animations: gltf.animations,
            preferredAnimation: config.preferredAnimation,
          });
        },
        undefined,
        (error) => {
          reject(error);
        },
      );
    });
  }

  /**
   * Load a model from a file (user upload)
   * @param {File} file - The file object to load
   * @returns {Promise} Promise that resolves when model is loaded
   */
  async loadModelFromFile(file) {
    // Cleanup old model
    this.disposeCurrentModel();

    const thisLoadVersion = ++this.modelLoadVersion;

    // Create a URL for the file
    const url = URL.createObjectURL(file);

    // Use default config for uploaded models
    const config = {
      scaleMultiplier: 6.0,
      preferredAnimation: null,
    };

    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => {
          // Revoke the object URL to free memory
          URL.revokeObjectURL(url);

          // Skip if a newer load has occurred
          if (thisLoadVersion !== this.modelLoadVersion) {
            return;
          }

          this.currentModel = gltf.scene;
          this.processModel(gltf, config);
          this.scene.add(this.currentModel);

          resolve({
            model: this.currentModel,
            animations: gltf.animations,
            preferredAnimation: config.preferredAnimation,
            fileName: file.name,
          });
        },
        undefined,
        (error) => {
          // Revoke the object URL even on error
          URL.revokeObjectURL(url);
          reject(error);
        },
      );
    });
  }

  /**
   * Process loaded model (scale, center, configure materials)
   * @param {object} gltf - Loaded GLTF object
   * @param {object} config - Model configuration
   */
  processModel(gltf, config) {
    const model = gltf.scene;

    // Calculate scale and center
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = (CONFIG.MODELS.DESIRED_SIZE / maxDim) * config.scaleMultiplier;

    model.scale.setScalar(scale);
    model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    model.originalPosition = model.position.clone();

    // Configure materials for proper lighting
    model.traverse((child) => {
      if (child.isMesh) {
        this.configureMaterial(child);
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  /**
   * Configure material to respond to lighting
   * @param {THREE.Mesh} mesh - Mesh to configure
   */
  configureMaterial(mesh) {
    if (!mesh.material) {
      return;
    }

    const material = mesh.material;

    // Configure PBR materials
    if (material.type === 'MeshStandardMaterial' || material.type === 'MeshPhysicalMaterial') {
      material.metalness = 0.1;
      material.roughness = 0.8;
    } else if (material.type === 'MeshBasicMaterial' || material.type === 'MeshLambertMaterial') {
      // Convert MeshBasicMaterial to MeshLambertMaterial (Basic doesn't respond to lights)
      if (material.type === 'MeshBasicMaterial') {
        const oldMaterial = material;
        mesh.material = new THREE.MeshLambertMaterial({
          color: oldMaterial.color,
          map: oldMaterial.map,
          transparent: oldMaterial.transparent,
          opacity: oldMaterial.opacity,
        });
      }
    } else {
      // Convert unknown material types to Lambert
      const oldMaterial = material;
      mesh.material = new THREE.MeshLambertMaterial({
        color: oldMaterial.color || new THREE.Color(0xffffff),
        map: oldMaterial.map,
        transparent: oldMaterial.transparent || false,
        opacity: oldMaterial.opacity || 1.0,
      });
    }

    mesh.material.needsUpdate = true;
  }

  /**
   * Dispose of current model and free memory
   */
  disposeCurrentModel() {
    if (!this.currentModel) {
      return;
    }

    this.currentModel.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) {
          child.geometry.dispose();
        }

        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              if (mat.map) {
                mat.map.dispose();
              }
              mat.dispose();
            });
          } else {
            if (child.material.map) {
              child.material.map.dispose();
            }
            child.material.dispose();
          }
        }
      }
    });

    this.scene.remove(this.currentModel);
    this.currentModel = null;
  }

  /**
   * Switch to next model in the list
   * @returns {Promise} Promise that resolves to model name
   */
  async switchToNext() {
    this.currentModelIndex = (this.currentModelIndex + 1) % CONFIG.MODELS.NAMES.length;
    const modelName = CONFIG.MODELS.NAMES[this.currentModelIndex];
    await this.loadModel(modelName);
    return modelName;
  }

  /**
   * Get current model name
   * @returns {string} Current model name
   */
  getCurrentModelName() {
    return CONFIG.MODELS.NAMES[this.currentModelIndex];
  }
}
