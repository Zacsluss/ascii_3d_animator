/**
 * User interface management and interaction handling
 * @module ui
 */

import { CONFIG } from './constants.js';
import { validateFileSize, validateFileExtension } from './utils.js';

export class UIManager {
  constructor(app) {
    this.app = app;
    this.cacheElements();
    this.setupEventListeners();
    this.applyInitialTheme();
  }

  /**
   * Cache DOM element references for better performance
   */
  cacheElements() {
    this.elements = {
      themeSelector: document.getElementById('themeSelector'),
      helpBtn: document.getElementById('helpBtn'),
      densitySlider: document.getElementById('densitySlider'),
      densityValue: document.getElementById('densityValue'),
      customCharsInput: document.getElementById('customCharsInput'),
      applyCharsBtn: document.getElementById('applyCharsBtn'),
      resetCharsBtn: document.getElementById('resetCharsBtn'),
      nextModel: document.getElementById('nextModel'),
      modelInfo: document.getElementById('modelInfo'),
      animSpeedSlider: document.getElementById('animSpeedSlider'),
      animSpeedValue: document.getElementById('animSpeedValue'),
      rotationToggle: document.getElementById('rotationToggle'),
      rotSpeedSlider: document.getElementById('rotSpeedSlider'),
      rotSpeedValue: document.getElementById('rotSpeedValue'),
      distanceSlider: document.getElementById('distanceSlider'),
      distanceValue: document.getElementById('distanceValue'),
      resetCamera: document.getElementById('resetCamera'),
      presetStudio: document.getElementById('presetStudio'),
      presetDramatic: document.getElementById('presetDramatic'),
      presetNatural: document.getElementById('presetNatural'),
      presetMinimal: document.getElementById('presetMinimal'),
      mainLightSlider: document.getElementById('mainLightSlider'),
      mainLightValue: document.getElementById('mainLightValue'),
      ambientLightSlider: document.getElementById('ambientLightSlider'),
      ambientLightValue: document.getElementById('ambientLightValue'),
      redLightSlider: document.getElementById('redLightSlider'),
      redLightValue: document.getElementById('redLightValue'),
      blueLightSlider: document.getElementById('blueLightSlider'),
      blueLightValue: document.getElementById('blueLightValue'),
      spotLightSlider: document.getElementById('spotLightSlider'),
      spotLightValue: document.getElementById('spotLightValue'),
      copyBtn: document.getElementById('copyBtn'),
      downloadBtn: document.getElementById('downloadBtn'),
      fileInput: document.getElementById('fileInput'),
      uploadBtn: document.getElementById('uploadBtn'),
      canvasContainer: document.getElementById('canvasContainer'),
    };
  }

  /**
   * Set up all event listeners
   */
  setupEventListeners() {
    // Theme selector
    this.elements.themeSelector?.addEventListener('change', (e) => {
      this.applyTheme(e.target.value);
    });

    // Help button
    this.elements.helpBtn?.addEventListener('click', () => {
      this.showHelpModal();
    });

    // ASCII Density slider
    this.setupDensitySlider();

    // Custom ASCII Characters
    this.setupCustomCharacters();

    // Next Model button
    this.elements.nextModel?.addEventListener('click', async () => {
      this.showLoadingOverlay('Loading model...');
      try {
        const modelName = await this.app.switchModel();
        this.updateModelInfo(modelName);
        this.showNotification(`Loaded ${modelName} model`, 'success');
      } catch (error) {
        this.showNotification(`Failed to load model: ${error.message}`, 'error');
      } finally {
        this.hideLoadingOverlay();
      }
    });

    // Animation Speed slider
    this.setupAnimationSpeedSlider();

    // Camera controls
    this.setupCameraControls();

    // Lighting controls
    this.setupLightingControls();

    // Export controls
    this.setupExportControls();

    // File upload
    this.setupFileUpload();

    // Canvas interactions
    this.setupCanvasInteractions();
  }

  /**
   * Apply initial theme based on selected option in dropdown
   */
  applyInitialTheme() {
    if (this.elements.themeSelector) {
      const selectedTheme = this.elements.themeSelector.value;
      this.applyTheme(selectedTheme);
    }
  }

  /**
   * Setup density slider
   */
  setupDensitySlider() {
    const updateDensity = () => {
      const value = parseFloat(this.elements.densitySlider.value);
      this.app.setAsciiDensity(value);
      this.elements.densityValue.textContent = value.toFixed(1);
    };

    this.elements.densitySlider?.addEventListener('input', updateDensity);
    this.elements.densitySlider?.addEventListener('change', updateDensity);
  }

  /**
   * Sanitize custom character input
   * @param {string} chars - Raw character input
   * @returns {string} Sanitized character string
   */
  sanitizeCharacterInput(chars) {
    // Remove control characters, zero-width characters, and other invisible chars
    // eslint-disable-next-line no-control-regex
    let sanitized = chars.replace(/[\x00-\x1F\x7F-\x9F\u200B-\u200D\uFEFF]/g, '');

    // Limit length to prevent DOM overload (max 100 characters)
    sanitized = sanitized.slice(0, 100);

    // Remove duplicate characters to optimize rendering
    sanitized = [...new Set(sanitized)].join('');

    return sanitized;
  }

  /**
   * Setup custom characters input
   */
  setupCustomCharacters() {
    this.elements.applyCharsBtn?.addEventListener('click', () => {
      let customText = this.elements.customCharsInput.value.trim();
      customText = this.sanitizeCharacterInput(customText);

      // Update input to show sanitized version
      if (this.elements.customCharsInput.value !== customText) {
        this.elements.customCharsInput.value = customText;
      }

      this.app.updateAsciiCharacters(customText);
      this.showNotification('Custom characters applied!', 'success');
    });

    this.elements.customCharsInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        let customText = this.elements.customCharsInput.value.trim();
        customText = this.sanitizeCharacterInput(customText);

        // Update input to show sanitized version
        if (this.elements.customCharsInput.value !== customText) {
          this.elements.customCharsInput.value = customText;
        }

        this.app.updateAsciiCharacters(customText);
        this.showNotification('Custom characters applied!', 'success');
      }
    });

    this.elements.resetCharsBtn?.addEventListener('click', () => {
      this.elements.customCharsInput.value = '';
      this.app.updateAsciiCharacters('');
      this.showNotification('Reset to default characters', 'info');
    });
  }

  /**
   * Setup animation speed slider
   */
  setupAnimationSpeedSlider() {
    const updateSpeed = () => {
      const speed = parseFloat(this.elements.animSpeedSlider.value);
      this.elements.animSpeedValue.textContent = speed.toFixed(1);
      this.app.setAnimationSpeed(speed);
    };

    this.elements.animSpeedSlider?.addEventListener('input', updateSpeed);
    this.elements.animSpeedSlider?.addEventListener('change', updateSpeed);
  }

  /**
   * Setup camera controls
   */
  setupCameraControls() {
    // Rotation toggle
    this.elements.rotationToggle?.addEventListener('click', (e) => {
      const isRotating = this.app.toggleAutoRotation();
      // Safe DOM manipulation instead of innerHTML
      const icon = document.createElement('span');
      icon.className = 'btn-icon';
      icon.textContent = isRotating ? '⏸' : '⟲';
      const text = document.createTextNode(isRotating ? 'Stop Rotation' : 'Start Rotation');
      e.target.textContent = '';
      e.target.appendChild(icon);
      e.target.appendChild(text);
    });

    // Rotation speed slider
    this.elements.rotSpeedSlider?.addEventListener('input', () => {
      const speed = parseFloat(this.elements.rotSpeedSlider.value);
      this.elements.rotSpeedValue.textContent = speed.toFixed(1);
      this.app.setRotationSpeed(speed);
    });

    // Camera distance slider
    this.elements.distanceSlider?.addEventListener('input', () => {
      const distance = parseFloat(this.elements.distanceSlider.value);
      this.elements.distanceValue.textContent = distance;
      this.app.setCameraDistance(distance);
    });

    // Reset camera button
    this.elements.resetCamera?.addEventListener('click', () => {
      this.app.resetCamera();
      this.resetSliderValues();
      this.showNotification('Camera reset', 'info');
    });
  }

  /**
   * Setup lighting controls
   */
  setupLightingControls() {
    // Preset buttons
    this.elements.presetStudio?.addEventListener('click', () => {
      this.applyLightingPreset('studio');
    });
    this.elements.presetDramatic?.addEventListener('click', () => {
      this.applyLightingPreset('dramatic');
    });
    this.elements.presetNatural?.addEventListener('click', () => {
      this.applyLightingPreset('natural');
    });
    this.elements.presetMinimal?.addEventListener('click', () => {
      this.applyLightingPreset('minimal');
    });

    // Individual light sliders
    this.setupLightSlider('mainLightSlider', 'mainLightValue', 'main', 1);
    this.setupLightSlider('ambientLightSlider', 'ambientLightValue', 'ambient', 2);
    this.setupLightSlider('redLightSlider', 'redLightValue', 'red', 1);
    this.setupLightSlider('blueLightSlider', 'blueLightValue', 'blue', 1);
    this.setupLightSlider('spotLightSlider', 'spotLightValue', 'spotlight', 1);
  }

  /**
   * Setup individual light slider
   * @param {string} sliderId - The ID of the slider element
   * @param {string} valueId - The ID of the value display element
   * @param {string} lightName - The name of the light to control
   * @param {number} decimals - Number of decimal places to display
   */
  setupLightSlider(sliderId, valueId, lightName, decimals) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);

    slider?.addEventListener('input', () => {
      const intensity = parseFloat(slider.value);
      valueDisplay.textContent = intensity.toFixed(decimals);
      this.app.setLightIntensity(lightName, intensity);
      this.clearPresetSelection();
    });
  }

  /**
   * Apply lighting preset and update UI
   * @param {string} presetName - The name of the lighting preset to apply
   */
  applyLightingPreset(presetName) {
    this.app.setLightingPreset(presetName);
    this.updateLightingSlidersFromApp();

    // Update active state on buttons
    document.querySelectorAll('.preset-btn').forEach((btn) => btn.classList.remove('active'));
    document
      .getElementById(`preset${presetName.charAt(0).toUpperCase() + presetName.slice(1)}`)
      ?.classList.add('active');

    this.showNotification(
      `${presetName.charAt(0).toUpperCase() + presetName.slice(1)} lighting applied`,
      'success',
    );
  }

  /**
   * Clear preset button selection
   */
  clearPresetSelection() {
    document.querySelectorAll('.preset-btn').forEach((btn) => btn.classList.remove('active'));
  }

  /**
   * Update lighting sliders from app state
   */
  updateLightingSlidersFromApp() {
    const intensities = this.app.getLightIntensities();

    this.updateSliderValue('mainLightSlider', 'mainLightValue', intensities.main, 1);
    this.updateSliderValue('ambientLightSlider', 'ambientLightValue', intensities.ambient, 2);
    this.updateSliderValue('redLightSlider', 'redLightValue', intensities.red, 1);
    this.updateSliderValue('blueLightSlider', 'blueLightValue', intensities.blue, 1);
    this.updateSliderValue('spotLightSlider', 'spotLightValue', intensities.spotlight, 1);
  }

  /**
   * Update slider and value display
   * @param {string} sliderId - The ID of the slider element
   * @param {string} valueId - The ID of the value display element
   * @param {number} value - The value to set
   * @param {number} decimals - Number of decimal places to display
   */
  updateSliderValue(sliderId, valueId, value, decimals) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);
    if (slider) {
      slider.value = value;
    }
    if (valueDisplay) {
      valueDisplay.textContent = value.toFixed(decimals);
    }
  }

  /**
   * Setup export controls
   */
  setupExportControls() {
    // Copy ASCII
    this.elements.copyBtn?.addEventListener('click', async () => {
      try {
        const text = this.app.getAsciiText();
        await navigator.clipboard.writeText(text);
        this.showNotification('ASCII art copied to clipboard!', 'success');
      } catch (err) {
        this.showNotification('Failed to copy to clipboard', 'error');
      }
    });

    // Download ASCII
    this.elements.downloadBtn?.addEventListener('click', () => {
      const text = this.app.getAsciiText();
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ascii-art-${this.app.getCurrentModelName()}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.showNotification('ASCII art downloaded!', 'success');
    });
  }

  /**
   * Setup file upload
   */
  setupFileUpload() {
    this.elements.uploadBtn?.addEventListener('click', () => {
      this.elements.fileInput?.click();
    });

    this.elements.fileInput?.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        // Validate file extension
        if (!validateFileExtension(file, ['.glb', '.gltf'])) {
          this.showNotification(
            'Invalid file type. Please upload .glb or .gltf files only.',
            'error',
          );
          event.target.value = ''; // Clear the input
          return;
        }

        // Validate file size (max 100MB)
        if (!validateFileSize(file, 100)) {
          this.showNotification('File too large. Maximum size is 100MB.', 'error');
          event.target.value = ''; // Clear the input
          return;
        }

        this.showNotification(`Loading ${file.name}...`, 'info');

        try {
          const result = await this.app.loadModelFromFile(file);
          if (this.elements.modelInfo) {
            this.elements.modelInfo.textContent = result.fileName.replace(/\.(glb|gltf)$/i, '');
          }
          this.showNotification(`Successfully loaded ${result.fileName}!`, 'success');
        } catch (error) {
          this.showNotification(`Failed to load model: ${error.message}`, 'error');
        } finally {
          event.target.value = ''; // Clear the input for next upload
        }
      }
    });
  }

  /**
   * Setup canvas interactions (right-click for animation switching)
   */
  setupCanvasInteractions() {
    this.elements.canvasContainer?.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      const animInfo = this.app.switchAnimation();
      if (animInfo) {
        this.showMessage(`Animation: ${animInfo.name} (${animInfo.index + 1}/${animInfo.total})`);
      }
    });
  }

  /**
   * Toggle theme
   */
  toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    this.app.setTheme(isDark);
  }

  /**
   * Apply selected theme
   * @param {string} themeKey - The key of the theme to apply
   */
  applyTheme(themeKey) {
    const theme = CONFIG.THEMES[themeKey];
    if (!theme) {
      return;
    }

    // Handle psychedelic theme class
    if (theme.psychedelic) {
      document.body.classList.add('psychedelic');
    } else {
      document.body.classList.remove('psychedelic');
    }

    // Update ASCII effect colors via the asciiManager
    if (this.app.asciiManager && this.app.asciiManager.effect) {
      const domElement = this.app.asciiManager.effect.domElement;

      // Handle psychedelic theme specially - let CSS animations control everything
      if (theme.psychedelic) {
        // Clear inline styles so CSS animations can take control
        domElement.style.backgroundColor = theme.bg;
        domElement.style.color = ''; // Clear color - let CSS animation handle it
        domElement.style.textShadow = '';
      } else {
        // Set background and foreground colors for normal themes
        domElement.style.backgroundColor = theme.bg;
        domElement.style.color = theme.fg;

        // Add glow effect if theme has it
        if (theme.glow) {
          const glow = `0 0 10px ${theme.fg}, 0 0 20px ${theme.fg}, 0 0 30px ${theme.fg}`;
          domElement.style.textShadow = glow;
        } else {
          domElement.style.textShadow = '0 0 1px #000, 0 0 1px #000, 1px 0 0 #000, 0 1px 0 #000';
        }
      }
    }

    // Update ASCII characters (this recreates OrbitControls properly)
    this.app.updateAsciiCharacters(theme.chars);

    // Show notification
    this.showNotification(`Theme changed to ${theme.name}`, 'success');
  }

  /**
   * Update model info display
   * @param {string} modelName - The name of the model to display
   */
  updateModelInfo(modelName) {
    if (this.elements.modelInfo) {
      this.elements.modelInfo.textContent = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    }
  }

  /**
   * Reset slider values to defaults
   */
  resetSliderValues() {
    this.updateSliderValue('densitySlider', 'densityValue', CONFIG.ASCII.DEFAULT_SCALE, 1);
    this.updateSliderValue('rotSpeedSlider', 'rotSpeedValue', CONFIG.ROTATION.DEFAULT_SPEED, 1);
    this.updateSliderValue('distanceSlider', 'distanceValue', CONFIG.CAMERA.DEFAULT_DISTANCE, 0);
    this.updateSliderValue('animSpeedSlider', 'animSpeedValue', CONFIG.ANIMATION.DEFAULT_SPEED, 1);
  }

  /**
   * Show help modal
   */
  showHelpModal() {
    /* eslint-disable max-len */
    const helpContent = `
      <div style="font-family: 'Geist', sans-serif; line-height: 1.6; color: #333;">
        <h2 style="margin-top: 0; color: #2d3748; font-size: 1.8em; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">How to Use ASCII Animator</h2>

        <h3 style="color: #4a5568; margin: 20px 0 10px 0; font-size: 1.2em;">🎯 Quick Start</h3>
        <div style="background: #e6f7ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #1890ff;">
          <p style="margin: 0 0 10px 0; font-weight: bold;">3 Simple Steps to Get Started:</p>
          <ol style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Click and drag to rotate the 3D model</li>
            <li style="margin-bottom: 8px;">Scroll to zoom in/out</li>
            <li style="margin-bottom: 8px;">Right-click on the model to change animations</li>
          </ol>
        </div>

        <h3 style="color: #4a5568; margin: 20px 0 10px 0; font-size: 1.2em;">🖱️ Mouse Controls</h3>
        <div style="background: #f7fafc; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
          <ul style="margin: 0; padding-left: 20px; list-style: none;">
            <li style="margin-bottom: 6px;">🖱️ <strong>Left Click + Drag</strong> = Rotate view</li>
            <li style="margin-bottom: 6px;">🖱️ <strong>Right Click</strong> = Change animation</li>
            <li style="margin-bottom: 6px;">⚙️ <strong>Scroll</strong> = Zoom in/out</li>
          </ul>
        </div>

        <h3 style="color: #4a5568; margin: 20px 0 10px 0; font-size: 1.2em;">🎨 Make It Your Own</h3>
        <div style="background: #f0fff4; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
          <p style="margin: 0 0 8px 0;"><strong>Custom Text:</strong> Type your name or any text in "Custom ASCII Characters" to create personalized art!</p>
          <p style="margin: 0 0 8px 0;"><strong>Theme:</strong> Click "Toggle Theme" to switch between light/dark mode</p>
          <p style="margin: 0;"><strong>Detail Level:</strong> Adjust "ASCII Density" slider (lower = faster, higher = more detailed)</p>
        </div>

        <h3 style="color: #4a5568; margin: 20px 0 10px 0; font-size: 1.2em;">💡 Lighting Effects</h3>
        <div style="background: #edf2f7; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
          <p style="margin: 0 0 8px 0;"><strong>Quick Presets:</strong></p>
          <ul style="margin: 0 0 8px 0; padding-left: 20px;">
            <li><strong>Studio</strong> - Balanced, professional</li>
            <li><strong>Dramatic</strong> - High contrast, shadows</li>
            <li><strong>Natural</strong> - Soft, realistic</li>
            <li><strong>Minimal</strong> - Simple, clean</li>
          </ul>
          <p style="margin: 0; font-size: 0.9em;"><em>Or adjust individual light sliders for custom effects!</em></p>
        </div>

        <div style="margin-top: 25px; padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
          <h4 style="margin-top: 0; font-size: 1.1em;">✨ Quick Tips</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: 0.9em;">
            <li style="margin-bottom: 5px;">Type your name in "Custom ASCII" for personalized art!</li>
            <li style="margin-bottom: 5px;">Right-click the model to see all its animations</li>
            <li style="margin-bottom: 5px;">Try "Dramatic" lighting for the coolest effects</li>
            <li style="margin-bottom: 5px;">Lower density if it's running slow</li>
            <li style="margin-bottom: 0;">The animations keep playing - perfect for screen recordings!</li>
          </ul>
        </div>
      </div>
    `;
    /* eslint-enable max-len */

    this.showModal('Help & Controls', helpContent);
  }

  /**
   * Show a modal dialog
   * @param {string} title - The title of the modal
   * @param {string} content - The HTML content to display in the modal
   */
  showModal(title, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.7); display: flex;
      justify-content: center; align-items: center; z-index: 10000;
      font-family: 'Geist', sans-serif;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white; padding: 30px; border-radius: 12px;
      max-width: 600px; max-height: 80vh; overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); position: relative;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      position: absolute; top: 15px; right: 20px; background: none;
      border: none; font-size: 24px; cursor: pointer; color: #666;
      padding: 5px; line-height: 1;
    `;
    closeBtn.setAttribute('aria-label', 'Close modal');

    closeBtn.addEventListener('click', () => document.body.removeChild(modal));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });

    // Create content container
    // Note: Using innerHTML here is safe because content comes from hardcoded
    // application strings (like help modal), not from user input
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    modalContent.appendChild(contentDiv);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }

  /**
   * Show a notification message
   * @param {string} message - The message to display
   * @param {string} type - The notification type (success, error, info, warning)
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; padding: 12px 20px;
      border-radius: 8px; color: white; font-family: 'Geist', sans-serif;
      font-size: 14px; font-weight: 500; z-index: 10000; max-width: 300px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); transition: all 0.3s ease;
      transform: translateX(100%);
    `;

    const colors = {
      success: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
      error: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
      info: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
      warning: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
    };

    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;

    document.body.appendChild(notification);
    setTimeout(() => (notification.style.transform = 'translateX(0)'), 10);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, CONFIG.UI.NOTIFICATION_DURATION);
  }

  /**
   * Show loading overlay
   * @param {string} message - The loading message to display
   */
  showLoadingOverlay(message) {
    // Remove existing overlay if present
    this.hideLoadingOverlay();

    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.7); z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(5px);
    `;

    overlay.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 30px 50px; border-radius: 12px; text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 50px; height: 50px; border: 4px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%; margin: 0 auto 20px;
          animation: spin 1s linear infinite;
        "></div>
        <p style="
          color: white; font-size: 18px; font-weight: 600; margin: 0;
          font-family: 'Geist', sans-serif;
        ">${message}</p>
      </div>
    `;

    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    overlay.appendChild(style);

    document.body.appendChild(overlay);
  }

  /**
   * Hide loading overlay
   */
  hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.remove();
    }
  }

  /**
   * Show a temporary message overlay
   * @param {string} message - The message to display
   */
  showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8); color: white; padding: 10px 20px;
      border-radius: 5px; font-size: 14px; z-index: 1000;
      font-family: 'Geist', sans-serif;
    `;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      if (document.body.contains(messageDiv)) {
        document.body.removeChild(messageDiv);
      }
    }, CONFIG.UI.MESSAGE_DURATION);
  }
}
