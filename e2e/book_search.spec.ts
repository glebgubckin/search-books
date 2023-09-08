import { test, expect } from '@playwright/test';

test('search and pick book', async ({ page }) => {
  await page.goto('');

  await page.fill('#search', 'js');

  await page.press('#search', 'Enter');

  await page.waitForLoadState('networkidle');

  const firstLink = await page.$('a');

  expect(firstLink).toBeTruthy();

  await firstLink?.click();

  const bookTitle = await page.$('h1');
  const bookCover = await page.$('img');

  expect(bookTitle).toBeTruthy();
  expect(bookCover).toBeTruthy();
});