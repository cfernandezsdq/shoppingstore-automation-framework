import { expect } from "@playwright/test";
import { paymentDetails } from "../data/paymentDetails";

export class PaymentPage{

    constructor(page){
        this.page = page;
        this.discountCode = page.frameLocator("[data-qa='active-discount-container']").locator("[data-qa='discount-code']");
        this.discountCodeInput = page.locator("[data-qa='discount-code-input']");
        this.submitDiscountButton = page.locator("[data-qa='submit-discount-button']");
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]');
        this.cedirCardValidDateInput = page.locator('[data-qa="valid-until"]');
        this.creditCardCVCInput = page.locator('[data-qa="credit-card-cvc"]');
        this.payButton = page.locator('[data-qa="pay-button"]');

    }

    activateDiscount = async () => {
        
        await this.discountCode.waitFor();
        const discountCode = await this.discountCode.innerText();

        //Option 1 for laggy inputs: Using fill() method.
        // await this.discountCodeInput.waitFor();
        // await this.discountCodeInput.fill(discountCode);
        // expect(await this.discountCodeInput).toHaveValue(discountCode);

        //Option 1 for laggy inputs: Slow typing.
        await this.discountCodeInput.focus();
        await this.discountCodeInput.type(discountCode, {delay: 600});
        expect(await this.discountCodeInput.inputValue()).toBe(discountCode);

        await this.submitDiscountButton.waitFor();
        await this.submitDiscountButton.click();
        const discountActiveMessage = this.page.locator("[data-qa='discount-active-message']");
        expect(await discountActiveMessage.innerText()).toBe('Discount activated!');
        
    }

    fillPaymentDetails = async () => {
        await this.creditCardOwnerInput.waitFor();
        await this.creditCardOwnerInput.fill(paymentDetails.card_owner);
        await this.creditCardNumberInput.waitFor();
        await this.creditCardNumberInput.fill(paymentDetails.card_number);
        await this.cedirCardValidDateInput.waitFor()
        await this.cedirCardValidDateInput.fill(paymentDetails.valid_until);
        await this.creditCardCVCInput.waitFor();
        await this.creditCardCVCInput.fill(paymentDetails.card_cvc);
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForURL('/thank-you');
        //await this.page.pause();
    }


}

/*
'[data-qa="credit-card-owner"]'
'[data-qa="credit-card-number"]'
'[data-qa="valid-until"]'
'[data-qa="credit-card-cvc"]'
'[data-qa="pay-button"]'
*/