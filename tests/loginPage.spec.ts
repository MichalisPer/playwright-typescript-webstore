import { test, expect } from '../fixtures/fixtures';

test('Validate the user is logged in', async ({ pageManager }) => {
  const loginPage = pageManager.getLoginPage();

  // Navigate to login page
  await loginPage.navigateTo(process.env.BASE_URL!);

  await loginPage.clickOnMainNavigationLink('My Account');

  // User should be logged in since the authentication setup has been done
  await expect(loginPage.getSidebarLinkByText('My Account')).toBeVisible();
});
