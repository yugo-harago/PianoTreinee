import { browser, by, element } from 'protractor';

export class AppPage {
	async navigateTo(): Promise<unknown> {
		return browser.get(browser.baseUrl);
	}

	async getHeaderBrandName(): Promise<string> {
		return element(by.id('brand-name')).getText();
	}
}
