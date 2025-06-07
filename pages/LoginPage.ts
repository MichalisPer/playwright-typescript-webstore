import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private sidebarBaseLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByPlaceholder('E-Mail Address');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.sidebarBaseLocator = page.locator('#column-right');
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
}