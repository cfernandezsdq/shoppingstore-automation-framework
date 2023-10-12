import { test } from "@playwright/test";
import { MyAccountPage } from "../pages/MyAccountPage";
import { adminDetails } from "../data/userDetails";

test("My Account using cookie injection and mocking Network request", async ({ page }) => {
    const myAccount = new MyAccountPage(page);
    const loginToken = await myAccount.getLoginToken(adminDetails.username, adminDetails.password);
    await myAccount.mockNetworkRequest();
    await myAccount.goto();
    await myAccount.validateCookie(loginToken);
    await myAccount.goto();
    await myAccount.waitForErrorMessage();
});