# ADR-0001: Use Manager Pattern for Architecture

**Date:** 2024-09-01
**Status:** Accepted
**Deciders:** Zachary Sluss
**Context:** Initial architecture decision for ASCII 3D Animator

## Context and Problem Statement

The ASCII 3D Animator needs a clear architecture that separates concerns between 3D rendering, ASCII conversion, lighting, animation, models, and UI. How should we structure the codebase to make it maintainable, testable, and extensible?

## Decision Drivers

- Need clear separation of concerns
- Must be easy to test individual components in isolation
- Should support easy addition of new features (themes, models, effects)
- Want to avoid tight coupling between modules
- Need straightforward debugging and error tracking
- Portfolio piece should demonstrate architectural maturity

## Considered Options

1. **Manager Pattern** - Separate managers for each concern (Lighting, Model, Animation, ASCII, UI)
2. **Redux/Flux Pattern** - Centralized state management with actions and reducers
3. **Component-based MVC** - Traditional Model-View-Controller split
4. **Service-oriented** - Global services accessed via dependency injection container

## Decision Outcome

**Chosen option: Manager Pattern**

Each major concern gets its own manager class with single responsibility:
- `LightingManager` - Handles all lights and lighting presets
- `ModelManager` - Loads and manages 3D models
- `AnimationManager` - Controls animation playback
- `AsciiManager` - Converts 3D scene to ASCII
- `UIManager` - Handles DOM events and user input
- `AsciiAnimatorApp` - Facade coordinator that wires managers together

### Positive Consequences

- ✅ **Clear boundaries:** Each manager has one job and does it well
- ✅ **Easy testing:** Can mock dependencies and test managers in isolation
- ✅ **Simple dependency injection:** Managers receive dependencies via constructors
- ✅ **Straightforward debugging:** Error stack traces point to specific managers
- ✅ **Easy extension:** Adding new features means creating new managers or extending existing ones
- ✅ **No framework overhead:** Pure vanilla JavaScript, no Redux boilerplate

### Negative Consequences

- ❌ **Not reactive:** Changes don't automatically propagate (acceptable for this use case)
- ❌ **Manual wiring:** Have to explicitly pass dependencies (but this aids transparency)
- ❌ **No built-in state history:** Can't time-travel debug like Redux (not needed here)

## Implementation Notes

Example manager structure:

```javascript
export class LightingManager {
  constructor(scene) {
    this.scene = scene;
    this.lights = {};
    this.setupLights();
  }

  setIntensity(lightName, intensity) {
    // Single responsibility - only handles lighting
  }
}
```

Main app coordinates managers via dependency injection:

```javascript
export class AsciiAnimatorApp {
  constructor() {
    this.lightingManager = new LightingManager(this.scene);
    this.modelManager = new ModelManager(this.scene);
    this.asciiManager = new AsciiManager(this.renderer, this.container);
    // ...managers receive dependencies they need
  }
}
```

## Related Decisions

- ADR-0002: Use vanilla JavaScript instead of framework
- ADR-0003: Bundle libraries locally for offline-first capability
