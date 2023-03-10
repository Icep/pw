import { Locator, Page, ElementHandle } from "@playwright/test";

export class Navbar {
    readonly page: Page;
    readonly docLink: Locator;
    readonly apiLink: Locator;
    readonly communityLink: Locator;
    readonly gitLink: Locator;
    readonly platformDropdown: Locator;
    readonly platformDropdownList: Locator;
    readonly searchbar: Locator;
    readonly searchInput: Locator;
    readonly searchResults: Locator;

    
    constructor (page: Page) {
        this.page = page;
        this.communityLink = page.getByRole('navigation').filter({ hasText: 'PlaywrightDocsAPINode.jsNode.jsPythonJava.NETCommunitySearchK' }).getByRole('link', { name: 'Community' });
        this.docLink = page.getByRole('link', { name: 'Docs' });
        this.apiLink = page.getByRole('navigation').filter({ hasText: 'PlaywrightDocsAPINode.jsNode.jsPythonJava.NETCommunitySearchK' }).getByRole('link', { name: 'API' });
        this.platformDropdown = page.locator('.dropdown--hoverable');
        this.platformDropdownList = page.locator('.dropdown__link');
        this.searchbar = page.getByRole('button', { name: 'Search' });
        this.searchInput = page.getByPlaceholder('Search docs');
        this.gitLink = page.getByRole('link', { name: 'GitHub repository' });
        this.searchResults = page.locator('.DocSearch-Hit');
    }

    async changePlatform (name) {
        await this.platformDropdown.hover();
        await this.platformDropdownList.filter({ hasText: name }).click();
    }

    async navigateToDocs() {
        await this.docLink.click();
    }
    
    async navigateToApi() {
        await this.apiLink.click();
    }
    
    async navigateToCommunity() {
        await this.communityLink.click();
    }

    async search(string) {
        await this.searchbar.click();
        await this.searchInput.clear();
        await this.searchInput.type(string);
    }
}