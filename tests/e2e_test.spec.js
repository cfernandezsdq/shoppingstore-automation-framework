import { test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../pages/ProductsPage";
import { Navigation } from "../pages/Navigation";
import { Checkout } from "../pages/Checkout";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DeliveryDetailsPage } from "../pages/DeliveryDetailsPage";
import { PaymentPage } from "../pages/PaymentPage"

test("New User @E2E test", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.sortByCheapest();
    await productsPage.sortBySpensive();
    await productsPage.addProductToBasket(0);
    await productsPage.addProductToBasket(1);
    await productsPage.addProductToBasket(2);

    const navigation = new Navigation(page);
    await navigation.goToCheckout();

    const checkout = new Checkout(page);
    await checkout.removeCheapestProduct();
    await checkout.continueToCheckout();

    const loginPage = new LoginPage(page);
    await loginPage.goToSingUpPage();

    const registerPage = new RegisterPage(page);
    const email = uuidv4() + '@test.com';
    const password = uuidv4();
    await registerPage.singUpAsNewUser(email, password);

    const deliveryDetailsPage = new DeliveryDetailsPage(page);
    await deliveryDetailsPage.fillDeliveryDetails();
    await deliveryDetailsPage.saveDeliveryDetails();
    await deliveryDetailsPage.continueToPayment();

    const paymentPage = new PaymentPage(page);
    await paymentPage.activateDiscount();
    await paymentPage.fillPaymentDetails();
});