import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private sidebarBaseLocator: Locator;
    private validationErrors: Locator;
    private continueButton: Locator;
    private alertDanger: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByPlaceholder('E-Mail Address');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.sidebarBaseLocator = page.locator('#column-right');
        this.validationErrors = page.locator('div.text-danger');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.alertDanger = page.locator('#account-register').locator('.alert');
    }

    getSidebarLinkByText(linkText: string): Locator {
        // Locate a sidebar link by its text
        return this.sidebarBaseLocator.getByRole('link', { name: linkText });
    }

    async performLogin(email: string, password: string): Promise<void> {
        // Fill login credentials
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        // Click the login button
        await this.loginButton.click();

        // Validate successful login by checking for the presence of the sidebar login link
        await expect(this.getSidebarLinkByText('My Account')).toBeVisible();
    }

    async expectValidationErrors(expectedErrors: string[]) {
        for (const errorText of expectedErrors) {
            await expect(this.validationErrors.filter({ hasText: errorText })).toBeVisible();
        }
    }

    async fillRegistrationForm(data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        telephone?: string;
        password?: string;
        confirmPassword?: string;
        agreeToPrivacy?: boolean;
    }): Promise<void> {
        // Fill the registration form with provided data
        if (data.firstName) {
            await this.page.getByPlaceholder('First Name').fill(data.firstName);
        }
        if (data.lastName) {
            await this.page.getByPlaceholder('Last Name').fill(data.lastName);
        }
        if (data.email) {
            await this.page.getByPlaceholder('E-Mail').fill(data.email);
        }
        if (data.telephone) {
            await this.page.getByPlaceholder('Telephone').fill(data.telephone);
        }
        if (data.password) {
            await this.page.getByPlaceholder('Password', { exact: true }).fill(data.password);
        }
        if (data.confirmPassword) {
            await this.page.getByPlaceholder('Password Confirm').fill(data.confirmPassword);
        }
        if (data.agreeToPrivacy) {
            await this.page.getByLabel('I have read and agree to the Privacy Policy').check({force: true});
        }
    }

    async submitForm(): Promise<void> {
        // Click the continue button to submit the form
        await this.continueButton.click();
    }

    async expectDuplicateEmailError() {
        await expect(this.alertDanger).toContainText('Warning: E-Mail Address is already registered!');
    }
}