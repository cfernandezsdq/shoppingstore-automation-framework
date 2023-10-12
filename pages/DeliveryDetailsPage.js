import { expect } from "@playwright/test";
import { deliveryDetails as userAddress } from "../data/deliveryDetails"
export class DeliveryDetailsPage{
    constructor(page){
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First name');
        this.lastNameInput = page.getByPlaceholder('Last name');
        this.streetInput = page.getByPlaceholder('Street');
        this.postCodeInput = page.getByPlaceholder('Post code');
        this.cityInput = page.getByPlaceholder('City');
        this.countryDropDown = page.locator("[data-qa='country-dropdown']");
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' });
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' });
        this.savedAddressContainer = page.locator("[data-qa='saved-address-container']");
        this.savedAddressFirstName = page.locator("[data-qa='saved-address-firstName']");
        this.savedAddressLastName = page.locator("[data-qa='saved-address-lastName']");
        this.savedAddressStreet = page.locator("[data-qa='saved-address-street']");
        this.savedAddressPostCode = page.locator("[data-qa='saved-address-postcode']");
        this.savedAddressCity = page.locator("[data-qa='saved-address-city']");
        this.savedAddressCountry = page.locator("[data-qa='saved-address-country']");
    }

    fillDeliveryDetails = async () => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(userAddress.first_name);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(userAddress.last_name);
        await this.streetInput.waitFor();
        await this.streetInput.fill(userAddress.street);
        await this.postCodeInput.waitFor();
        await this.postCodeInput.fill(userAddress.post_code);
        await this.cityInput.waitFor();
        await this.cityInput.fill(userAddress.city);
        await this.countryDropDown.waitFor();
        await this.countryDropDown.selectOption(userAddress.country);
    }

    saveDeliveryDetails = async () => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count();
        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();
        await this.savedAddressContainer.waitFor()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1);
        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue());
        
        await this.savedAddressLastName.first().waitFor()
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue());

        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue());

        await this.savedAddressPostCode.first().waitFor()
        expect(await this.savedAddressPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue());

        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue());

        await this.savedAddressCountry.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropDown.inputValue());
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor();
        await this.continueToPaymentButton.click();
        await this.page.waitForURL('/payment');
    }
}