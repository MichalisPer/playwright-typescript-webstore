import { test, expect } from '../fixtures/fixtures';
test('Validate visibility of key home page sections', async ({ pageManager }) => {
    const homePage = pageManager.getHomePage();
    // Navigate to the homepage
    await homePage.navigateTo('https://ecommerce-playground.lambdatest.io/');
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