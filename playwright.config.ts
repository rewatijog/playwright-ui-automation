import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
testDir: './src/tests',
timeout: 30 * 1000,
expect: { timeout: 5000 },
fullyParallel: true,
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 2 : undefined,
reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
use: {
actionTimeout: 0,
navigationTimeout: 30 * 1000,
ignoreHTTPSErrors: true,
screenshot: 'only-on-failure',
trace: 'retain-on-failure'
},
projects: [
{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
{ name: 'firefox', use: { ...devices['Desktop Firefox'] } }
]
});