/**
 * Global configuration constants for ASCII 3D Animator
 * @module constants
 */

export const CONFIG = {
  // ASCII Rendering
  ASCII: {
    DEFAULT_SCALE: 1.2,
    MIN_SCALE: 0.5,
    MAX_SCALE: 3.0,
    BASE_DENSITY: 50000,
    DEFAULT_CHARS: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
    FONT_SIZE: '20px',
    FONT_FAMILY: 'Geist, monospace',
    FONT_WEIGHT: '900',
  },

  // Theme System
  THEMES: {
    classic: {
      name: 'Classic',
      category: 'Standard',
      bg: '#ffffff',
      fg: '#000000',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Original black on white terminal look',
      icon: '📟',
    },
    classicDark: {
      name: 'Classic Dark',
      category: 'Standard',
      bg: '#000000',
      fg: '#ffffff',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Classic white on black',
      icon: '🖤',
    },
    amber: {
      name: 'Amber CRT',
      category: 'Retro',
      bg: '#1a0f00',
      fg: '#ff8000',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Vintage amber monitor',
      icon: '🟠',
      glow: true,
    },
    greenPhosphor: {
      name: 'Green Phosphor',
      category: 'Retro',
      bg: '#000000',
      fg: '#33ff33',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Classic green terminal',
      icon: '💚',
      glow: true,
    },
    ibmBlue: {
      name: 'IBM Blue',
      category: 'Retro',
      bg: '#0c2340',
      fg: '#5dade2',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'IBM mainframe terminal',
      icon: '💙',
    },
    appleII: {
      name: 'Apple II',
      category: 'Retro',
      bg: '#000000',
      fg: '#00ff00',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Apple II computer',
      icon: '🍏',
      glow: true,
    },
    neonCity: {
      name: 'Neon City',
      category: 'Neon',
      bg: '#0d0221',
      fg: '#00ffff',
      chars: '▓▒░█│─┌┐└┘├┤┬┴┼',
      description: 'Electric cyan streets',
      icon: '🏙️',
      glow: true,
    },
    purpleHaze: {
      name: 'Purple Haze',
      category: 'Neon',
      bg: '#1a0033',
      fg: '#bd93f9',
      chars: '▓▒░█∴∵∷≈≋≡',
      description: 'Electric purple dream',
      icon: '💜',
      glow: true,
    },
    dracula: {
      name: 'Dracula',
      category: 'Themed',
      bg: '#282a36',
      fg: '#f8f8f2',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Popular dark theme',
      icon: '🧛',
    },
    nord: {
      name: 'Nord',
      category: 'Themed',
      bg: '#2e3440',
      fg: '#88c0d0',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Cool arctic palette',
      icon: '❄️',
    },
    solarizedDark: {
      name: 'Solarized Dark',
      category: 'Themed',
      bg: '#002b36',
      fg: '#839496',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Precision color scheme',
      icon: '☀️',
    },
    gruvbox: {
      name: 'Gruvbox',
      category: 'Themed',
      bg: '#282828',
      fg: '#ebdbb2',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Retro warm earth tones',
      icon: '🌾',
    },
    monokai: {
      name: 'Monokai',
      category: 'Themed',
      bg: '#272822',
      fg: '#f8f8f2',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Vibrant coding theme',
      icon: '🎨',
    },
    ocean: {
      name: 'Ocean',
      category: 'Nature',
      bg: '#001f3f',
      fg: '#39cccc',
      chars: '~≈∿⋍∽∼≋≈∿',
      description: 'Deep sea waves',
      icon: '🌊',
    },
    fire: {
      name: 'Fire',
      category: 'Nature',
      bg: '#1a0000',
      fg: '#ff4500',
      chars: '▓▒░█∴∵∷≈≋≡',
      description: 'Burning flames',
      icon: '🔥',
      glow: true,
    },
    blueprint: {
      name: 'Blueprint',
      category: 'Artistic',
      bg: '#0d47a1',
      fg: '#ffffff',
      chars: '─│┌┐└┘├┤┬┴┼═║╔╗╚╝╠╣╦╩╬',
      description: 'Architectural technical',
      icon: '📐',
    },
    chalkboard: {
      name: 'Chalkboard',
      category: 'Artistic',
      bg: '#2f4f4f',
      fg: '#f5f5f5',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Dusty chalk on slate',
      icon: '🖍️',
    },
    newspaper: {
      name: 'Newspaper',
      category: 'Artistic',
      bg: '#f5f5dc',
      fg: '#2c2c2c',
      chars: '░▒▓█■□▪▫',
      description: 'Vintage print halftone',
      icon: '📰',
    },
    xray: {
      name: 'X-Ray',
      category: 'Artistic',
      bg: '#000000',
      fg: '#00ffff',
      chars: ' .\'`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
      description: 'Medical imaging',
      icon: '🩻',
      glow: true,
    },
    psychedelic: {
      name: 'Experimental Rainbow',
      category: 'Experimental',
      bg: '#000000',
      fg: '#ff00ff',
      chars: ' .:-=+*#%@$0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      description: 'Trippy rainbow cascade',
      icon: '🌈',
      glow: true,
      psychedelic: true,
    },
  },

  // Camera Settings
  CAMERA: {
    FOV: 70,
    NEAR: 1,
    FAR: 5000,
    DEFAULT_POSITION: { x: 0, y: 150, z: 900 },
    DEFAULT_DISTANCE: 1000,
    MIN_DISTANCE: 250,
    MAX_DISTANCE: 3000,
  },

  // Animation Settings
  ANIMATION: {
    DEFAULT_SPEED: 0.6,
    MIN_SPEED: 0.1,
    MAX_SPEED: 3.0,
    MAX_DELTA: 0.033, // 30 FPS minimum
  },

  // Rotation Settings
  ROTATION: {
    DEFAULT_SPEED: 2.0,
    MIN_SPEED: 0,
    MAX_SPEED: 10.0,
    POINTER_MULTIPLIER: 2,
    DAMPING: true,
    ROTATE_SPEED: 0.8,
  },

  // Lighting Presets
  LIGHTING: {
    PRESETS: {
      studio: {
        main: 12.0,
        ambient: 0.3,
        red: 4.0,
        blue: 4.0,
        spotlight: 8.0,
      },
      dramatic: {
        main: 15.0,
        ambient: 0.05,
        red: 8.0,
        blue: 2.0,
        spotlight: 12.0,
      },
      natural: {
        main: 8.0,
        ambient: 0.6,
        red: 2.0,
        blue: 2.0,
        spotlight: 4.0,
      },
      minimal: {
        main: 10.0,
        ambient: 0.2,
        red: 0.0,
        blue: 0.0,
        spotlight: 0.0,
      },
      default: {
        main: 10.0,
        ambient: 0.1,
        red: 10.0,
        blue: 10.0,
        spotlight: 3.0,
      },
    },
    // Light positions
    POSITIONS: {
      MAIN: { x: 0, y: 150, z: 800 },
      RED: { x: 200, y: 50, z: 200 },
      BLUE: { x: -200, y: 50, z: 200 },
      SPOTLIGHT: { x: 0, y: 1000, z: 0 },
    },
    // Light colors
    COLORS: {
      WHITE: 0xffffff,
      RED: 0xff2222,
      BLUE: 0x2222ff,
    },
  },

  // Model Configuration
  MODELS: {
    NAMES: ['rat', 'duck', 'doge', 'alien'],
    CONFIGS: {
      duck: {
        path: './duck_walk.glb',
        scaleMultiplier: 5.0,
        preferredAnimation: null,
      },
      rat: {
        path: './rat_animated.glb',
        scaleMultiplier: 8.0,
        preferredAnimation: 'Mammals|walk_A1',
      },
      doge: {
        path: './dog_shiba.glb',
        scaleMultiplier: 6.0,
        preferredAnimation: '0|shake_0',
      },
      alien: {
        path: './alien.glb',
        scaleMultiplier: 6.0,
        preferredAnimation: null,
      },
    },
    DESIRED_SIZE: 150,
  },

  // UI Settings
  UI: {
    NOTIFICATION_DURATION: 3000,
    MESSAGE_DURATION: 5000,
    CENTER_THRESHOLD_MULTIPLIER: 0.2,
  },

  // Scene Settings
  SCENE: {
    BACKGROUND_COLOR: 0x000000,
    SHADOW_MAP_ENABLED: true,
    SHADOW_MAP_TYPE: 'PCFSoftShadowMap',
  },
};
