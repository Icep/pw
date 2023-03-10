import { test, expect } from '@playwright/test';
import { Navbar } from '../page-objects/navbar';
import { HomePage } from './../page-objects/home-page';

test.describe('The Playwright Home page', () => {
  test('has title and started link', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHomePage();

    await expect(page).toHaveTitle(/Playwright/);
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL(/.*intro/);
  });

  test('search allow to find and redirect to information on the website ', async ({ page }) => {
    const textToSearch = 'Locate by CSS or XPath';

    const homePage = new HomePage(page);
    const navbar = new Navbar(page);
    await homePage.openHomePage();

    await navbar.search(textToSearch);
    await expect(navbar.searchResults.filter({hasText: textToSearch})).toBeVisible();
    await navbar.searchResults.filter({hasText: textToSearch}).click();
    await expect(page).toHaveURL(/.*locate-by-css-or-xpath/);
    await expect(page.getByRole('heading', { name: 'Locate by CSS or XPath#'})).toBeVisible();
  });

  test('navbar allow to navigate to Docs tab', async ({ page }) => {
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);
    await homePage.openHomePage();
    await navbar.navigateToDocs();
    await expect(page).toHaveURL(/.*intro/);
  });
  test('navbar allow to navigate to API tab', async ({ page }) => {
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);
    await homePage.openHomePage();
    await navbar.navigateToApi(); 
    await expect(page).toHaveURL(/.*api/);
  });
  test('navbar allow to change platform', async ({ page }) => {
    const platformName = 'Java';

    const homePage = new HomePage(page);
    const navbar = new Navbar(page);
    await homePage.openHomePage();
    await navbar.changePlatform(platformName);
    await expect(page.getByRole('button', { name: platformName })).toBeVisible();
  });
  test('navbar allow to navigate to Comunnity tab', async ({ page }) => {
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);
    await homePage.openHomePage();
    await navbar.navigateToCommunity();
    await expect(page).toHaveURL(/.*community\/welcome/);
  });
});
