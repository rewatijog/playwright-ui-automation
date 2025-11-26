// src/tests/e2e.spec.ts
import { test, expect } from '../fixtures/base.fixture';

test.describe('SauceDemo E2E', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(loginPage.page.locator('.title')).toHaveText('Products');
  });

  test('login and add item to cart', async ({ productsPage, page }) => {
    await productsPage.addFirstItemToCart();
    await productsPage.goToCart();
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('checkout flow', async ({ productsPage, page }) => {
    await productsPage.addFirstItemToCart();
    await productsPage.goToCart();

    await page.locator('#checkout').click();
    await page.locator('#first-name').fill('Rewati');
    await page.locator('#last-name').fill('Jog');
    await page.locator('#postal-code').fill('411001');
    await page.locator('#continue').click();

    await expect(page.locator('.summary_info')).toBeVisible();
    await page.locator('#finish').click();
    await expect(page.locator('.complete-header')).toBeVisible();
  });
});
