/**
 * Configuration constants for ASCII 3D Animator
 * @module constants
 */

export const CONFIG = {
  // ASCII Rendering
  ASCII: {
    DEFAULT_SCALE: 1.2,
    MIN_SCALE: 0.5,
    MAX_SCALE: 3.0,
    BASE_DENSITY: 50000,
    DEFAULT_CHARS: " .'`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
    FONT_SIZE: '20px',
    FONT_FAMILY: 'Geist, monospace',
    FONT_WEIGHT: '900'
  },

  // Camera Settings
  CAMERA: {
    FOV: 70,
    NEAR: 1,
    FAR: 5000,
    DEFAULT_POSITION: { x: 0, y: 150, z: 900 },
    DEFAULT_DISTANCE: 1000,
    MIN_DISTANCE: 250,
    MAX_DISTANCE: 3000
  },

  // Animation Settings
  ANIMATION: {
    DEFAULT_SPEED: 0.6,
    MIN_SPEED: 0.1,
    MAX_SPEED: 3.0,
    MAX_DELTA: 0.033 // 30 FPS minimum
  },

  // Rotation Settings
  ROTATION: {
    DEFAULT_SPEED: 0.3,
    MIN_SPEED: 0,
    MAX_SPEED: 2.0,
    POINTER_MULTIPLIER: 2,
    DAMPING: true,
    ROTATE_SPEED: 0.8
  },

  // Lighting Presets
  LIGHTING: {
    PRESETS: {
      studio: {
        main: 12.0,
        ambient: 0.3,
        red: 4.0,
        blue: 4.0,
        spotlight: 8.0
      },
      dramatic: {
        main: 15.0,
        ambient: 0.05,
        red: 8.0,
        blue: 2.0,
        spotlight: 12.0
      },
      natural: {
        main: 8.0,
        ambient: 0.6,
        red: 2.0,
        blue: 2.0,
        spotlight: 4.0
      },
      minimal: {
        main: 10.0,
        ambient: 0.2,
        red: 0.0,
        blue: 0.0,
        spotlight: 0.0
      },
      default: {
        main: 10.0,
        ambient: 0.1,
        red: 10.0,
        blue: 10.0,
        spotlight: 3.0
      }
    },
    // Light positions
    POSITIONS: {
      MAIN: { x: 0, y: 150, z: 800 },
      RED: { x: 200, y: 50, z: 200 },
      BLUE: { x: -200, y: 50, z: 200 },
      SPOTLIGHT: { x: 0, y: 400, z: 0 }
    },
    // Light colors
    COLORS: {
      WHITE: 0xffffff,
      RED: 0xff2222,
      BLUE: 0x2222ff
    }
  },

  // Model Configuration
  MODELS: {
    NAMES: ['duck', 'rat', 'doge', 'alien'],
    CONFIGS: {
      duck: {
        path: './duck_walk.glb',
        scaleMultiplier: 5.0,
        preferredAnimation: null
      },
      rat: {
        path: './rat_animated.glb',
        scaleMultiplier: 8.0,
        preferredAnimation: 'Mammals|walk_A1'
      },
      doge: {
        path: './dog_shiba.glb',
        scaleMultiplier: 6.0,
        preferredAnimation: '0|shake_0'
      },
      alien: {
        path: './alien.glb',
        scaleMultiplier: 6.0,
        preferredAnimation: null
      }
    },
    DESIRED_SIZE: 150
  },

  // UI Settings
  UI: {
    NOTIFICATION_DURATION: 3000,
    MESSAGE_DURATION: 5000,
    CENTER_THRESHOLD_MULTIPLIER: 0.2
  },

  // Scene Settings
  SCENE: {
    BACKGROUND_COLOR: 0x000000,
    SHADOW_MAP_ENABLED: true,
    SHADOW_MAP_TYPE: 'PCFSoftShadowMap'
  }
};
