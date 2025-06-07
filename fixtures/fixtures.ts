import { test as base } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

type MyFixtures = {
    pageManager: PageManager;
}

export const test = base.extend<MyFixtures>({
    pageManager: async ({ page }, use) => {
        await use(new PageManager(page));
    },
});

export { expect } from '@playwright/test';