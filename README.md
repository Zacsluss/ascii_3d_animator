<div align="center">

# ASCII 3D Animator

### Real-time 3D model conversion to animated ASCII art in the browser

**[Try Live Demo](https://zacsluss.github.io/ASCII_3D_Animator)** • **[Download](https://github.com/Zacsluss/ASCII_3D_Animator/archive/refs/heads/main.zip)**

</div>

---

## What This Is

A browser-based tool that converts animated 3D models into live ASCII art. Unlike static image-to-ASCII converters, this renders full 3D animations—complete with camera controls, professional lighting systems, and customizable character sets—entirely as text characters.

The technical challenge was building a real-time depth-to-character mapping system that calculates surface normals and lighting intensity for each character position while maintaining smooth animation playback. The result is a 5-point lighting engine with preset configurations (Studio, Dramatic, Natural, Minimal) that mimics professional 3D rendering techniques within ASCII constraints.

**Key Stats:**

- 60 FPS rendering on desktop browsers
- 4 animated 3D models with custom loader support
- 5-point lighting system with individual intensity controls
- Mobile-optimized with full touch support
- 100% offline capable—all dependencies bundled locally

## Technical Stack

Built with **Three.js** for WebGL rendering, structured as **ES6 modules** with clear separation of concerns. Architecture follows single-responsibility principles across 7 modules: constants, lighting, models, animation, ASCII conversion, UI handlers, and application coordination.

**Code Quality:**

- Jest test framework with 70%+ coverage
- ESLint + Prettier for code quality enforcement
- GitHub Actions CI/CD pipeline
- ARIA accessibility with keyboard navigation

## Quick Start

**Online:** Visit [zacsluss.github.io/ASCII_3D_Animator](https://zacsluss.github.io/ASCII_3D_Animator)

**Offline:** [Download ZIP](https://github.com/Zacsluss/ASCII_3D_Animator/archive/refs/heads/main.zip), extract, and open `index.html`—no server required.

**Development:**

```bash
git clone https://github.com/Zacsluss/ASCII_3D_Animator.git
cd ASCII_3D_Animator
npm install        # Install dependencies
npm start          # Local dev server
npm test           # Run test suite
npm run validate   # Lint + format + test
```

## Usage

1. **Select a model** from the 4 included animations
2. **Adjust lighting** using the 5-point system (Front, Ambient, Right, Left, Overhead)
3. **Customize characters** by entering text in the character field
4. **Control camera** with mouse drag (rotate), scroll (zoom), or touch gestures

The lighting presets provide starting points for different aesthetics—dramatic high-contrast, balanced studio lighting, soft natural illumination, or minimal single-source setups.

## Why I Built This

As someone who manages enterprise-scale platforms by day, I built this to maintain hands-on technical skills. The best leaders never stop coding.

This project specifically explores real-time rendering algorithms, shader-like effects without GPU shaders, and the intersection of retro aesthetics with modern browser capabilities. The challenge wasn't just making it work—it was making it fast enough for smooth animation while keeping the codebase maintainable and testable.

## Contributing

Bug reports, feature suggestions, and PRs are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

---

<div align="center">

**Built by [Zachary Sluss](https://github.com/Zacsluss)** • MIT License

[![GitHub stars](https://img.shields.io/github/stars/Zacsluss/ASCII_3D_Animator?style=social)](https://github.com/Zacsluss/ASCII_3D_Animator/stargazers)

</div>
