import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly gitLink: Locator;
    readonly gitLinkStar: Locator;
    
    constructor (page: Page) {
        this.page = page;
        this.getStartedLink = page.getByRole('link', { name: 'Get started' });
        this.gitLink = page.getByRole('link', { name: 'Star microsoft/playwright on GitHub' });
        this.gitLinkStar = page.getByRole('link', { name: '48k+ stargazers on GitHub' });
    }

    async openHomePage () {
        await this.page.goto('https://playwright.dev/');
    }
}