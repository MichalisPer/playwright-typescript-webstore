import { Locator, Page } from "@playwright/test";

export class BasePage {
    private mainNavigationBaseLocator: Locator;
    constructor(protected page: Page) {
        this.mainNavigationBaseLocator = this.page.locator('#main-navigation');
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url, {waitUntil: 'load'});
    }

    async clickOnMainNavigationLink(linkText: string): Promise<void> {
        await this.mainNavigationBaseLocator.getByRole('button', { name: linkText }).click();
    }
}