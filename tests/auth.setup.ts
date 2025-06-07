
import { test as setup, expect } from '../fixtures/fixtures';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ pageManager, page }) => {
  const loginPage = pageManager.getLoginPage();
  // Perform authentication steps. Replace these actions with your own.
  await loginPage.navigateTo(process.env.BASE_URL!);
  await loginPage.clickOnMainNavigationLink('My Account');
  await loginPage.performLogin(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});