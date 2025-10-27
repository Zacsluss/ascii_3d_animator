<div align="center">

<!-- Hero Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,18&height=180&section=header&text=ASCII%203D%20Animator&fontSize=60&fontColor=FFFFFF&animation=twinkling&fontAlignY=30&desc=Transform%203D%20Models%20Into%20Live%20ASCII%20Art&descSize=18&descAlignY=55"/>

<br/>

<!-- Main Action Buttons -->
<p align="center">
  <a href="https://zacsluss.github.io/ASCII_3D_Animator">
    <img src="https://img.shields.io/badge/🎨_TRY-LIVE_DEMO-2d7a3e?style=for-the-badge&labelColor=000000&logo=vercel&logoColor=white" alt="Live Demo"/>
  </a>
  <a href="https://github.com/Zacsluss/ASCII_3D_Animator/archive/refs/heads/main.zip">
    <img src="https://img.shields.io/badge/⬇️_DOWNLOAD-ZIP-0366d6?style=for-the-badge&labelColor=000000&logo=download&logoColor=white" alt="Download"/>
  </a>
</p>

<!-- GitHub Stats Badges -->
<p align="center">
  <img src="https://img.shields.io/github/stars/Zacsluss/ASCII_3D_Animator?style=social" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/Zacsluss/ASCII_3D_Animator?style=social" alt="Forks"/>
  <img src="https://img.shields.io/github/license/Zacsluss/ASCII_3D_Animator?style=flat-square&color=555555" alt="License"/>
  <img src="https://img.shields.io/github/last-commit/Zacsluss/ASCII_3D_Animator?style=flat-square&color=666666" alt="Last Commit"/>
</p>

</div>

<br/>

---

## 🎯 What This Does

**Real-time 3D model conversion to animated ASCII art** — all in your browser. Unlike static image-to-ASCII converters, this renders **full 3D animations** with camera controls, professional lighting systems, and customizable character sets.

<div align="center">

```diff
+ 60 FPS rendering on desktop browsers
+ 4 animated 3D models with custom loader support
+ 5-point lighting system (Studio, Dramatic, Natural, Minimal)
+ Mobile-optimized with full touch support
+ 100% offline capable—all dependencies bundled locally
```

</div>

<br/>

<div align="center">

<!-- Performance Metrics -->
<table>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Performance-60_FPS-00ff88?style=flat-square&logo=speedtest&logoColor=white"/><br/>
      <sub><b>Frame Rate</b></sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Models-4_Animated-0088ff?style=flat-square&logo=threedotjs&logoColor=white"/><br/>
      <sub><b>3D Models</b></sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Lighting-5_Point-ff6b6b?style=flat-square&logo=lightbulb&logoColor=white"/><br/>
      <sub><b>Light System</b></sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Coverage-70%25-ffd93d?style=flat-square&logo=jest&logoColor=white"/><br/>
      <sub><b>Test Suite</b></sub>
    </td>
  </tr>
</table>

</div>

<div align="center">
<img width="800" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,18&height=2"/>
</div>

---

## 💡 The Technical Challenge

**Building a real-time depth-to-character mapping system** that calculates surface normals and lighting intensity for each character position while maintaining smooth animation playback.

**The result?** A 5-point lighting engine with preset configurations that mimics professional 3D rendering techniques within ASCII constraints.

<table>
<tr>
<td width="50%">

### 🎯 What Makes It Special

- **Real-time ASCII conversion** - Not pre-rendered, fully interactive
- **5-point lighting system** - Studio, Dramatic, Natural, Minimal presets
- **Custom character sets** - Type your name, use symbols, personalize it
- **Camera controls** - Rotate, zoom, pan with mouse/touch
- **Professional testing** - 70%+ coverage with Jest, ESLint, Prettier

</td>
<td width="50%">

### 📈 The Numbers

| Metric          | Value                 |
| --------------- | --------------------- |
| Frame Rate      | 60 FPS (Desktop)      |
| 3D Models       | 4 Animated            |
| Lighting Points | 5 Individual Controls |
| Test Coverage   | 70%+                  |
| Mobile Support  | Full Touch Controls   |
| Offline Capable | 100%                  |

</td>
</tr>
</table>

---

## 🚀 Quick Start

<table>
<tr>
<td width="33%" align="center">

### 🌐 Online

**[Try Live Demo](https://zacsluss.github.io/ASCII_3D_Animator)**

Instant access, no installation

</td>
<td width="33%" align="center">

### 💾 Offline

**[Download ZIP](https://github.com/Zacsluss/ASCII_3D_Animator/archive/refs/heads/main.zip)**

Extract → Open `index.html`

</td>
<td width="33%" align="center">

### 👨‍💻 Development

```bash
git clone <repo>
npm install
npm start
```

</td>
</tr>
</table>

<br/>

<details>
<summary><b>📋 Development Commands</b></summary>

```bash
npm install        # Install dependencies
npm start          # Local dev server
npm test           # Run test suite
npm run lint       # Check code quality
npm run format     # Auto-format code
npm run validate   # Lint + format + test
```

</details>

---

## 🎨 Usage

**1. Select a model** from the 4 included animations (Duck, Rat, Doge, etc.)

**2. Adjust lighting** using the 5-point system:

- 💡 **Front** - Primary light source
- 🌍 **Ambient** - Overall scene brightness
- ➡️ **Right** - Right-side accent light
- ⬅️ **Left** - Left-side accent light
- 🔦 **Overhead** - Top-down illumination

**3. Customize characters** by entering text in the character field

**4. Control camera** with mouse drag (rotate), scroll (zoom), or touch gestures

**5. Try lighting presets** - Studio, Dramatic, Natural, or Minimal for different aesthetics

---

## 🛠️ Technical Stack

<div align="center">

![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

</div>

<br/>

<table>
<tr>
<td width="50%">

### 🏗️ Architecture

**ES6 Modules** with clear separation of concerns:

- `constants.js` - Single source of truth
- `lighting.js` - 5-point lighting system
- `models.js` - 3D model loading
- `animation.js` - Animation control
- `ascii.js` - ASCII conversion engine
- `ui.js` - UI event handlers
- `app.js` - Application coordination

</td>
<td width="50%">

### ✅ Code Quality

- **Jest** - 70%+ test coverage
- **ESLint** - Code quality enforcement
- **Prettier** - Consistent formatting
- **GitHub Actions** - CI/CD pipeline
- **ARIA** - Accessibility with keyboard nav
- **JSDoc** - Full documentation

</td>
</tr>
</table>

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

## 🤝 Contributing

Bug reports, feature suggestions, and PRs are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

<div align="center">

### Fork it, make it yours! No credit needed. 🚀

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,18&height=100&section=footer"/>

**Built by [Zachary Sluss](https://github.com/Zacsluss)** • MIT License

[![Portfolio](https://img.shields.io/badge/🌐_My_Portfolio-00ff88?style=flat-square)](https://zacsluss.github.io/portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/zacharyjsluss)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:zacsluss@yahoo.com)

</div>
