export class RegisterPage{

    constructor(page){
        this.page = page;
        this.emailImput = page.getByPlaceholder('e-mail');
        this.passwordImput = page.getByPlaceholder('password');
        this.registerButton = page.getByRole('button',{ name: 'Register' });
    }

    singUpAsNewUser = async (email, password) => {
        await this.emailImput.waitFor();
        await this.emailImput.fill(email)
        await this.passwordImput.waitFor();
        await this.passwordImput.fill(password);
        await this.registerButton.waitFor();
        await this.registerButton.click();
    }
}
