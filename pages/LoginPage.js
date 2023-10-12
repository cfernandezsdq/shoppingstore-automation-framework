export class LoginPage {

    constructor(page){
        this.page = page;
        this.goToSignUpPageButton = page.locator("[data-qa='go-to-signup-button']");
    }

    goToSingUpPage = async () => {
        await this.goToSignUpPageButton.waitFor();
        await this.goToSignUpPageButton.click();
        await this.page.waitForURL(/\/signup/,{timeout:3000});
    }
}