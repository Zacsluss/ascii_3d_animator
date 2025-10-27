# Changelog

All notable changes to the ASCII 3D Animator project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-20

### Added

- Initial public release
- Real-time ASCII 3D rendering at 60 FPS
- 5-point professional lighting system with presets
- 20+ visual themes (retro CRT, neon cyberpunk, matrix rainbow)
- Mobile-optimized touch controls
- Custom character set support
- 4 animated 3D models (Duck, Rat, Doge, Alien)
- Comprehensive test suite (Vitest + Playwright)
- CI/CD pipeline with automated quality checks
- Full accessibility support (ARIA, keyboard navigation)
- WebGL context loss/restore handling
- Input validation and sanitization
- Error boundaries for graceful degradation
- JSDoc documentation (100% API coverage)
- ESLint + Prettier code formatting
- GitHub issue templates
- Architectural Decision Records (ADRs)

### Security

- Content Security Policy headers
- Input sanitization for custom characters
- XSS protection via meta tags
- MIME type sniffing prevention

---

## [0.9.0] - 2024-10-15

### Added

- Rainbow theme with matrix-style animation
- Theme selector with category grouping
- Model loading overlay with spinner
- File upload validation for custom models

### Changed

- Reduced ASCII density for better mobile performance
- Optimized DOM rendering pipeline (60 FPS on desktop)
- Improved touch gesture handling

### Fixed

- Memory leaks from WebGL resource disposal
- Race conditions in model loading
- Animation glitches after tab backgrounding

---

## [0.5.0] - 2024-09-01

### Added

- Initial prototype
- Basic ASCII rendering engine
- Three.js integration
- OrbitControls camera system
