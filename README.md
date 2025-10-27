<div align="center">

# 🎨 ASCII 3D ANIMATOR

### Transform 3D models into stunning animated ASCII art in real-time!

**Create mesmerizing ASCII art animations from 3D models right in your browser!** This interactive web app converts animated 3D models (like walking characters, animals, and creatures) into beautiful text-based art using customizable lighting and your own text characters. Perfect for developers, artists, gamers, and anyone who loves retro ASCII aesthetics.

**🎯 What makes it special?** Unlike static ASCII converters, this tool renders **live 3D animations** as ASCII art with full camera controls, professional lighting systems, and the ability to use your own text (like your name, favorite words, or symbols) as the ASCII characters. Watch a duck walk, a rat scurry, or a doge sit - all rendered as moving text art!

[![🚀 START SIMULATION!](https://img.shields.io/badge/🚀-START%20SIMULATION!-ff69b4?style=for-the-badge&labelColor=000000)](https://zacsluss.github.io/ASCII_3D_Animator)
[![📥 DOWNLOAD](https://img.shields.io/badge/📥-DOWNLOAD-00ff88?style=for-the-badge&labelColor=000000)](https://github.com/Zacsluss/ASCII_3D_Animator/archive/refs/heads/main.zip)
[![⭐ STAR](https://img.shields.io/badge/⭐-STAR%20ON%20GITHUB-ffff00?style=for-the-badge&labelColor=000000)](https://github.com/Zacsluss/ASCII_3D_Animator)

</div>

## ✨ **KEY FEATURES**

🎨 **Real-time ASCII conversion** from 3D models  
🎭 **4 animated models** with interactive controls  
💡 **Professional 5-point lighting** system  
🌈 **Custom character rendering** - use YOUR text!  
📱 **Mobile optimized** with touch controls  
🎮 **Interactive camera** with zoom and rotation

---

## 🚀 **GET STARTED INSTANTLY**

<div align="center">

|                          🌐 **ONLINE**                           |                                          💾 **OFFLINE**                                          |                           👨‍💻 **DEVELOPERS**                            |
| :--------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------: |
| **[▶️ START NOW](https://zacsluss.github.io/ASCII_3D_Animator)** | **[📦 DOWNLOAD ZIP](https://github.com/Zacsluss/ASCII_3D_Animator/archive/refs/heads/main.zip)** | **[🛠️ CLONE REPO](https://github.com/Zacsluss/ASCII_3D_Animator.git)** |
|                        Instant web access                        |                                        Works 100% offline                                        |                          Fork and contribute                           |

</div>

---

## 🎮 **HOW TO USE**

**1️⃣ Choose Model** → Cycle through 4 animated 3D models  
**2️⃣ Adjust Lighting** → Use 5 professional lighting controls:

- 💡 Front, 🌍 Ambient, ➡️ Right, ⬅️ Left, 🔦 Overhead lights
  **3️⃣ Customize** → Type your text in "Custom ASCII Characters" → Apply!

### 🎨 **Cool Examples**

- `HELLO WORLD` → Classic text art
- `★☆★☆★` → Starry effect
- Your name → Personalized ASCII art
- `GAME OVER` → Retro gaming vibes

```
HHHEELLLLOOOWWOORRLLDDD
 HHEELLLLOOOWWOORRLLDDHH
  EELLLLOOOWWOORRLLDDHHE
   LLLLOOOWWOORRLLDDHH
    LLOOOWWOORRLLDDHH
     OOOWWOORRLLDDHH
      OWWOORRLLDDHH
       WOORRLLDDHH
        OORRLLDDHH
```

---

## 🎛️ **CONTROLS**

|      Control      | Action           | Result              |
| :---------------: | ---------------- | ------------------- |
| 🖱️ **Mouse Drag** | Rotate camera    | 360° view           |
|  **Right Click**  | Change animation | Cycle effects       |
|    **Scroll**     | Zoom in/out      | Close-up details    |
|   📱 **Touch**    | Mobile controls  | Full mobile support |

---

## 🎭 **LIGHTING PRESETS**

🎬 **Studio** - Professional balanced lighting  
🎭 **Dramatic** - High contrast and moody  
🌅 **Natural** - Soft, even illumination  
💡 **Minimal** - Clean, simple focus

---

## 🛠️ **TECH SPECS**

- **⚡ Three.js Engine** - Fast 3D rendering (bundled locally)
- **🚀 Browser-based** - No installation needed
- **📱 Mobile ready** - Touch optimized
- **💾 Self-contained** - All dependencies bundled, works offline
- **🏗️ Modular Architecture** - Clean, maintainable ES6 modules
- **✅ Fully Tested** - Jest unit tests with 70%+ coverage
- **🔍 Linted & Formatted** - ESLint + Prettier for code quality
- **🚀 CI/CD Pipeline** - Automated testing with GitHub Actions
- **♿ Accessible** - ARIA labels, keyboard navigation, screen reader support

### 🖥️ **OFFLINE USE**

**Works 100% offline!** Download the ZIP file and open `index.html` in any modern browser:

1. **[Download ZIP](https://github.com/Zacsluss/ASCII_3D_Animator/archive/refs/heads/main.zip)**
2. Extract the folder anywhere on your computer
3. Double-click `index.html` to run locally
4. No internet connection required - all assets are included!

---

## 👨‍💻 **FOR DEVELOPERS**

### 🏗️ **Architecture**

This project uses a modern modular architecture with clear separation of concerns:

```
js/
├── constants.js      # Configuration constants
├── lighting.js       # Lighting system
├── models.js         # Model loading & management
├── animation.js      # Animation system
├── ascii.js          # ASCII effect management
├── ui.js             # UI event handlers
└── app.js            # Main application class
```

**Key Features:**

- 📦 **ES6 Modules** - Clean imports/exports
- 🎯 **Single Responsibility** - Each module has one job
- 📝 **JSDoc Documented** - Full API documentation
- 🧪 **Unit Tested** - Comprehensive test coverage
- 🔧 **Easy to Extend** - Add new features quickly

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed documentation.

### 🚀 **Quick Start (Development)**

```bash
# Clone repository
git clone https://github.com/Zacsluss/ASCII_3D_Animator.git
cd ASCII_3D_Animator

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Lint and format code
npm run lint:fix && npm run format
```

### 📋 **Available Scripts**

```bash
npm start           # Start local development server
npm test            # Run Jest tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage  # Generate coverage report
npm run lint        # Check code quality
npm run lint:fix    # Auto-fix linting issues
npm run format      # Auto-format with Prettier
npm run validate    # Run all checks (lint + format + test)
```

### 🧪 **Testing**

Comprehensive test suite with Jest:

- ✅ Unit tests for all managers
- ✅ Configuration validation
- ✅ 70%+ code coverage
- ✅ Automated CI/CD testing

```bash
npm test            # Run all tests
npm run test:watch  # Watch mode for development
npm run test:coverage  # Generate coverage report
```

### 🔄 **CI/CD**

Automated quality checks on every push:

- ✅ ESLint code quality
- ✅ Prettier formatting
- ✅ Jest test suite
- ✅ Security audit
- ✅ Coverage reporting

See [.github/workflows/ci.yml](.github/workflows/ci.yml) for pipeline configuration.

---

## 🤝 **CONTRIBUTE**

Love ASCII art? Help us improve:

[![Issues](https://img.shields.io/github/issues/Zacsluss/ASCII_3D_Animator?style=for-the-badge&logo=github)](https://github.com/Zacsluss/ASCII_3D_Animator/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/Zacsluss/ASCII_3D_Animator?style=for-the-badge&logo=github)](https://github.com/Zacsluss/ASCII_3D_Animator/pulls)

🐛 Report bugs • 💡 Suggest features • 🎨 Add models • ⭐ Star repo

**Want to contribute code?** Check out [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines, coding standards, and how to submit PRs.

---

<div align="center">

## 🎉 **START CREATING NOW!**

[![🚀 START SIMULATION!](https://img.shields.io/badge/🚀-START%20SIMULATION!-ff69b4?style=for-the-badge&labelColor=000000)](https://zacsluss.github.io/ASCII_3D_Animator)

**Made with 💖 by [Zacsluss](https://github.com/Zacsluss)**

📜 **License:** [MIT License](LICENSE) - Free to use, modify, and distribute!

[![GitHub stars](https://img.shields.io/github/stars/Zacsluss/ASCII_3D_Animator?style=social)](https://github.com/Zacsluss/ASCII_3D_Animator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Zacsluss/ASCII_3D_Animator?style=social)](https://github.com/Zacsluss/ASCII_3D_Animator/network)

### 🏷️ Tags

`ascii-art` `3d-animation` `threejs` `webgl` `interactive` `creative-coding` `javascript` `html5` `mobile-friendly` `offline-capable` `mit-license`

</div>
