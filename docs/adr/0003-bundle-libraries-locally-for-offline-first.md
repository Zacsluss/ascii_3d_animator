# ADR-0003: Bundle Libraries Locally for Offline-First Capability

**Date:** 2024-09-01
**Status:** Accepted
**Deciders:** Zachary Sluss
**Context:** Dependency management strategy for ASCII 3D Animator

## Context and Problem Statement

How should we load Three.js and other dependencies? Options include CDN links, npm packages with bundler, or local bundling. This decision affects load time, offline capability, and deployment complexity.

## Decision Drivers

- **Offline capability:** Must work without internet (portfolio demo scenario)
- **Simplicity:** No build step if possible
- **Performance:** Minimize network requests
- **Reliability:** Can't depend on third-party CDN uptime
- **Portability:** Should work by opening index.html anywhere

## Considered Options

1. **Local bundling** - Copy Three.js files to `/lib`, commit to repo
2. **CDN links** - Load from cdnjs or unpkg
3. **npm + bundler** - Use Webpack/Vite to bundle dependencies
4. **ES Module CDN** - Use Skypack/esm.sh for ES module imports

## Decision Outcome

**Chosen option: Local bundling**

Copy Three.js r128 and required modules to `/lib` directory and commit them to the repository.

```
lib/
├── three/
│   ├── three.module.js (585 KB)
│   ├── OrbitControls.js (45 KB)
│   ├── GLTFLoader.js (82 KB)
│   └── AsciiEffect.js (12 KB)
```

### Positive Consequences

- ✅ **True offline capability:** Works on airplane, no internet required
- ✅ **Zero latency:** No CDN roundtrip, instant load from disk
- ✅ **Version lock:** Three.js r128 will never change unexpectedly
- ✅ **No build step:** Just open index.html, no npm install needed
- ✅ **No CDN outages:** Can't be broken by third-party infrastructure
- ✅ **Self-contained demo:** Entire project in one folder, easy to zip and share
- ✅ **Portfolio advantage:** "Here's a USB drive with my work" scenario

### Negative Consequences

- ❌ **Large repo size:** ~2.1 MB of JavaScript in version control
- ❌ **Manual updates:** Can't just `npm update` to get latest Three.js
- ❌ **Git diffs:** Large library files clutter commit history
- ❌ **Not following npm conventions:** Most projects use package managers

## Implementation Notes

Import pattern using relative paths:

```javascript
import * as THREE from '../lib/three/three.module.js';
import { OrbitControls } from '../lib/three/OrbitControls.js';
import { GLTFLoader } from '../lib/three/GLTFLoader.js';
```

All imports use `.js` extension (required for ES modules without bundler).

## Trade-off Analysis

**Why this works for a portfolio demo:**

| Concern | CDN | npm+bundler | Local bundling |
|---------|-----|-------------|----------------|
| Offline work | ❌ | ✅ | ✅ |
| No build step | ✅ | ❌ | ✅ |
| Fast local dev | ❌ | ⚠️ | ✅ |
| Easy updates | ✅ | ✅ | ❌ |
| Small repo | ✅ | ✅ | ❌ |

For this specific use case:
- Offline work > Easy updates (demo stability matters more)
- No build step > Small repo (simplicity and portability win)
- Fast local dev > Following conventions (developer experience priority)

## Bundle Size Breakdown

Total bundled assets: ~80 MB
- Three.js libraries: 2.1 MB
- 3D models (GLTF/GLB): 78 MB
- Application code: 70 KB
- CSS: 8 KB
- HTML: 12 KB

**Acceptable because:**
- This is a demo, not a production SaaS serving millions
- Models need to be included for offline capability anyway
- GitHub repo size limit is 100 GB (we're using 0.08%)
- Load time on localhost is instant (~200ms total)

## When This Decision Would Change

Would switch to CDN or npm if:
- Building production app serving 1000+ users (bundle size matters)
- Need tree-shaking to reduce bundle size
- Team needs frequent Three.js version updates
- Deploying to CDN with global edge network (Cloudflare, etc.)
- Repository size becomes a concern (>100 MB)

## Alternative Considered: Hybrid Approach

Could use CDN with local fallback:

```html
<script src="https://cdn.example.com/three.js"></script>
<script>
  if (!window.THREE) {
    // Load local fallback
    import('./lib/three/three.module.js');
  }
</script>
```

**Rejected because:** Adds complexity without significant benefit for demo use case.

## Related Decisions

- ADR-0002: No build step aligns with local bundling choice
- ADR-0001: Manager pattern not affected by bundling strategy
