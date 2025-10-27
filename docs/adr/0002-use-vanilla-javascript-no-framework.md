# ADR-0002: Use Vanilla JavaScript (No Framework)

**Date:** 2024-09-01
**Status:** Accepted
**Deciders:** Zachary Sluss
**Context:** Technology choice for ASCII 3D Animator

## Context and Problem Statement

Should we use a frontend framework (React, Vue, Svelte) or build with vanilla JavaScript? This is a portfolio piece demonstrating technical skills, so the choice affects both implementation complexity and how the code showcases expertise.

## Decision Drivers

- **Portfolio value:** Want to demonstrate platform mastery, not framework knowledge
- **Offline capability:** Must work without internet connection (no CDN dependencies)
- **Performance:** Need 60 FPS rendering without framework overhead
- **Simplicity:** Minimal complexity for a single-page demo
- **Learning opportunity:** Challenge myself to solve problems without framework abstractions

## Considered Options

1. **Vanilla JavaScript** - Pure ES6 modules, no framework
2. **React** - Industry standard, great for component composition
3. **Vue** - Simpler than React, good reactivity model
4. **Svelte** - Compile-time framework, smallest bundle size

## Decision Outcome

**Chosen option: Vanilla JavaScript**

Build with ES6 modules, native DOM APIs, and no frontend framework.

### Positive Consequences

- ✅ **Zero framework overhead:** Entire codebase is ~2,200 lines (excl. Three.js)
- ✅ **No build step required:** Just open index.html in a browser
- ✅ **True offline capability:** No npm install, no bundler, works on airplane
- ✅ **Demonstrates platform knowledge:** Shows understanding of DOM, events, modules
- ✅ **Maximum performance:** No virtual DOM diffing, direct DOM manipulation
- ✅ **Simpler debugging:** Stack traces go straight to my code, not framework internals
- ✅ **Portfolio differentiation:** Most candidates show React; this shows versatility

### Negative Consequences

- ❌ **Manual DOM updates:** Have to explicitly update UI when state changes
- ❌ **No component reusability:** Can't compose UI from reusable components
- ❌ **Manual event cleanup:** Must remember to remove event listeners
- ❌ **Verbose UI code:** UIManager is 700+ lines vs ~200 in React

## Implementation Notes

Using modern JavaScript features:
- ES6 modules (`import/export`)
- Classes with private fields
- Async/await for model loading
- Template literals for HTML strings
- Destructuring and spread operators

Example of manual DOM update pattern:

```javascript
setAsciiDensity(scale) {
  this.asciiManager.setScale(scale);
  // Manually update UI
  this.elements.densityValue.textContent = scale.toFixed(2);
}
```

vs. React equivalent:

```jsx
const [density, setDensity] = useState(1.2);
// UI updates automatically when density changes
```

## Trade-off Analysis

**Acceptable trade-offs for this project:**
- Manual state management → Acceptable (state is simple: theme, model, density, speeds)
- Verbose UI code → Acceptable (only ~30 controls total)
- No component library → Acceptable (custom UI is part of the aesthetic)

**Unacceptable trade-offs (didn't occur):**
- Poor performance → Still achieved 60 FPS
- Unmaintainable code → Manager pattern keeps it organized
- Hard to test → Dependency injection enables mocking

## When This Decision Would Change

Would switch to a framework if:
- Project grows beyond ~50 interactive controls
- Need server-side rendering (SSR) for SEO
- Multiple developers working on codebase
- Need component library for consistency
- Building a production SaaS (not a demo)

## Related Decisions

- ADR-0001: Manager pattern compensates for lack of framework structure
- ADR-0003: Local bundling enables true offline capability
