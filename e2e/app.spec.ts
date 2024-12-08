import { expect, test } from '@playwright/test';

test('loads home on /', async ({ page }) => {
  // // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/');
  await expect(page).toHaveScreenshot('home-full.png');
});
