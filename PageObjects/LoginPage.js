class LoginPage {

    constructor (page) {

        // page object
        this.page = page;

        // URL
        this.url = 'https://rahulshettyacademy.com/client/#/auth/login';
        this.loginInvalidEmailPayload = {userEmail: " 'OR '1'='1", userPassword: "Sample@123"};
        this.loginInvalidPasswordPayload = {userEmail: "sample123abc@gmail.com", userPassword: " OR '1'='1"};

        // -- Locators (TS_01 - Page UI & Layout) --
        this.FirstbannerHeading = this.page.getByText("We Make Your Shopping Simple");
        this.SecondbannerHeading = this.page.getByText("Rahul Shetty Academy");
        this.loginHeading = this.page.getByRole('heading', {name: 'Log in'});
        this.bottonContent = this.page.getByRole('heading', {name: 'Why People Choose Us?'});
        this.bannerRegisterButton = this.page.getByRole('link', {name: 'Register'});

        // -- Locator (TS_02 - Email Field Validation) --
        this.userEmail = this.page.locator("#userEmail");
        this.incorrectEmailMessage = this.page.getByText('*Enter Valid Email');
        this.emptyEmailMessage = this.page.getByText('*Email is required');

        // -- Locator(TS_03 - Password Field Validation) --
        this.userPassword = this.page.locator("#userPassword");
        this.incorrectPasswordMessage = this.page.getByText('*Password is required');

        // -- Locator(TS_04 - Login Functionality) --
        this.loginButton = this.page.locator("#login");

        // -- Locator(TS_03 - Error message Locator)
        this.errorMessage = this.page.getByText('Incorrect email or password.');

        // Locator (TS_05 - Forgot Password Link) --
        this.forgotPasswordLink = this.page.locator(".forgot-password-link");

        // Locator (TS_06 - Register Navigation) --
        this.registerLink = this.page.getByText("Register here");

        // Locator (TS_05 - Forget Password Page Locators) -- 
        this.forgotFiledEmail = this.page.getByPlaceholder('Enter your email address');
        this.forgetPasswordHeading = this.page.getByText('Enter New Password');
        this.forgotPasswordField = this.page.getByPlaceholder('Passsword', {exact: true});
        this.confirmPasswordField = this.page.locator("#confirmPassword");
        this.saveNewPassword = this.page.getByRole('button', {name: "Save New Password"});
    }

    // -- Actions --
    async goTo(){
        return await this.page.goto(this.url);
    }

    async enterEmail(email){
        await this.userEmail.fill(email);
    }

    async enterPassword(password){
        await this.userPassword.fill(password);
    }

    async clickLogin(){
        await this.loginButton.click();
    }

    getFirstBnnerHeadingVisibility(){
        return this.FirstbannerHeading;
    }

    getSecondBnnerHeadingVisibility(){
        return this.SecondbannerHeading;
    }

    getloginHeadingVisibility(){
        return this.loginHeading;
    }

    getbottonContentVisibility(){
        return this.bottonContent;
    }

    getbannerRegisterButtonVisibility(){
        return this.bannerRegisterButton;
    }

    getuserEmailFieldVisibility(){
        return this.userEmail;
    }

    getuserPasswordFieldVisibility(){
        return this.userPassword
    }

    getloginButtonVisibility(){
        return this.loginButton;
    }

    getforgotPasswordLinkVisibility(){
        return this.forgotPasswordLink;
    }

    getregisterLinkVisibility(){
        return this.registerLink
    }

    async login(email, password){
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    getincorrectEmailMessage(){
        return this.incorrectEmailMessage;
    }

    getemptyEmailMessage(){
        return this.emptyEmailMessage;
    }

    getincorrectPasswordMessage(){
        return this.incorrectPasswordMessage;
    }

    geterrorMessage(){
        return this.errorMessage;
    }

    getforgotFiledEmail(){
        return this.forgotFiledEmail;
    }

    getforgetPasswordHeading(){
        return this.forgetPasswordHeading;
    }

    getforgotPasswordField(){
        return this.forgotPasswordField;
    }

    getconfirmPasswordField(){
        return this.confirmPasswordField;
    }

    getsaveNewPassword(){
        return this.saveNewPassword;
    }

    async clickRegisterLink(){
        this.registerLink.click();
    }

    async clickBannerRegisterButton(){
        this.bannerRegisterButton.click();
    }

    async clickForgotPasswordLink(){
        return await this.forgotPasswordLink.click();
    }

    async loginWithEnter(email, password){
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.userPassword.press('Enter');
    }

    getLoginInvalidEmailPayload(){
        return this.loginInvalidEmailPayload;
    }

    getloginInvalidPasswordPayload(){
        return this.loginInvalidPasswordPayload;
    }
}

module.exports = { LoginPage };