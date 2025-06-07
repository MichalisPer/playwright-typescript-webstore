import type { Page } from '@playwright/test'
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';

export class PageManager {
    private basePage!: BasePage;
    private loginPage!: LoginPage;
    private homePage!: HomePage;

    constructor(private page: Page) { }

    // Lazy initialisation of page objects
    getBasePage(): BasePage {
        if (!this.basePage) this.basePage = new BasePage(this.page);
        return this.basePage;
    }

    getLoginPage(): LoginPage {
        if (!this.loginPage) this.loginPage = new LoginPage(this.page);
        return this.loginPage;
    }

    getHomePage(): HomePage {
        if (!this.homePage) this.homePage = new HomePage(this.page);
        return this.homePage;
    }
}