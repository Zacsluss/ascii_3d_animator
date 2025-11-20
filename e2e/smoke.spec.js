import { test, expect } from '@playwright/test';

test.describe('ASCII 3D Animator - Smoke Tests', () => {
  test('should load the application successfully', async ({ page }) => {
    await page.goto('/');

    // Check that the page title is correct
    await expect(page).toHaveTitle(/ASCII 3D Animator/);

    // Check that the canvas container exists
    const canvasContainer = page.locator('#canvasContainer');
    await expect(canvasContainer).toBeVisible();

    // Check that the sidebar is visible
    const sidebar = page.locator('#sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('should have all main control sections visible', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check theme selector
    const themeSelect = page.locator('#themeSelect');
    await expect(themeSelect).toBeVisible();

    // Check model controls
    const nextModelBtn = page.locator('#nextModel');
    await expect(nextModelBtn).toBeVisible();

    // Check ASCII density slider
    const densitySlider = page.locator('#asciiDensity');
    await expect(densitySlider).toBeVisible();

    // Check lighting section
    const lightingSection = page.getByText('Lighting Controls');
    await expect(lightingSection).toBeVisible();
  });

  test('should be able to switch themes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const themeSelect = page.locator('#themeSelect');

    // Get initial theme
    const initialTheme = await themeSelect.inputValue();

    // Select a different theme
    await themeSelect.selectOption('classicDark');

    // Verify theme changed
    const newTheme = await themeSelect.inputValue();
    expect(newTheme).toBe('classicDark');
    expect(newTheme).not.toBe(initialTheme);

    // Check that ASCII output background changed
    const asciiOutput = page.locator('#asciiOutput');
    await expect(asciiOutput).toBeVisible();
  });

  test('should be able to adjust ASCII density', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const densitySlider = page.locator('#asciiDensity');
    const densityValue = page.locator('#densityValue');

    // Get initial value
    const initialValue = await densityValue.textContent();

    // Move slider
    await densitySlider.fill('1.5');

    // Verify value changed
    const newValue = await densityValue.textContent();
    expect(newValue).not.toBe(initialValue);
  });

  test('should load and display ASCII rendering', async ({ page }) => {
    await page.goto('/');

    // Wait for ASCII output to appear
    const asciiOutput = page.locator('#asciiOutput');
    await expect(asciiOutput).toBeVisible({ timeout: 10000 });

    // Check that ASCII characters are being rendered
    const content = await asciiOutput.textContent();
    expect(content.length).toBeGreaterThan(0);
  });

  test('should have working lighting presets', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find and click a lighting preset button
    const studioPreset = page.getByRole('button', { name: /studio/i });
    await expect(studioPreset).toBeVisible();

    await studioPreset.click();

    // Verify button is now active (has active class)
    await expect(studioPreset).toHaveClass(/active/);
  });

  test('should have functional model switching', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const modelInfo = page.locator('#modelInfo');
    const nextModelBtn = page.locator('#nextModel');

    // Get initial model name
    const initialModel = await modelInfo.textContent();

    // Click next model button
    await nextModelBtn.click();

    // Wait for model to load (give it a few seconds)
    await page.waitForTimeout(3000);

    // Verify model info changed
    const newModel = await modelInfo.textContent();
    expect(newModel).not.toBe(initialModel);
  });

  test('should be responsive and work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that main elements are still visible
    const canvasContainer = page.locator('#canvasContainer');
    await expect(canvasContainer).toBeVisible();

    const sidebar = page.locator('#sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('should have accessibility features', async ({ page }) => {
    await page.goto('/');

    // Check for skip link
    const skipLink = page.getByText(/skip to main content/i);
    await expect(skipLink).toBeVisible();

    // Check ARIA labels on controls
    const themeSelect = page.locator('#themeSelect');
    await expect(themeSelect).toHaveAttribute('aria-label');

    const densitySlider = page.locator('#asciiDensity');
    await expect(densitySlider).toHaveAttribute('aria-label');
  });

  test('should handle errors gracefully', async ({ page }) => {
    // Listen for console errors
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Perform various interactions
    await page.locator('#themeSelect').selectOption('amber');
    await page.locator('#asciiDensity').fill('2.0');
    await page.locator('#nextModel').click();

    // Wait a bit for any errors to appear
    await page.waitForTimeout(2000);

    // Check that no critical errors occurred
    const criticalErrors = errors.filter(
      (err) => err.includes('TypeError') || err.includes('ReferenceError'),
    );
    expect(criticalErrors.length).toBe(0);
  });
});
