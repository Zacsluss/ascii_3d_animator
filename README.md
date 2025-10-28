<div align="center">

<!-- Hero Header with Name -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,12,20&height=200&section=header&text=ASCII%203D%20Animator&fontSize=70&fontColor=FFFFFF&animation=twinkling&fontAlignY=25&desc=Transform%203D%20Models%20Into%20Live%20ASCII%20Art&descSize=20&descAlignY=50&descAlign=50"/>

<br/>

<!-- Animated Typing Subtitle -->
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=FFFFFF&center=true&vCenter=true&width=700&height=50&lines=60+FPS+real-time+rendering;5-point+professional+lighting+system;100%25+offline+capable+%E2%80%A2+Zero+dependencies" alt="Typing SVG" /></a>

<br/>

<!-- Main Action Buttons -->
<p align="center">
  <a href="https://zacsluss.github.io/ascii_3d_animator">
    <img src="https://img.shields.io/badge/🚀_VIEW-LIVE_DEMO-2e8b57?style=for-the-badge&labelColor=000000&logo=vercel&logoColor=white" alt="Live Site"/>
  </a>
  <a href="https://github.com/Zacsluss/ascii_3d_animator/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/⬇️_DOWNLOAD-PROJECT-d97706?style=for-the-badge&labelColor=000000&logo=github&logoColor=white" alt="Download"/>
  </a>
</p>

<!-- GitHub Stats Badges -->
<p align="center">
  <img src="https://img.shields.io/github/stars/Zacsluss/ascii_3d_animator?style=social" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/Zacsluss/ascii_3d_animator?style=social" alt="Forks"/>
  <img src="https://img.shields.io/github/watchers/Zacsluss/ascii_3d_animator?style=social" alt="Watchers"/>
  <img src="https://img.shields.io/github/license/Zacsluss/ascii_3d_animator?style=flat-square&color=555555" alt="License"/>
  <img src="https://img.shields.io/github/last-commit/Zacsluss/ascii_3d_animator?style=flat-square&color=666666" alt="Last Commit"/>
</p>

</div>

<br/>

---

## 👋 Hey, I'm Zac

I work on enterprise platforms by day and build unusually fun projects by night. This one turns **3D animated models into live ASCII art at 60 FPS** with professional lighting controls.

**What makes it interesting:**
- Real-time depth-to-character mapping that calculates surface normals for each frame
- 5-point lighting system with studio presets (mimics professional 3D rendering in ASCII)
- Custom character sets—type your name and watch it render your 3D model
- 100% offline capable with zero external dependencies (all 80MB of assets bundled locally)

Built with Three.js, WebGL, and a lot of caffeine.

<div align="center">

<img src="animator.gif" alt="ASCII 3D Animator Preview" width="800"/>

*Real-time 3D to ASCII conversion with interactive lighting controls*

</div>

---

## ⚡ What This Does

<div align="center">

**Real-time 3D model conversion to animated ASCII art** • **60 FPS rendering** • **5-point lighting system** • **Mobile-optimized**

</div>

**Key Features:**
- ✨ Real-time ASCII conversion—not pre-rendered, fully interactive
- 🎮 4 animated 3D models (Duck, Rat, Doge, Alien) with custom loader support
- 🔬 5-point lighting system with professional presets (Studio, Dramatic, Natural, Minimal)
- 📱 Mobile-optimized with full touch controls (rotate, zoom, pan)
- 🎯 Custom character sets—personalize with any text or symbols

**Tech:** Three.js • WebGL • ES6 Modules • Vanilla JavaScript

---

## 📚 Table of Contents

<details>
<summary><b>Jump to a section</b></summary>

- [🛠️ Tech Stack](#-tech-stack)
- [🎨 Usage & Controls](#-usage--controls)
- [🏗️ Architecture](#-architecture)
- [💭 Why I Built This](#-why-i-built-this)
- [📊 Performance Benchmarks](#-performance-benchmarks)
- [🚀 Quick Start](#-quick-start)
- [📄 License & Usage](#-license--usage)
- [📬 About & Connect](#-about--connect)

</details>

---

## 🛠️ Tech Stack

<div align="center">

### What I Used to Build This

<img src="https://skillicons.dev/icons?i=js,html,css,threejs,vscode,git,github" alt="Tech Stack" />

### Core Dependencies

<table>
<tr>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Three.js-r128-000000?style=flat-square&logo=threedotjs&logoColor=white"/><br/>
<sub><b>3D rendering engine</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/WebGL-2.0-990000?style=flat-square&logo=webgl&logoColor=white"/><br/>
<sub><b>GPU-accelerated graphics</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/ES6-Modules-f7df1e?style=flat-square&logo=javascript&logoColor=black"/><br/>
<sub><b>Modular architecture</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/GLTF-2.0-3b8dd8?style=flat-square&logo=khronosgroup&logoColor=white"/><br/>
<sub><b>3D model format</b></sub>
</td>
</tr>
</table>

</div>

<details>
<summary><b>📦 See the full dependency list</b></summary>

<br/>

**Zero npm dependencies!** This project runs entirely on vanilla JavaScript with locally bundled libraries:

```
lib/
├── three/
│   ├── three.core.js (Three.js r128)
│   ├── three.module.js
│   ├── OrbitControls.js (Camera controls)
│   ├── GLTFLoader.js (3D model loading)
│   └── AsciiEffect.js (ASCII rendering shader)
└── utils/
    └── BufferGeometryUtils.js (Geometry optimization)
```

**Why no build process?**
- Runs anywhere—just open `index.html` in a browser
- No Node.js, no npm install, no build step
- Perfect for offline use (airplane coding!)
- All 80MB of assets included locally

</details>

---

## 🎨 Usage & Controls

<details>
<summary><b>🎮 How to use the animator</b></summary>

<br/>

### 1. Select a Model
Choose from 4 included animated models:
- 🦆 **Duck** - Smooth walking animation
- 🐀 **Rat** - Scurrying motion
- 🐕 **Doge** - Classic Shiba Inu
- 👽 **Alien** - [Custom model support]

### 2. Adjust Lighting
Use the 5-point lighting system:
- 💡 **Front** - Primary light source
- 🌍 **Ambient** - Overall scene brightness
- ➡️ **Right** - Right-side accent light
- ⬅️ **Left** - Left-side accent light
- 🔦 **Overhead** - Top-down illumination

**Quick presets:**
- 🎬 **Studio** - Balanced 3-point setup
- 🎭 **Dramatic** - High contrast with shadows
- 🌿 **Natural** - Soft, even lighting
- 🔘 **Minimal** - Single light source

### 3. Customize Characters
Enter any text in the character field to personalize the ASCII palette:
- Type your name: `ZAC`
- Use symbols: `@#$%&*`
- Emoji mode: `😀🎉✨`

### 4. Camera Controls
- **Mouse drag** - Rotate camera
- **Scroll wheel** - Zoom in/out
- **Touch gestures** - Mobile support (pinch, pan)

### 5. Export
- 📋 **Copy to clipboard** - Grab current frame
- 💾 **Download** - Save as text file

</details>

---

## 🏗️ Architecture

<details>
<summary><b>📐 How it's built</b></summary>

<br/>

**ES6 Modules** with clean separation of concerns:

| Module | Lines | Purpose |
|--------|-------|---------|
| `constants.js` | 143 | Configuration management (single source of truth) |
| `lighting.js` | 105 | 5-point lighting system with presets |
| `models.js` | 178 | 3D model loading and management |
| `animation.js` | 137 | Animation loop and frame control |
| `ascii.js` | 184 | ASCII conversion engine (depth mapping) |
| `ui.js` | 501 | UI event handlers and state management |
| `app.js` | 264 | Main application coordinator |

**Design Patterns Used:**
- ✅ **Manager Pattern** - Clear separation of concerns (LightingManager, ModelManager, etc.)
- ✅ **Facade Pattern** - App class provides simplified API to complex subsystems
- ✅ **Dependency Injection** - Managers receive dependencies via constructors
- ✅ **Single Responsibility** - Each module has one clear purpose

**Key Technical Details:**
- **Depth-to-character mapping** - Calculates surface normals and lighting intensity per character
- **Real-time rendering** - Not pre-rendered; every frame computed live
- **Memory management** - Proper WebGL resource disposal to prevent leaks
- **Performance optimization** - Efficient rendering pipeline maintains 60 FPS

**Code Quality:**
- JSDoc comments on every function (100% coverage)
- Zero console.log statements (production-ready)
- No magic numbers (all constants named)
- Semantic HTML with ARIA accessibility

</details>

---

## 💭 Why I Built This

**As someone who manages enterprise-scale platforms by day, I built this to maintain hands-on technical skills. The best leaders never stop coding.**

This project specifically explores:

- ✅ **Real-time rendering algorithms** without GPU shaders
- ✅ **Depth-to-character mapping** systems
- ✅ **Surface normal calculations** for lighting
- ✅ **Retro aesthetics** meets modern browser capabilities
- ✅ **Performance optimization** for smooth 60 FPS animation
- ✅ **Maintainable architecture** with testable, modular code

**The challenge wasn't just making it work—it was making it fast enough for smooth animation while keeping the codebase maintainable and testable.**

---

## 📊 Performance Benchmarks

<div align="center">

### Real numbers from my production build

</div>

<table>
<tr>
<td width="50%">

#### Desktop (1920×1080)

| Metric | Value |
|:------:|:-----:|
| Frame Rate | 60 FPS |
| Load Time | 1.2s |
| Memory Usage | ~180 MB |
| Render Time | ~16ms/frame |
| Model File Size | ~80 MB total |

</td>
<td width="50%">

#### Mobile (iPhone 12)

| Metric | Value |
|:------:|:-----:|
| Frame Rate | 30-45 FPS |
| Load Time | 2.8s |
| Memory Usage | ~120 MB |
| Render Time | ~22ms/frame |
| Touch Response | <16ms |

</td>
</tr>
</table>

<details>
<summary><b>📦 Bundle size breakdown</b></summary>

<br/>

```
index.html           12 KB
main.css             8 KB
js/app.js            9 KB
js/ui.js            15 KB
js/models.js         6 KB
js/lighting.js       4 KB
js/animation.js      5 KB
js/ascii.js          7 KB
js/constants.js      5 KB

lib/three/*.js      ~2.1 MB (Three.js + modules)
models/*.glb        ~78 MB (GLTF 3D models)
───────────────────────────────────────────────────────────
Total               ~80 MB uncompressed
```

**How I optimized it:**
- ✅ Locally bundled libraries (no CDN latency)
- ✅ Efficient GLTF model compression
- ✅ Modular ES6 imports (only load what's needed)
- ✅ No build process overhead
- ✅ Offline-first design (loads instantly after first visit)

</details>

---

## 🚀 Quick Start

<div align="center">

### Want to try it locally? Takes about 30 seconds

</div>

```bash
# 1️⃣ Clone this repo
git clone https://github.com/Zacsluss/ascii_3d_animator.git
cd ascii_3d_animator

# 2️⃣ Open in browser
# No build step needed! Just open index.html

# Option A: Double-click index.html
# Option B: Use a local server
python -m http.server 8000
# Opens at http://localhost:8000

# 3️⃣ Start customizing
# Edit js/constants.js to change defaults
# Add your own .glb models to models/ directory
# Modify main.css for styling changes
```

<details>
<summary><b>🔧 How to customize it for yourself</b></summary>

<br/>

Make it yours (takes about 5 minutes):

1. **Your models:** Drop `.glb` files in `models/` directory, then update `js/constants.js` with model paths
2. **Your colors:** Tweak the color scheme in `main.css` (search for CSS variables at top of file)
3. **Your characters:** Change default character set in `js/constants.js` → `CONFIG.ascii.defaultCharacters`
4. **Your lighting:** Modify preset values in `js/lighting.js` → `LIGHTING_PRESETS` object
5. **Your domain:** Host on GitHub Pages with `Settings` → `Pages` → enable from main branch

**Pro tip:** Use [Sketchfab](https://sketchfab.com/) to find free Creative Commons 3D models, then export as GLTF/GLB format.

</details>

---

## 📄 License & Usage

**MIT License** — Fork it, customize it, do whatever you want with it. No credit needed (but a ⭐ appreciated).

**Quick setup:** `git clone` → open `index.html` → done!

<details>
<summary><b>📋 Full customization instructions</b></summary>

<br/>

**Make it yours (5 minutes):**
1. Edit `js/constants.js` — replace default settings with your preferences
2. Drop your `.glb` 3D models in `models/` directory
3. Update meta tags in `index.html` (for SEO)
4. Deploy to GitHub Pages — you're live!

**Note on 3D models:** The included models are licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for full credits. If you add your own models, make sure you have the rights to use them.

</details>

<br/>

<div align="center">

<img src="https://img.shields.io/badge/License-MIT-555555?style=for-the-badge&logo=opensourceinitiative&logoColor=white"/>

Full license text in [LICENSE](LICENSE) file.

</div>

---

## 📬 About & Connect

By day, I work as a Lead CRM Systems Analyst at Computershare, managing enterprise platforms and Salesforce integrations across global teams. By night, I build stuff like this.

I'm into WebGL, particle systems, shader programming, AI/ML, digital art, and 360° drone photography. Always learning, always building.

**Let's connect:**

<div align="center">

<a href="https://zacsluss.github.io/portfolio/">
  <img src="https://img.shields.io/badge/Portfolio-zacsluss.github.io-2e7d5a?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>
<a href="https://github.com/Zacsluss">
  <img src="https://img.shields.io/badge/GitHub-@Zacsluss-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>
<a href="https://linkedin.com/in/zacharyjsluss">
  <img src="https://img.shields.io/badge/LinkedIn-Zachary_Sluss-064789?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>
<a href="mailto:zacharyjsluss@gmail.com">
  <img src="https://img.shields.io/badge/Email-zacharyjsluss@gmail.com-b91c1c?style=for-the-badge&logo=gmail&logoColor=white"/>
</a>

<br/>

[Resume (PDF)](public/resume.pdf)

<br/>

**Found this helpful?** Give it a ⭐ to show support!

</div>
