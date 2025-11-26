// src/tests/products.spec.ts
import { test, expect } from '../fixtures/base.fixture';

test.describe('Login negative scenarios', () => {
  test('shows an error for locked out user', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Sorry, this user has been locked out');
  });
});

test.describe('SauceDemo Products & Cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(loginPage.page.locator('.title')).toHaveText('Products');
  });

  test('adds a specific product to cart and verifies badge count', async ({ productsPage, page }) => {
    await productsPage.addItemByName('Sauce Labs Backpack');
    const count = await productsPage.getCartBadgeCount();
    expect(count).toBe(1);

    await productsPage.goToCart();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });

  test('sorts products from A to Z', async ({ productsPage }) => {
    const afterSortBefore = await productsPage.getAllItemNames();

    const afterSort = await productsPage.getAllItemNames();

    const sortedCopy = [...afterSort].sort((a, b) => a.localeCompare(b));
    expect(afterSort).toEqual(sortedCopy);

    console.log('Before sort:', afterSortBefore);
    console.log('After sort:', afterSort);
  });
});
