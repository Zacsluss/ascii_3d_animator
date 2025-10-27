# Architectural Decision Records (ADRs)

This directory contains records of architectural decisions made during the development of the ASCII 3D Animator project.

## What is an ADR?

An Architectural Decision Record (ADR) captures an important architectural decision made along with its context and consequences. ADRs help future developers understand why certain choices were made.

## Format

Each ADR follows this structure:
- **Title:** Short noun phrase describing the decision
- **Status:** Proposed, Accepted, Deprecated, or Superseded
- **Context:** What forces are at play? What's the problem?
- **Decision:** What was chosen and why?
- **Consequences:** What are the positive and negative outcomes?

## Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [0001](0001-use-manager-pattern-for-architecture.md) | Use Manager Pattern for Architecture | Accepted | 2024-09-01 |
| [0002](0002-use-vanilla-javascript-no-framework.md) | Use Vanilla JavaScript (No Framework) | Accepted | 2024-09-01 |
| [0003](0003-bundle-libraries-locally-for-offline-first.md) | Bundle Libraries Locally for Offline-First | Accepted | 2024-09-01 |

## Key Architectural Principles

Based on these ADRs, the project follows these principles:

1. **Simplicity over Complexity** - No build step, no framework, just ES6 modules
2. **Offline-First** - Everything bundled locally, works without internet
3. **Separation of Concerns** - Manager pattern with clear responsibilities
4. **Testability** - Dependency injection enables isolated testing
5. **Performance** - Direct DOM manipulation for 60 FPS rendering
6. **Maintainability** - Clear module boundaries, JSDoc documentation

## Creating New ADRs

When making significant architectural decisions:

1. Copy the ADR template from 0001
2. Number sequentially (0004, 0005, etc.)
3. Fill in all sections thoroughly
4. Update this README index
5. Reference related ADRs
6. Commit with descriptive message

## Further Reading

- [ADR GitHub Organization](https://adr.github.io/)
- [Michael Nygard's ADR Article](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
