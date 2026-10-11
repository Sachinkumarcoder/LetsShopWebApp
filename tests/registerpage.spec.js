const {test, expect}= require('@playwright/test');
const {RegisterPage} = require('../PageObjects/RegisterPage');

test.describe('TS_R01 - Page UI & Layout',{tag: '@regression'}, async () => {

    test('TC_R001 - Verify Register page loads successfully', async ({page}) => {
        const registerPage = new RegisterPage(page);
        const pageStatus = await registerPage.goTo();
        expect(pageStatus.status()).toBe(200);
    });

    test('TC_R002 - Verify all mandatory UI elements are present', async ({page}) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goTo();
        await expect(registerPage.getfirstName()).toBeVisible();
        await expect(registerPage.getlastName()).toBeVisible();
        await expect(registerPage.getemail()).toBeVisible();
        await expect(registerPage.getphoneNumber()).toBeVisible();
        await expect(registerPage.getpassword()).toBeVisible();
        await expect(registerPage.getcomfirmPassword()).toBeVisible();
        await expect(registerPage.getregisterBanner()).toBeVisible();
        await expect(registerPage.getoccupationDropdown()).toBeVisible();
        await expect(registerPage.getcheckout()).toBeVisible();
        await expect(registerPage.getmaleOption()).toBeVisible();
        await expect(registerPage.getfemaleOption()).toBeVisible();
        await expect(registerPage.getalreadyHaveAccountText()).toBeVisible();
        await expect(registerPage.getloginHereText()).toBeVisible();
        await expect(registerPage.getregisterButton()).toBeVisible();
    })

    test('TC_R003 - Verify field placeholder texts', async ({page}) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goTo();
        expect(await registerPage.getFirstNamePlaceholderText()).toBe('First Name');
        expect(await registerPage.getLastNamePlaceholderText()).toBe('Last Name');
        expect(await registerPage.getEmailPlaceholderText()).toBe('email@example.com');
        expect(await registerPage.getPhoneNumberPlaceholderText()).toBe('enter your number');
        expect(await registerPage.getPasswordPlaceholderText()).toBe('Passsword');
        expect(await registerPage.getConfirmPasswordPlaceholderText()).toBe('Confirm Passsword');
    });

    test('TC_R004 - Verify Register button is visible and enabled', async ({page}) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goTo();
        await expect(registerPage.getregisterButton()).toBeEnabled();
        expect(await registerPage.getregisterButton()).toContainText("Register");
        await expect(registerPage.getregisterButton()).toBeVisible();
    });

    test('TC_R005 - Verify top bar contact email and social media icons are displayed', async ({page}) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goTo();
        await expect(registerPage.getFacebookIcon()).toBeVisible();
        await expect(registerPage.getInstagramIcon()).toBeVisible();
        await expect(registerPage.getTwitterIcon()).toBeVisible();
        await expect(registerPage.getYoutubeIcon()).toBeVisible();
        await expect(registerPage.getDummyEmailText()).toContainText("dummywebsite@rahulshettyacademy.com");
    });
});

test.describe('TS_R02 - First Name Field Validation', async () => {
    test('TC_R006 - Verify First Name field accepts valid alphabetic input', async ({page}) => {
        const registerPage = new RegisterPage(page);
        
    })
});

test.describe('TS_R03 - Last Name Field Validation', async () => {
        // In progress
});

test.describe('TS_R04 - Email Field Validation', async () => {
    // In progress
});

test.describe('TS_R05 - Phone Number Field Validation', async () => {
    // In progress
});

test.describe('TS_R06 - Occupation Dropdown Validation', async () => {
    // In progress
});

test.describe('TS_R07 - Gender Selection Validation', async () => {
    // In progress
});

test.describe('TS_R08 - Password & Confirm Password Validation', async () => {
    // In progress
});

test.describe('TS_R09 - Age Confirmation Checkbox', async () => {
    // In progress
});

test.describe('TS_R10 - Register Functionality', async () => {
    // In progress
});

test.describe('TS_R11 - Login Navigation', async () => {
    // In progress
});
