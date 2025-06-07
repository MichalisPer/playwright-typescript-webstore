import { test, expect } from '../fixtures/fixtures';

test.describe('Home Page Tests', () => {
    test.beforeEach(async ({ pageManager }) => {
        const basePage = pageManager.getBasePage();
        // Navigate to the register page
        await basePage.navigateTo(process.env.BASE_URL!);
    });
    
    test('Validate visibility of key home page sections', async ({ pageManager }) => {
        const homePage = pageManager.getHomePage();
        // Sections to check
        const sections = [
            'Top Trending Categories',
            'Top Products',
            'Top Collection',
            'From The Blog',
        ];

        // Validate sections visibility
        for (const section of sections) {
            await test.step(`Check visibility of section: ${section}`, async () => {
                await homePage.validateVisibilityOfSections(section);
            });
        }
    });
});