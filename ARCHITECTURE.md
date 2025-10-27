# Architecture Documentation

## Overview

ASCII 3D Animator is a web-based application built with Three.js that converts 3D animated models into real-time ASCII art. The application features a modular architecture with clear separation of concerns, making it maintainable, testable, and scalable.

## Technology Stack

- **Frontend:** Vanilla JavaScript (ES6 Modules)
- **3D Graphics:** Three.js
- **Rendering:** Custom ASCII Effect (extends Three.js)
- **Testing:** Jest
- **Linting:** ESLint + Prettier
- **CI/CD:** GitHub Actions

## Project Structure

```
ASCII_3D_Animator/
├── index.html                 # Main HTML entry point
├── main.css                   # Application styles
├── js/                        # JavaScript modules
│   ├── constants.js           # Configuration constants
│   ├── lighting.js            # Lighting system
│   ├── models.js              # Model loading & management
│   ├── animation.js           # Animation system
│   ├── ascii.js               # ASCII effect management
│   ├── ui.js                  # UI event handlers
│   └── app.js                 # Main application class
├── lib/                       # Third-party libraries (Three.js)
│   ├── three/
│   │   ├── three.module.js
│   │   ├── AsciiEffect.js
│   │   ├── GLTFLoader.js
│   │   └── OrbitControls.js
│   └── utils/
├── __tests__/                 # Jest unit tests
│   ├── constants.test.js
│   ├── lighting.test.js
│   └── animation.test.js
├── __mocks__/                 # Jest mocks
│   └── three.js
├── *.glb                      # 3D model files
└── package.json               # NPM configuration

```

## Module Architecture

### 1. Constants Module (`js/constants.js`)

**Purpose:** Centralized configuration management

**Responsibilities:**
- Define all magic numbers and configuration values
- Provide type-safe configuration objects
- Ensure consistency across the application

**Key Exports:**
- `CONFIG` - Main configuration object containing:
  - ASCII rendering settings
  - Camera parameters
  - Animation configurations
  - Lighting presets
  - Model definitions
  - Scene settings

**Usage:**
```javascript
import { CONFIG } from './constants.js';
const density = CONFIG.ASCII.DEFAULT_SCALE;
```

---

### 2. Lighting Manager (`js/lighting.js`)

**Purpose:** Manage all scene lighting

**Responsibilities:**
- Initialize and configure lights (point, ambient, spotlight)
- Apply lighting presets (studio, dramatic, natural, minimal)
- Control individual light intensities
- Provide light state information

**Key Methods:**
- `initializeLights()` - Create all lights in the scene
- `setPreset(presetName)` - Apply named lighting preset
- `setIntensity(lightName, intensity)` - Control individual lights
- `getIntensities()` - Retrieve current light values

**Lighting System:**
- **Main Light:** Front key light for primary illumination
- **Ambient Light:** Overall scene fill light
- **Red/Blue Lights:** Rim lights for separation and depth
- **Spotlight:** Overhead spotlight for dramatic effects

---

### 3. Model Manager (`js/models.js`)

**Purpose:** Load and manage 3D models

**Responsibilities:**
- Load GLTF/GLB model files
- Scale and center models appropriately
- Configure materials for proper lighting response
- Handle model disposal and memory cleanup
- Cycle through available models

**Key Methods:**
- `loadModel(modelName)` - Async load model by name
- `processModel(gltf, config)` - Scale, center, configure materials
- `configureMaterial(mesh)` - Ensure materials respond to lights
- `disposeCurrentModel()` - Clean up memory
- `switchToNext()` - Load next model in sequence

**Material Handling:**
- Converts MeshBasicMaterial to MeshLambertMaterial (lighting support)
- Configures PBR materials (metalness, roughness)
- Ensures all meshes cast/receive shadows

---

### 4. Animation Manager (`js/animation.js`)

**Purpose:** Control 3D model animations

**Responsibilities:**
- Initialize AnimationMixer for loaded models
- Play and control animation clips
- Cycle through available animations
- Manage animation speed
- Update animation state each frame

**Key Methods:**
- `initialize(model, animations, preferredAnimation)` - Set up animations
- `playAnimation(clip)` - Play specific animation clip
- `switchToNext()` - Cycle to next animation
- `setSpeed(speed)` - Control animation playback speed
- `update(delta)` - Update animation state (call every frame)

**Features:**
- Supports multiple animations per model
- Configurable preferred default animation
- Smooth animation switching
- Speed control (0.1x - 3.0x)

---

### 5. ASCII Manager (`js/ascii.js`)

**Purpose:** Manage ASCII rendering effect

**Responsibilities:**
- Initialize and configure AsciiEffect
- Control ASCII character density (detail level)
- Update character sets for custom rendering
- Apply theme (dark/light mode)
- Handle effect resizing

**Key Methods:**
- `initialize()` - Create ASCII effect
- `updateCharacters(customChars)` - Use custom character set
- `setScale(factor)` - Adjust rendering density
- `setTheme(isDark)` - Switch color theme
- `render(scene, camera)` - Render ASCII frame

**Custom Characters:**
- Converts user text into ASCII gradient
- Creates appropriate light-to-dark character progression
- Repeats characters to ensure sufficient density

---

### 6. UI Manager (`js/ui.js`)

**Purpose:** Handle all user interface interactions

**Responsibilities:**
- Set up event listeners for all controls
- Update UI state based on app changes
- Show notifications and modals
- Handle file uploads
- Manage slider values and displays

**Key Features:**
- **Controls Setup:**
  - Theme toggle
  - Density slider
  - Custom character input
  - Animation speed control
  - Camera controls (rotation, distance, reset)
  - Lighting presets and sliders
  - Export functionality (copy, download)

- **Feedback:**
  - Notifications (success, error, info, warning)
  - Temporary messages
  - Help modal with comprehensive instructions

---

### 7. Main Application (`js/app.js`)

**Purpose:** Coordinate all modules and application lifecycle

**Responsibilities:**
- Initialize Three.js scene, camera, renderer
- Create and coordinate all managers
- Run main animation loop
- Handle window resize
- Provide public API for UI interactions

**Key Methods:**
- `initialize()` - Set up entire application
- `animate()` - Main render loop
- `switchModel()` - Change 3D model
- `switchAnimation()` - Change animation
- `setAsciiDensity(scale)` - Adjust detail level
- `updateAsciiCharacters(chars)` - Custom characters
- `setLightingPreset(preset)` - Apply lighting
- `resetCamera()` - Return to defaults

**Initialization Flow:**
1. Create Three.js scene and camera
2. Initialize renderer with shadow mapping
3. Create LightingManager (adds lights to scene)
4. Create ModelManager and load initial model
5. Create AnimationManager and start animations
6. Create AsciiManager (creates rendering effect)
7. Create UIManager (sets up event listeners)
8. Start animation loop

---

## Data Flow

### Model Loading Flow

```
User clicks "Next Model"
  → UIManager.nextModel event
  → App.switchModel()
  → ModelManager.switchToNext()
  → ModelManager.loadModel(name)
  → GLTFLoader loads .glb file
  → ModelManager.processModel() (scale, center, materials)
  → AnimationManager.initialize() (set up animations)
  → UI updates model name
```

### Animation Rendering Flow

```
Browser RAF callback
  → App.animate()
  → AnimationManager.update(delta) (advance animations)
  → Controls.update() (camera orbiting)
  → AsciiManager.render(scene, camera)
    → Three.js renders to WebGL
    → AsciiEffect converts pixels to ASCII
    → ASCII displayed in DOM
```

### Lighting Control Flow

```
User adjusts light slider
  → UIManager slider event
  → App.setLightIntensity(name, value)
  → LightingManager.setIntensity(name, value)
  → Three.js light.intensity updated
  → Next frame renders with new lighting
```

---

## Design Patterns

### 1. **Manager Pattern**

Each major system (Lighting, Models, Animation, ASCII, UI) is encapsulated in a manager class with clear responsibilities.

**Benefits:**
- Clear separation of concerns
- Easy to test in isolation
- Simple to extend or replace

### 2. **Dependency Injection**

Managers receive their dependencies via constructor parameters:

```javascript
const lightingManager = new LightingManager(scene);
const modelManager = new ModelManager(scene);
```

**Benefits:**
- Loose coupling between modules
- Easy to mock dependencies in tests
- Flexible initialization order

### 3. **Facade Pattern**

The App class provides a simplified interface to complex subsystems:

```javascript
app.switchModel()  // Instead of: modelManager.switchToNext() + animationManager.initialize()
app.setLightingPreset('dramatic')  // Instead of: manually setting each light
```

**Benefits:**
- Simpler API for UI layer
- Hides complexity
- Consistent interface

### 4. **Observer Pattern** (Event-Driven)

UI interactions trigger events that propagate through the system:

```javascript
button.addEventListener('click', () => app.switchAnimation());
```

**Benefits:**
- Decoupled UI from business logic
- Easy to add new UI controls
- Testable without DOM

---

## Configuration Management

All configuration is centralized in `constants.js`:

```javascript
export const CONFIG = {
  ASCII: { DEFAULT_SCALE: 1.2, MIN_SCALE: 0.5, MAX_SCALE: 3.0 },
  CAMERA: { FOV: 70, DEFAULT_DISTANCE: 1000 },
  LIGHTING: { PRESETS: { studio: {...}, dramatic: {...} } },
  // ... more config
};
```

**Benefits:**
- No magic numbers in code
- Easy to tune parameters
- Single source of truth
- Type safety (via JSDoc)

---

## Memory Management

### Model Disposal

When switching models, the old model must be disposed of properly:

```javascript
disposeCurrentModel() {
  model.traverse((child) => {
    if (child.isMesh) {
      child.geometry.dispose();
      child.material.dispose();
      if (child.material.map) child.material.map.dispose();
    }
  });
  scene.remove(model);
}
```

**Why:** Prevents memory leaks in WebGL

### Animation Cleanup

When disposing animations:

```javascript
dispose() {
  if (this.mixer) {
    this.mixer.stopAllAction();
    this.mixer = null;
  }
}
```

---

## Error Handling

### Async Model Loading

```javascript
try {
  const result = await modelManager.loadModel(name);
  // Success handling
} catch (error) {
  console.error('Failed to load model:', error);
  showNotification('Model load failed', 'error');
}
```

### Graceful Degradation

```javascript
setIntensity(lightName, intensity) {
  if (this.lights[lightName]) {
    this.lights[lightName].intensity = intensity;
  }
  // Silently ignore invalid light names
}
```

---

## Testing Strategy

### Unit Tests

Each manager class has dedicated unit tests:

- `constants.test.js` - Validates configuration structure
- `lighting.test.js` - Tests lighting system
- `animation.test.js` - Tests animation management

### Mocking

Three.js is mocked for testing:

```javascript
jest.mock('../lib/three/three.module.js', () => require('../__mocks__/three.js'));
```

**Why:** Fast tests, no WebGL required

### Coverage Goals

- **70%+ line coverage**
- **70%+ branch coverage**
- **70%+ function coverage**

---

## Performance Considerations

### 1. **Delta Time Clamping**

```javascript
const delta = Math.min(clock.getDelta(), CONFIG.ANIMATION.MAX_DELTA);
```

**Why:** Prevents huge jumps when tab is backgrounded

### 2. **Efficient Material Updates**

Materials are configured once during model load, not every frame.

### 3. **Shadow Map Optimization**

```javascript
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
```

Soft shadows with reasonable performance.

### 4. **ASCII Density Control**

Users can adjust density to balance quality vs. performance.

---

## Accessibility

### ARIA Labels

All interactive elements have ARIA labels:

```html
<button aria-label="Toggle theme">...</button>
<input aria-label="ASCII density" aria-valuenow="1.2">
```

### Keyboard Navigation

- Tab navigation through controls
- Enter key submits custom characters
- Focus indicators on all controls

### Live Regions

Dynamic content uses `aria-live`:

```html
<div aria-live="polite" id="densityValue">1.2</div>
```

---

## Future Enhancements

### Potential Improvements

1. **WebWorker for ASCII Conversion**
   - Offload ASCII rendering to worker thread
   - Improve performance for high densities

2. **IndexedDB Model Caching**
   - Cache loaded models for faster switching
   - Reduce network requests

3. **Custom Model Upload**
   - Implement file input handler
   - Validate and load user-provided .glb files

4. **Screenshot Export**
   - Use html2canvas or canvas.toBlob()
   - Export current frame as image

5. **Animation Recording**
   - Capture frames over time
   - Export as GIF or video

6. **Advanced Lighting**
   - Environment maps
   - HDR lighting
   - Real-time shadows

---

## Development Workflow

### Setup

```bash
# Clone repository
git clone https://github.com/Zacsluss/ASCII_3D_Animator.git

# Install dependencies
npm install

# Start development server
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Linting and Formatting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix

# Check formatting
npm run format:check

# Auto-format all files
npm run format
```

### Validation

```bash
# Run all checks (lint + format + test)
npm run validate
```

---

## Deployment

The application is a static site that can be deployed to:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Any static hosting service**

### Build Steps

1. All dependencies are bundled locally (`lib/` directory)
2. No build step required - runs directly in browser
3. Copy entire directory to hosting service

### CI/CD

GitHub Actions automatically:
- Runs linting on every push
- Executes tests
- Checks code formatting
- Validates package integrity
- Reports code coverage

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and how to contribute to this project.

---

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

**Last Updated:** 2025-10-27
**Version:** 2.0.0
