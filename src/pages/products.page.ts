import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly addToCartButtons: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('.inventory_item button');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
  }

  async isAtProductsPage() {
    await this.title.waitFor();
    return this.title.textContent();
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  async addItemByName(name: string) {
    const item = this.page
      .locator('.inventory_item')
      .filter({ hasText: name });
    await item.locator('button').click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getCartBadgeCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.isVisible()) {
      const text = await badge.textContent();
      return Number(text || 0);
    }
    return 0;
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    // SauceDemo values: az, za, lohi, hilo
    await this.sortDropdown.selectOption(value);
  }

  async getAllItemNames() {
    return this.page
      .locator('.inventory_item_name')
      .allTextContents();
  }
}
