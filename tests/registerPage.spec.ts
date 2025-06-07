import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from '../pages/LoginPage';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Registration Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach('Navigate to the registration page', async ({ pageManager }) => {
        loginPage = pageManager.getLoginPage();
        // Navigate to the register page
        await loginPage.navigateTo(process.env.BASE_URL!);
        await loginPage.clickOnMainNavigationLink('My Account');
        await loginPage.getSidebarLinkByText('Register').click();
    });

    test('Show validation errors when required fields are empty', async () => {
        await test.step('Submit empty registration form', async () => {
            await loginPage.submitForm();
        });

        await test.step('Validate that the expected error messages are shown', async () => {
            // Validate visibility of key sections
            await loginPage.expectValidationErrors([
                'First Name must be between 1 and 32 characters!',
                'Last Name must be between 1 and 32 characters!',
                'E-Mail Address does not appear to be valid!',
                'Telephone must be between 3 and 32 characters!',
                'Password must be between 4 and 20 characters!',
            ]);
        });
    });

    test('shows error when email is already registered', async () => {
        await loginPage.fillRegistrationForm({
            firstName: 'John',
            lastName: 'Doe',
            email: process.env.LOGIN_EMAIL,
            telephone: '1234567890',
            password: 'Password1',
            confirmPassword: 'Password1',
            agreeToPrivacy: true,
        });

        await test.step('Submit empty registration form', async () => {
            await loginPage.submitForm();
        });

        await test.step('Verify duplicate email error', async () => {
            await loginPage.expectDuplicateEmailError();
        });
    });
});