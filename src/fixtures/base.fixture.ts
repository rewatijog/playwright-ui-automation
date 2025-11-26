// src/fixtures/base.fixture.ts
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';

type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
});

export { expect };
