import * as nodeFetch from "node-fetch";

export class MyAccountPage{
    constructor(page){
        this.page = page;
        this.apiLoginUrl = 'http://localhost:2221/api/login';
        this.errorMessage = page.locator('[data-qa="error-message"]');
    }

    goto = async () =>  {
        await this.page.goto('/my-account');
    }

    mockNetworkRequest = async () => {
        await this.page.route('**/api/user**', async (route,request) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({message: 'PLAYWRIGHT ERROR FROM MOCKING'}),
            });
        });
    }

    getLoginToken = async (username,password) =>  {
        const response = await nodeFetch(this.apiLoginUrl, {
            method: "POST",
            body: JSON.stringify({"username": username, "password": password}),
        });
        if(response.status !== 200){
            console.log('Status code: ', await response.status);
            throw new Error("An error occured trying to retrieve the login token");
        }
        console.log('Status code: ', await response.status);
        const body = await response.json();
        return body.token;
    }

    validateCookie = async (loginToken) => {
        await this.page.evaluate(([loginTokenInsideBrowserCode]) => {
            document.cookie = "token=" + loginTokenInsideBrowserCode;
        },[loginToken]);
    }

    waitForErrorMessage = async () => {
        await this.errorMessage.waitFor();
        
    }



}