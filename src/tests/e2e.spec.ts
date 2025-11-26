import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';


test.describe('SauceDemo E2E', () => {
test('login and add item to cart', async ({ page }) => {
const login = new LoginPage(page);
await login.goto();
await login.login('standard_user', 'secret_sauce');
await expect(page.locator('.title')).toHaveText('Products');


// add first item to cart
const firstAddBtn = page.locator('.inventory_item button').first();
await firstAddBtn.click();
await page.locator('.shopping_cart_link').click();
await expect(page.locator('.cart_item')).toHaveCount(1);
});


test('checkout flow', async ({ page }) => {
const login = new LoginPage(page);
await login.goto();
await login.login('standard_user', 'secret_sauce');


await page.locator('.inventory_item button').first().click();
await page.locator('.shopping_cart_link').click();
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