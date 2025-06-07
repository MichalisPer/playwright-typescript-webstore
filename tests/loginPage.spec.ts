import { test, expect } from '../fixtures/fixtures';

test.describe('Login Page Tests', () => {
    test.beforeEach(async ({ pageManager }) => {
        const basePage = pageManager.getBasePage();
        // Navigate to the register page
        await basePage.navigateTo(process.env.BASE_URL!);
    });

    test('Validate the user is logged in', async ({ pageManager }) => {
        const loginPage = pageManager.getLoginPage();

        // Navigate to login page
        await loginPage.navigateTo(process.env.BASE_URL!);

        await loginPage.clickOnMainNavigationLink('My Account');

        // User should be logged in since the authentication setup has been done
        await expect(loginPage.getSidebarLinkByText('My Account')).toBeVisible();
    });
});
