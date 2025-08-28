# ASCII 3D Animator
<!-- [Live Demo](https://zacsluss.github.io/ASCII_3D_Animator) | [Download](https://github.com/Zacsluss/ASCII_3D_Animator/archive/refs/heads/main.zip) | [GitHub](https://github.com/Zacsluss/ASCII_3D_Animator) -->

**Transform your 3D models into beautiful animated ASCII art**

## ✨ Features

🎨 **Real-time ASCII conversion** from 3D models  
🦆 **Multiple animated models** (Duck, Rat, Doge, Alien)  
🎛️ **Interactive lighting controls** with professional presets  
🌈 **Custom character sets** for personalized ASCII art styles  
⚡ **Real-time animation** with speed controls  
📱 **Mobile responsive design** with touch controls  
💾 **Export options**: Copy to clipboard, download as text  
🎭 **4 Lighting presets**: Studio, Dramatic, Natural, Minimal  
🖱️ **Interactive camera controls** with auto-rotation  
🎨 **Theme switching** (Light/Dark modes)  

## 🚀 Quick Start

### 🎯 Use Online Tool
*Coming soon - works in your browser!*

### 💻 Run Locally
Download the project:

```bash
git clone https://github.com/Zacsluss/ASCII_3D_Animator.git
cd ASCII_3D_Animator
```

Open index.html in your browser or start a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2  
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

Visit `http://localhost:8000` in your browser

## 📖 How to Use

1. **Choose your model** - Cycle through Duck, Rat, Doge, or Alien
2. **Adjust lighting** - Use 5 independent light controls:
   - 💡 **Front Light** - Main illumination from camera direction
   - 🌍 **Ambient Light** - Overall brightness and shadow fill
   - ➡️ **Right Light** - Side lighting from the right
   - ⬅️ **Left Light** - Side lighting from the left  
   - 🔦 **Overhead Spotlight** - Focused top-down lighting
3. **Try lighting presets** - Studio, Dramatic, Natural, or Minimal
4. **Customize ASCII characters** - Type custom text for unique effects
5. **Control animation** - Adjust speed or pause rotation
6. **Export your creation**:
   - 📋 Copy to clipboard
   - 📄 Download as text file

## 🎨 Examples

### Custom ASCII Characters
Transform models using your own text:
- Type "HELLO WORLD" → Model rendered with those letters
- Type "★☆★" → Model becomes star patterns  
- Type your name → Personalized ASCII art

### Lighting Examples
- **Studio**: Professional balanced lighting with rim lights
- **Dramatic**: High contrast with deep shadows
- **Natural**: Soft, even illumination  
- **Minimal**: Clean front lighting only

```
    HHEELLLLOOWWOOORRLLDD
   HHEELLLLOOWWOOORRLLDDH
  LLLLOOWWOOORRLLDDHHEE
 LLOOWWOOORRLLDDHHEEL
OOWWOOORRLLDDHHEEL   
WWOOORRLLDDHHEEL     
OOORRLLDDHHEEL       
ORRLLDDHHEEL         
RLLDDHHEEL           
LLDDHHEEL            
DDHHEEL              
DHHEEL               
HHEEL                
HEEL                 
EEL                  
L                    
```

## 🛠️ Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Engine**: Three.js for 3D rendering and ASCII effect
- **Models**: Pre-loaded GLTF/GLB animated 3D models
- **Styling**: Custom CSS with Tailwind integration
- **Animations**: Three.js AnimationMixer for smooth model animations
- **Lighting**: 5-point lighting system with real-time controls
- **No backend required** - runs entirely in the browser

## 🎮 Controls

### 🖱️ Mouse Controls
- **Left Click + Drag**: Rotate camera around model
- **Right Click**: Cycle through model animations  
- **Scroll Wheel**: Zoom in/out
- **Hover over model**: Trigger special animations (Duck speeds up, Rat goes idle)

### ⌨️ Keyboard Shortcuts  
- **T**: Toggle between ASCII and WebGL rendering modes
- **L**: Debug lighting information in console
- **X**: Manual lighting test

### 🎛️ Panel Controls
- **ASCII Density**: Control detail level (0.5-2.0)
- **Custom ASCII Characters**: Use your own text for rendering
- **Animation Speed**: Adjust playback rate
- **Camera Distance**: Set zoom level
- **Lighting Controls**: 5 independent light sources
- **Presets**: Quick professional lighting setups

## 📱 Mobile Support

Fully optimized for mobile devices with:
- Touch-friendly slider controls
- Responsive sidebar design
- Mobile-optimized ASCII rendering
- Touch gesture support for camera controls

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features  
- 🔧 Submit pull requests
- 🎨 Add new 3D models
- ⭐ Star the repository

## 🎯 Future Features

- [ ] Upload custom 3D models (GLTF, OBJ, STL)
- [ ] More lighting presets
- [ ] Screenshot functionality  
- [ ] Color ASCII mode
- [ ] Animation recording/export
- [ ] VR/AR support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **3D Models**: 
  - Duck Walk by Nyilonelycompany (CC BY 4.0)
  - Black Rat by Nestaeric (CC BY 4.0)  
  - Animated Shiba Inu by quander (CC BY 4.0)
- **Three.js** - Amazing 3D library
- **ASCII Effect** - Three.js ASCII rendering

---

**Made with ❤️ by [Zacsluss](https://github.com/Zacsluss)**

[![GitHub stars](https://img.shields.io/github/stars/Zacsluss/ASCII_3D_Animator.svg)](https://github.com/Zacsluss/ASCII_3D_Animator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Zacsluss/ASCII_3D_Animator.svg)](https://github.com/Zacsluss/ASCII_3D_Animator/network)
[![GitHub issues](https://img.shields.io/github/issues/Zacsluss/ASCII_3D_Animator.svg)](https://github.com/Zacsluss/ASCII_3D_Animator/issues)