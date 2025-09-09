# Model Optimization Guide

## Current Model Sizes
- 1.glb (Doge): 16MB
- 2.glb (Duck): 6.3MB  
- 3.glb (Rat): 16MB
- alien.glb: 4.9MB
**Total: 43.2MB**

## Optimization Strategies (Keeping 100% Offline)

### 1. Model Compression (Can reduce by 50-70%)
Use Draco compression for GLB files:
- Install gltf-pipeline: `npm install -g gltf-pipeline`
- Compress: `gltf-pipeline -i input.glb -o output.glb -d`

### 2. Reduce Texture Sizes
- Most textures can be reduced to 512x512 or 1024x1024
- Convert to JPEG where transparency isn't needed

### 3. Simplify Geometry
- Use Blender's Decimate modifier
- Target 50% polygon reduction for ASCII rendering

### 4. Remove Unnecessary Data
- Strip unused animations
- Remove vertex colors if not used
- Remove extra UV channels

## Quick Optimization Commands

```bash
# Using gltf-transform (better compression)
npm install -g @gltf-transform/cli

# Optimize all models
gltf-transform optimize 1.glb 1_optimized.glb
gltf-transform optimize 2.glb 2_optimized.glb
gltf-transform optimize 3.glb 3_optimized.glb
gltf-transform optimize alien.glb alien_optimized.glb
```

## Expected Results
- Could reduce total size from 43MB to ~15-20MB
- Faster loading times
- Better performance
- Still 100% offline