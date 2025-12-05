import { test, expect } from '@playwright/test';

// End-to-end smoke tests
test.describe('ASCII 3D Animator - Smoke Tests', () => {
  test('should load the application successfully', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/ASCII 3D Animator/);

    // Check main canvas container exists
    const canvasContainer = page.locator('#canvasContainer');
    await expect(canvasContainer).toBeVisible();

    // Check sidebar exists
    const sidebar = page.locator('#sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('should have all main controls visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Theme selector
    const themeSelector = page.locator('#themeSelector');
    await expect(themeSelector).toBeVisible();

    // Density slider
    const densitySlider = page.locator('#densitySlider');
    await expect(densitySlider).toBeVisible();

    // Next model button
    const nextModelBtn = page.locator('#nextModel');
    await expect(nextModelBtn).toBeVisible();
  });

  test('should be able to switch themes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const themeSelector = page.locator('#themeSelector');

    // Get initial theme
    const initialTheme = await themeSelector.inputValue();

    // Select a different theme
    await themeSelector.selectOption('classicDark');

    // Verify theme changed
    const newTheme = await themeSelector.inputValue();
    expect(newTheme).toBe('classicDark');
    expect(newTheme).not.toBe(initialTheme);
  });
});
