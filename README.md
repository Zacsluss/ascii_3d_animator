<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,12,20&height=200&section=header&text=ASCII%203D%20Animator&fontSize=70&fontColor=FFFFFF&animation=twinkling&fontAlignY=25&desc=Real-Time%203D%20to%20ASCII%20Conversion%20at%2060%20FPS&descSize=20&descAlignY=50&descAlign=50"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=1000&color=FFFFFF&center=true&vCenter=true&random=false&width=750&lines=60+FPS+WebGL+rendering+%E2%80%A2+50%2C000%2B+chars%2Fframe;5-point+professional+lighting+system;20%2B+visual+themes+%E2%80%A2+100%25+offline+capable;109+tests+%E2%80%A2+85%25+coverage+%E2%80%A2+Production+ready" alt="Typing SVG" />

<br/>

<p align="center">
  <a href="https://zacsluss.github.io/ascii_3d_animator"><img src="https://img.shields.io/badge/🎨_LAUNCH-SIMULATOR-17a2b8?style=for-the-badge&labelColor=2d6a4f" alt="Launch Simulator"/></a>
  <a href="https://github.com/Zacsluss/ascii_3d_animator/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/📦_DOWNLOAD-SOURCE-e67e22?style=for-the-badge&labelColor=d35400" alt="Download Source"/></a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/Zacsluss/ascii_3d_animator?style=social" alt="GitHub stars"/>
  <img src="https://img.shields.io/github/forks/Zacsluss/ascii_3d_animator?style=social" alt="GitHub forks"/>
  <img src="https://img.shields.io/github/actions/workflow/status/Zacsluss/ascii_3d_animator/test.yml?style=for-the-badge&logo=github" alt="Build status"/>
  <img src="https://img.shields.io/badge/coverage-85%25-00ff88?style=for-the-badge&logo=vitest" alt="Coverage"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Performance-98-00ff88?style=for-the-badge&logo=lighthouse" alt="Performance"/>
  <img src="https://img.shields.io/badge/Accessibility-100-00ff88?style=for-the-badge&logo=lighthouse" alt="Accessibility"/>
  <img src="https://img.shields.io/badge/Best_Practices-100-00ff88?style=for-the-badge&logo=lighthouse" alt="Best Practices"/>
  <img src="https://img.shields.io/badge/SEO-100-00ff88?style=for-the-badge&logo=lighthouse" alt="SEO"/>
</p>

</div>

<br/>

---

## 👋 Hey, I'm Zac

I work on enterprise platforms by day and build performance-focused projects by night. This ASCII 3D Animator renders animated 3D models as live ASCII art at **60 FPS** using a custom WebGL shader pipeline - actual real-time conversion, not pre-rendered frames.

**Key achievements:**

- **50,000+ characters/frame** at 60 FPS on modern hardware
- **5-point lighting system** with professional presets
- **20+ visual themes** from retro CRT to modern minimalist
- **109 tests** (85% coverage) with full CI/CD pipeline

Built with Three.js r169 and WebGL 2.0 • Works completely offline after initial load

<div align="center">

<img src="animator.gif" alt="ASCII 3D Animator - Real-time WebGL rendering" width="100%"/>

_Live ASCII conversion of animated 3D models with dynamic lighting and theme switching_

</div>

---

<details>
<summary><b>📚 Table of Contents</b></summary>

<br/>

- [⚡ What This Does](#-what-this-does)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ How It Works - Architecture](#-how-it-works---architecture)
- [🚀 Quick Start](#-quick-start)
  - [📋 Prerequisites](#-prerequisites)
  - [💻 Local Development](#-local-development)
  - [🏗️ Production Build](#-production-build)
  - [🌐 Deploy to GitHub Pages](#-deploy-to-github-pages)
  - [🎨 Customize for Yourself](#-customize-for-yourself)
- [📊 Technical Deep Dive](#-technical-deep-dive)
  - [🎨 ASCII Shader Implementation](#-ascii-shader-implementation)
  - [💡 5-Point Lighting System](#-5-point-lighting-system)
  - [📊 Performance Benchmarks](#-performance-benchmarks)
  - [🧪 Testing & Code Quality](#-testing--code-quality)
  - [⚙️ Advanced Configuration](#-advanced-configuration)
  - [🐛 Troubleshooting](#-troubleshooting)
- [📜 License & Contributing](#-license--contributing)
- [📬 About & Connect](#-about--connect)

</details>

---

<details open>
<summary><b>🛠️ Tech Stack</b></summary>

<div align="center">
<br/>

<p>
  <img src="https://skillicons.dev/icons?i=js,html,css,threejs,vitest,github,vscode,git" alt="Technologies"/>
</p>

<table>
<tr>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Three.js-r169-000000?style=for-the-badge&logo=three.js&logoColor=white"/><br/>
<sub><b>3D Graphics</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/WebGL-2.0-990000?style=for-the-badge&logo=webgl&logoColor=white"/><br/>
<sub><b>Rendering</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Vitest-2.1.9-729b1b?style=for-the-badge&logo=vitest&logoColor=white"/><br/>
<sub><b>Testing</b></sub>
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/ESLint-8.57.1-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/><br/>
<sub><b>Code Quality</b></sub>
</td>
</tr>
</table>

</div>
</details>

---

<details open>
<summary><b>🏗️ Architecture</b></summary>

<br/>

```mermaid
graph TB
    A[User Input] --> B[UI Manager]
    B --> C[App Controller]
    C --> D[Scene Manager]
    C --> E[Lighting Manager]
    C --> F[Model Manager]
    C --> G[ASCII Manager]

    D --> H[Three.js Scene]
    E --> H
    F --> H

    H --> I[WebGL Renderer]
    I --> J[ASCII Shader]
    J --> K[Canvas Output 60 FPS]

    style C fill:#00ff88,color:#000
    style J fill:#00ff88,color:#000
```

**Pipeline:** GLB models → Three.js scene → WebGL render → ASCII shader → 50,000+ chars/frame @ 60 FPS

</details>

---

<details>
<summary><b>🚀 Quick Start</b></summary>

<br/>

```bash
# Clone and run
git clone https://github.com/Zacsluss/ascii_3d_animator.git
cd ascii_3d_animator
python -m http.server 8000
# Open http://localhost:8000
```

**Requirements:** Chrome 90+, Firefox 88+, or Safari 14+ with WebGL 2.0

**Development:**

```bash
npm install        # Install dev tools
npm test          # Run 109 tests
npm run lint      # Check code quality
```

**Deploy:** Push to GitHub → Enable Pages → Live at `zacsluss.github.io/ascii_3d_animator`

</details>

---

<details>
<summary><b>📊 Performance & Configuration</b></summary>

<br/>

### Performance Metrics

| Metric           | Desktop | Mobile    |
| ---------------- | ------- | --------- |
| **Frame Rate**   | 60 FPS  | 30-45 FPS |
| **Memory**       | ~120 MB | ~90 MB    |
| **Initial Load** | ~8s     | ~15s      |
| **Cached Load**  | <0.5s   | <1s       |
| **Characters**   | 50,000+ | 40,000+   |

### Custom Configuration

Edit `js/constants.js` to customize:

- **Performance:** `BASE_DENSITY` (30000-100000)
- **Themes:** Add to `THEMES` object
- **Models:** Drop GLB files in root directory
- **Lighting:** Modify `LIGHTING.PRESETS`

<details>
<summary><b>⚡ Why This Project?</b></summary>

<br/>

<div align="center">

| Approach           | FPS    | Characters  | Real-time? | Themes  | Lighting    |
| ------------------ | ------ | ----------- | ---------- | ------- | ----------- |
| **This Project**   | **60** | **50,000+** | **✅ Yes** | **20+** | **5-point** |
| Pre-rendered ASCII | 24-30  | 10,000      | ❌ No      | Limited | Basic       |
| Terminal-based     | 10-15  | 5,000       | ❌ No      | 1-2     | None        |
| Canvas 2D          | 30     | 20,000      | ✅ Yes     | 5-10    | Simple      |

</div>

</details>

</details>

---

<details>
<summary><b>📜 License</b></summary>

<br/>

<div align="center">
<img src="https://img.shields.io/badge/License-MIT-00ff88?style=for-the-badge&logo=opensourceinitiative&logoColor=white" alt="MIT License"/>
</div>

**MIT License** © 2024 Zachary Sluss

Free to use, modify, and distribute. See [LICENSE](LICENSE) for full text.

**Contributing:** Fork → Branch → Test → PR with conventional commits (`feat:`, `fix:`, etc.)

</details>

---

<details open>
<summary><b>📬 About & Connect</b></summary>

<br/>

<div align="center">

By day, I work as a **Principal CRM & Enterprise Platforms Solutions Architect**, managing multi-million-dollar Salesforce ecosystems and enterprise integrations across 20+ countries. By night, I build projects like this.

**Always learning, always building.**

<a href="https://zacsluss.github.io/portfolio/">
  <img src="https://img.shields.io/badge/Portfolio-zacsluss.github.io-2e7d5a?style=for-the-badge&logo=githubpages&logoColor=white"/>
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
<a href="https://zacsluss.github.io/ascii_3d_animator/public/resume.pdf">
  <img src="https://img.shields.io/badge/Resume-Download_PDF-7c3aed?style=for-the-badge&logo=adobeacrobatreader&logoColor=white"/>
</a>

<br/>
<br/>

**Found this helpful?** Give it a ⭐ to show support!

**Want to contribute?** See [contributing guidelines](#-license--contributing) above.

**Need help?** [Open an issue](https://github.com/Zacsluss/ascii_3d_animator/issues) or email me.

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,12,20&height=100&section=footer"/>

</div>

</details>
