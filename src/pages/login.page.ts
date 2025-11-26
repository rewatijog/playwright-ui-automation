import { Locator, Page } from '@playwright/test';


export class LoginPage {
readonly page: Page;
readonly usernameInput: Locator;
readonly passwordInput: Locator;
readonly loginBtn: Locator;


constructor(page: Page) {
this.page = page;
this.usernameInput = page.locator('#user-name');
this.passwordInput = page.locator('#password');
this.loginBtn = page.locator('#login-button');
}


async goto() {
await this.page.goto('https://www.saucedemo.com');
}


async login(username: string, password: string) {
await this.usernameInput.fill(username);
await this.passwordInput.fill(password);
await this.loginBtn.click();
}


async isLoggedIn() {
// Example indicator: products page header is visible
return this.page.locator('.title').isVisible();
}
}