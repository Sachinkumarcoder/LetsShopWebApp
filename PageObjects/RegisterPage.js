class RegisterPage{

    constructor(page)
    {

        this.url = "https://rahulshettyacademy.com/client/#/auth/register";

        this.page = page;
        this.firstName = this.page.locator("#firstName");
        this.lastName = this.page.locator("#lastName");
        this.email = this.page.locator("#userEmail");
        this.phoneNumber = this.page.locator("#userMobile");
        this.password = this.page.locator("#userPassword");
        this.comfirmPassword = this.page.locator("#confirmPassword");
        this.registerBanner = this.page.getByText("Register");
        this.occupationDropdown = this.page.locator(".custom-select");
        this.checkout = this.page.locator("[type='checkbox']");
        this.maleOption = this.page.locator("[value='Male']");
        this.femaleOption = this.page.locator("[value='Female']");
        this.registerButton = this.page.locator(".login");
        this.alreadyHaveAccountText = this.page.getByText("Already have an account? ");
        this.loginHereText = this.page.getByText("Login here");

        this.dummyEmail = this.page.getByRole('link', { name: 'dummywebsite@rahulshettyacademy.com' });

        // icons locators
        this.facebookIcon = this.page.locator("//i[@class='fa fa-facebook']");
        this.instagramIcon = this.page.locator("//i[@class='fa fa-instagram']");
        this.twitterIcon = this.page.locator("//i[@class='fa fa-twitter']");
        this.youtubeIcon = this.page.locator("//i[@class='fa fa-youtube']");
    }

    async goTo(){
        await this.url.goto();
    }

    getfirstName(){
        return this.firstName;
    } 

    enterAlphanumericFirstName(){
        
    }

    getlastName(){
        return this.lastName;
    }

    getemail(){
        return this.email;
    }

    getphoneNumber(){
        return this.phoneNumber;
    }

    getpassword(){
        return this.password;
    }

    getcomfirmPassword(){
        return this.comfirmPassword;
    }

    getregisterBanner(){
        return this.registerBanner;
    }

    getoccupationDropdown(){
        return this.occupationDropdown;
    }

    getcheckout(){
        return this.checkout;
    }

    getmaleOption(){
        return this.maleOption;
    }

    getfemaleOption(){
        return this.femaleOption;
    }

    getalreadyHaveAccountText(){
        return this.alreadyHaveAccountText;
    }

    getloginHereText(){
        return this.loginHereText;
    }

    getregisterButton(){
        return this.registerButton;
    }

    async getFirstNamePlaceholderText(){
        return await this.getfirstName().getAttribute('placeholder');
    }

    async getLastNamePlaceholderText(){
        return await this.getlastName().getAttribute('placeholder');
    }

    async getEmailPlaceholderText(){
        return await this.getemail().getAttribute('placeholder');
    }

    async getPhoneNumberPlaceholderText(){
        return await this.getphoneNumber().getAttribute('placeholder');
    }

    async getPasswordPlaceholderText(){
        return await this.getpassword().getAttribute('placeholder');
    }

    async getConfirmPasswordPlaceholderText(){
        return await this.getcomfirmPassword().getAttribute('placeholder');
    }

    async getRegisterButtonText(){
        return await this.getregisterButton().textContent();
    }

    getFacebookIcon(){
        return this.facebookIcon;
    }

    getInstagramIcon(){
        return this.instagramIcon;
    }

    getTwitterIcon(){
        return this.twitterIcon;
    }

    getYoutubeIcon(){
        return this.youtubeIcon;
    }

    async getDummyEmailText(){
        return await this.dummyEmail.textContent()
    }
}

module.exports = { RegisterPage };