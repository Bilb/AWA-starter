import { expect, Page, test } from '@playwright/test';

const breakpoints = [640, 768, 1024, 1280, 1536];
const viewportWidths = breakpoints.flatMap((b) => {
  return [b - 1, b + 1];
});

async function fullPageScreenshot({
  page,
  width,
}: {
  page: Page;
  width?: number;
}) {
  await expect(page).toHaveScreenshot(
    `home-full${width ? `-w${width}px` : ''}.png`,
    {
      fullPage: true,
    }
  );
}

test('loads home on /', async ({ page, isMobile }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/');

  if (!isMobile) {
    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: 800 });
      await fullPageScreenshot({ page, width });
    }
  } else {
    await fullPageScreenshot({ page, width: undefined });
  }
});
