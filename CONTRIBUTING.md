# Contributing to ASCII 3D Animator

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

Be respectful, constructive, and professional. We're all here to learn and improve.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Node.js 18+ (for running tests and generating documentation)
- Git

### Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ascii_3d_animator.git
   cd ascii_3d_animator
   ```

3. **Install dependencies** (for testing only)
   ```bash
   npm install
   ```

4. **Open the project**
   - Simply open `index.html` in your browser
   - Or use a local server: `python -m http.server 8000`

## Development Workflow

### Project Structure

```
ascii_3d_animator/
├── js/
│   ├── app.js          # Main application coordinator
│   ├── ui.js           # UI management
│   ├── models.js       # 3D model loading
│   ├── ascii.js        # ASCII conversion engine
│   ├── animation.js    # Animation control
│   ├── lighting.js     # Lighting system
│   ├── constants.js    # Configuration
│   └── utils.js        # Utility functions
├── lib/                # Three.js library files
├── tests/              # Vitest unit tests
├── index.html          # Main HTML file
├── main.css            # Styles
└── models/             # 3D model files (.glb)
```

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow the existing code style
   - Add JSDoc comments to all functions

3. **Test your changes**
   ```bash
   npm test                # Run unit tests
   npm run test:coverage   # Check coverage
   ```

4. **Test in browser**
   - Open `index.html` and verify everything works
   - Test on multiple browsers if possible
   - Check console for errors

## Code Standards

### JavaScript Style

- **Use ES6+ features** (modules, arrow functions, const/let)
- **No console.log statements** in production code
- **Use meaningful variable names** (`modelName`, not `mn`)
- **Follow existing patterns** (Manager pattern, dependency injection)

### JSDoc Documentation

All functions must have JSDoc comments:

```javascript
/**
 * Set ASCII density
 * @param {number} scale - The ASCII scale/density value
 */
setAsciiDensity(scale) {
  this.asciiManager.setScale(scale);
}
```

### Code Organization

- **One class per file**
- **Manager pattern** for subsystems (LightingManager, ModelManager, etc.)
- **Constants** go in `js/constants.js`
- **Utilities** go in `js/utils.js`

### Security Best Practices

- **Never use `innerHTML`** with user input → Use `textContent` or `createElement`
- **Validate file uploads** before processing
- **No `eval()` or `Function()` constructors**
- **Sanitize all user inputs**

## Testing Guidelines

### Writing Tests

- Tests go in the `tests/` directory
- Use descriptive test names
- Test edge cases and error conditions
- Aim for 60%+ code coverage

### Test Example

```javascript
import { describe, it, expect } from 'vitest';
import { validateFileSize } from '../js/utils.js';

describe('validateFileSize', () => {
  it('should return true for files within size limit', () => {
    const file = { size: 5 * 1024 * 1024 }; // 5MB
    expect(validateFileSize(file, 10)).toBe(true);
  });

  it('should return false for files exceeding size limit', () => {
    const file = { size: 15 * 1024 * 1024 }; // 15MB
    expect(validateFileSize(file, 10)).toBe(false);
  });
});
```

### Running Tests

```bash
npm test                 # Run all tests
npm run test:ui          # Open test UI in browser
npm run test:coverage    # Generate coverage report
```

## Submitting Changes

### Before Submitting

1. ✅ Run tests: `npm test`
2. ✅ Check browser functionality
3. ✅ Update documentation if needed
4. ✅ Verify no console errors
5. ✅ Ensure code follows style guidelines

### Pull Request Process

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add feature: brief description"
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

### PR Description Template

```markdown
## What does this PR do?
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tests pass locally
- [ ] Tested in browser (Chrome/Firefox/Safari)
- [ ] Added new tests for new features

## Screenshots (if applicable)
[Add screenshots of UI changes]
```

## Questions?

- Open an issue on GitHub
- Check existing issues first
- Be specific about the problem or suggestion

## Recognition

Contributors will be added to the project README. Thank you for helping make this project better! 🎉
