import { isDesktopViewport } from "../utils/isDesktopViewport";

export class Navigation {

    constructor(page){
        this.page = page;
        this.headerBasketCount = page.locator("[data-qa='header-basket-count']");
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' });
        this.myAccountLink = page.getByRole('link', { name: 'My Account' });
        this.artLink = page.getByRole('link', { name: 'Art' });
        this.mobileBurgerButton = page.locator("[data-qa='burger-button']");
    }

    goToCheckout = async () => {
        if (!isDesktopViewport(this.page)){
            await this.mobileBurgerButton.waitFor();
            await this.mobileBurgerButton.click();
        }
        await this.checkoutLink.waitFor();
        await this.checkoutLink.click();
        await this.page.waitForURL('/basket');
    }

    goToMyAccout = async () => {
        await this.myAccountLink.waitFor();
        await this.myAccountLink.click();
        await this.page.waitForURL('/my-account');
    }

    goToArt = async () => {
        await this.artLink.waitFor();
        await this.artLink.click();
        await this.page.waitForURL('/');
    }

    getBasketCount = async () => {
        await this.headerBasketCount.waitFor();
        const textCount = await this.headerBasketCount.innerText();
        return parseInt(textCount,10);
      }
}