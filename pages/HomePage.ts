import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    getSectionBoxByText(sectionTitle: string) {
        // Locate the section box by its title text
        return this.page.locator('.entry-section').filter({
            has: this.page.locator('h3', { hasText: sectionTitle }),
        });
    }

    async validateVisibilityOfSections(sections: string[] | string): Promise<void> {
        if (typeof sections === 'string') {
            await expect(this.getSectionBoxByText(sections)).toBeVisible();
        } else {
            for (const section of sections) {
                await expect(this.getSectionBoxByText(section)).toBeVisible();
            }
        }
    }
}