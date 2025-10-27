# Contributing to ASCII 3D Animator

Thank you for your interest in contributing to ASCII 3D Animator! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project follows a professional and respectful code of conduct. We expect all contributors to:

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0
- **Git**
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/ASCII_3D_Animator.git
cd ASCII_3D_Animator
```

3. Add upstream remote:

```bash
git remote add upstream https://github.com/Zacsluss/ASCII_3D_Animator.git
```

## Development Setup

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:8000`

### Verify Setup

Run the full validation suite:

```bash
npm run validate
```

This runs linting, formatting checks, and tests.

## Project Structure

```
ASCII_3D_Animator/
├── js/                      # Source modules
│   ├── constants.js         # Configuration
│   ├── lighting.js          # Lighting system
│   ├── models.js            # Model management
│   ├── animation.js         # Animation system
│   ├── ascii.js             # ASCII effect
│   ├── ui.js                # UI management
│   └── app.js               # Main application
├── __tests__/               # Unit tests
├── __mocks__/               # Jest mocks
├── lib/                     # Third-party libraries
├── index.html               # Main HTML file
├── main.css                 # Styles
└── package.json             # NPM configuration
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture documentation.

## Development Workflow

### 1. Create a Branch

Always create a feature branch from `main`:

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or improvements

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add JSDoc comments to all functions
- Update tests as needed
- Update documentation if applicable

### 3. Test Your Changes

Run the full test suite:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

### 4. Lint and Format

Before committing, ensure code passes linting and formatting:

```bash
npm run lint:fix    # Auto-fix linting issues
npm run format      # Auto-format code
```

### 5. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: Add custom lighting preset editor

- Implement preset editing UI
- Add save/load preset functionality
- Update tests for preset manager
- Update documentation"
```

**Commit Message Format:**

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Coding Standards

### JavaScript Style

- **ES6 Modules** - Use `import`/`export`
- **const/let** - No `var`
- **Arrow Functions** - Prefer arrow functions for callbacks
- **Template Literals** - Use backticks for string interpolation
- **Destructuring** - Use where appropriate
- **Async/Await** - Prefer over raw promises

### JSDoc Comments

All functions must have JSDoc comments:

```javascript
/**
 * Load a 3D model by name
 * @param {string} modelName - Name of the model to load
 * @returns {Promise<Object>} Promise that resolves with model data
 * @throws {Error} If model config not found
 */
async loadModel(modelName) {
  // implementation
}
```

### Naming Conventions

- **Classes:** PascalCase (`LightingManager`, `AsciiAnimatorApp`)
- **Functions:** camelCase (`loadModel`, `setIntensity`)
- **Constants:** UPPER_SNAKE_CASE (`DEFAULT_SCALE`, `MAX_DISTANCE`)
- **Private members:** Prefix with `_` (if needed)
- **Config objects:** Use descriptive names (`CONFIG`, `LIGHTING_PRESETS`)

### File Organization

- One class per file
- Group related functionality
- Keep files under 500 lines when possible
- Extract reusable utilities

### Error Handling

Always handle errors appropriately:

```javascript
try {
  const result = await someAsyncOperation();
  return result;
} catch (error) {
  console.error('Operation failed:', error);
  throw new Error('Descriptive error message');
}
```

### Accessibility

- Add ARIA labels to all interactive elements
- Ensure keyboard navigation works
- Use semantic HTML
- Add `role` attributes where appropriate
- Use `aria-live` for dynamic content

## Testing Guidelines

### Test Structure

```javascript
describe('ModuleName', () => {
  let instance;

  beforeEach(() => {
    instance = new ModuleName();
  });

  describe('methodName', () => {
    test('should do something specific', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = instance.methodName(input);

      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### Test Coverage

- Aim for **70%+ coverage** on all metrics
- Test happy paths AND edge cases
- Test error handling
- Mock external dependencies (Three.js, DOM)

### What to Test

**DO test:**
- Business logic
- State management
- Error handling
- Edge cases
- Public API methods

**DON'T test:**
- Third-party libraries (Three.js)
- Browser APIs
- Simple getters/setters
- Trivial code

### Running Tests

```bash
npm test                 # Run all tests once
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

## Pull Request Process

### Before Submitting

1. ✅ All tests pass (`npm test`)
2. ✅ Code is linted (`npm run lint`)
3. ✅ Code is formatted (`npm run format`)
4. ✅ Full validation passes (`npm run validate`)
5. ✅ Changes are documented
6. ✅ Commit messages are descriptive

### PR Title

Use the same format as commit messages:

```
feat: Add custom lighting preset editor
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Tests pass
- [ ] Code is linted and formatted
- [ ] Documentation updated
- [ ] No breaking changes (or documented if necessary)
```

### Review Process

1. Automated checks run (GitHub Actions)
2. Maintainers review code
3. Address feedback
4. Once approved, maintainers will merge

### CI Checks

All PRs must pass:
- ✅ ESLint checks
- ✅ Prettier formatting
- ✅ Jest tests
- ✅ Coverage threshold

## Reporting Issues

### Bug Reports

Use the bug report template and include:

1. **Description** - Clear description of the bug
2. **Steps to Reproduce**
   - Step 1
   - Step 2
   - Step 3
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Environment**
   - Browser and version
   - Operating system
   - Device (if mobile)
6. **Screenshots** - If applicable
7. **Console Errors** - Any error messages

### Feature Requests

Use the feature request template and include:

1. **Problem Statement** - What problem does this solve?
2. **Proposed Solution** - How should it work?
3. **Alternatives Considered** - Other approaches
4. **Additional Context** - Mockups, examples, etc.

## Development Tips

### Testing Changes Locally

```bash
# Start server
npm start

# In another terminal, run tests in watch mode
npm run test:watch
```

### Debugging

Use browser DevTools:
- Set breakpoints in source files
- Use `console.log` for quick debugging (remove before committing)
- Check Network tab for model loading issues

### Performance Profiling

Use Chrome DevTools Performance tab to profile:
- Frame rate
- JavaScript execution time
- Memory usage

### Adding New Models

1. Place `.glb` or `.gltf` file in root directory
2. Add configuration to `js/constants.js`:

```javascript
MODELS: {
  NAMES: ['duck', 'rat', 'doge', 'alien', 'yourmodel'],
  CONFIGS: {
    yourmodel: {
      path: './yourmodel.glb',
      scaleMultiplier: 5.0,
      preferredAnimation: 'walk'
    }
  }
}
```

### Adding New Lighting Presets

Add preset to `js/constants.js`:

```javascript
LIGHTING: {
  PRESETS: {
    yourpreset: {
      main: 10.0,
      ambient: 0.3,
      red: 5.0,
      blue: 5.0,
      spotlight: 7.0
    }
  }
}
```

Update UI button in `index.html` and `js/ui.js`.

## Questions?

- Open an issue with the "question" label
- Check existing issues and discussions
- Read [ARCHITECTURE.md](ARCHITECTURE.md) for technical details

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to ASCII 3D Animator!**
