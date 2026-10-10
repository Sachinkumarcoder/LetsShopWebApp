const {test, expect}= require('@playwright/test');
const {LoginPage} = require('../PageObjects/LoginPage');

test.describe("TS_01 - Verify all UI elements load correctly on the Login page", () => {

    test('TC_001 - Verify Login page loads successfully', async ({page}) => {
        const loginPage = new LoginPage(page);
        const pageStatus = await loginPage.goTo();
        expect(pageStatus.status()).toBe(200);
    });

    test('TC_002 - Verify all mandatory UI elements are present', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await expect(loginPage.getFirstBnnerHeadingVisibility()).toHaveText('We Make Your Shopping Simple');
        await expect(loginPage.getloginHeadingVisibility()).toBeVisible();
        await expect(loginPage.getbottonContentVisibility()).toBeVisible();
        await expect(loginPage.getbannerRegisterButtonVisibility()).toBeVisible();
        await expect(loginPage.getuserEmailFieldVisibility()).toBeVisible();
        await expect(loginPage.getuserPasswordFieldVisibility()).toBeVisible();
        await expect(loginPage.getloginButtonVisibility()).toBeVisible();
        await expect(loginPage.getforgotPasswordLinkVisibility()).toBeVisible();
        await expect(loginPage.getregisterLinkVisibility()).toBeVisible();
    });

    test('TC_003 - Verify Log in heading text and styling', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
       await expect(loginPage.getloginHeadingVisibility()).toHaveCSS('color', 'rgb(150, 22, 31)');
       await expect(loginPage.getloginHeadingVisibility()).toHaveCSS('font-weight', '700');
    });

    test('TC_004 - Verify Email field placeholder text', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        const emailPLaceholderValue= await loginPage.getuserEmailFieldVisibility().getAttribute('placeholder');
        expect(emailPLaceholderValue).toBe('email@example.com');
    });

    test('TC_005 - Verify Password field placeholder text', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        const passwordPlaceholderValue = await loginPage.getuserPasswordFieldVisibility().getAttribute('placeholder');
        expect(passwordPlaceholderValue).toBe('enter your passsword');
    });

    test('TC_006 - Verify Login button is visible and enabled', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await expect(loginPage.getloginButtonVisibility()).toBeVisible();
        await expect(loginPage.getloginButtonVisibility()).toBeEnabled();
    });

    test('TC_007 - Verify banner text and Register button on left panel', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await expect(loginPage.getbannerRegisterButtonVisibility()).toBeVisible();
        await expect(loginPage.getFirstBnnerHeadingVisibility()).toHaveText('We Make Your Shopping Simple');
        await expect(loginPage.getSecondBnnerHeadingVisibility()).toBeVisible();
        await expect(loginPage.getSecondBnnerHeadingVisibility()).toHaveCSS('color', 'rgb(150, 22, 31)');
        
    });
});

test.describe('TS_02 - Email Field Validation', async () => {

    test('TC_008 - Verify login with valid email and valid password', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('sample123abc@gmail.com', 'Sample@123');
        await expect(loginPage.page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
    });

    test('TC_009 - Verify Email field accepts valid email format', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.enterEmail('sample123abc@gmail.com');
        await expect(loginPage.getuserEmailFieldVisibility()).toHaveValue(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    test('TC_010 - Verify error on invalid email format', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        // loginPage.enterEmail('sample123abc@@gmail.com');
        // loginPage.getuserEmailFieldVisibility().press('Enter');
        await loginPage.login('sample123abc@@gmail.com', 'Sample@123');
        await expect(loginPage.getincorrectEmailMessage()).toBeVisible();
    });

    test('TC_011 - Verify error on empty Email field', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        // loginPage.enterEmail('');
        // loginPage.getuserEmailFieldVisibility().press('Enter');
        await loginPage.login('', 'Sample@123');
        await expect(loginPage.getemptyEmailMessage()).toBeVisible();
    });

    test('TC_012 - Verify Email field with leading/trailing spaces', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('   sample123abc@gmail.com   ', 'Sample@123');
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
    });

    test('TC_013 - Verify Email field with special characters/SQL injection string', async ({page, request}) => {
        //  Using API
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        const response = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data: loginPage.getLoginInvalidEmailPayload(),
            });

        expect(response.status()).toBe(400);
    });

    test('TC_014 - Verify maximum character limit on Email field', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login(`${'a'.repeat(300)}@gmail.com`, 'Sample@123');
        await expect(loginPage.getincorrectEmailMessage()).toBeVisible();
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/auth/login');
    });
});

test.describe('TS_03 - Password Field Validation', async () => {

    test('TC_015 - Verify Password field masks entered characters', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await expect(loginPage.getuserPasswordFieldVisibility()).toHaveAttribute('type', 'password');
    });

    test('TC_016 - Verify error on empty Password field', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('sample123abc@gmail.com', '');
        await expect(loginPage.getincorrectPasswordMessage()).toBeVisible();
    });

    test('TC_017 - Verify login with incorrect password', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('sample123abc@gmail.com', 'tEST2223');
        await expect(loginPage.geterrorMessage()).toContainText("Incorrect email or password.");
    });

    test('TC_018 - Verify Password field with special characters/SQL injection string', async ({page, request}) => {
        // Using API
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        const response = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data: loginPage.getloginInvalidPasswordPayload(),
            });

        expect(response.status()).toBe(400);
    })

    test('TC_019 - Verify Password field character limit', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('sample123abc@gmail.com', `Test${'a'.repeat(300)}`);
        await expect(loginPage.geterrorMessage()).toContainText('Incorrect email or password.');
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/auth/login');
    });
});

test.describe('TS_04 - Login Functionality', async () => {

    test('TC_020 - Verify both Email and Password fields empty on Login click', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('', '');
        await expect(loginPage.getemptyEmailMessage()).toBeVisible();
        await expect(loginPage.getincorrectPasswordMessage()).toBeVisible();
    });

    test('TC_021 - Verify Login button click triggers form submission', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('sample123abc@gmail.com', 'Sample@123');
        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");
    });

    test('TC_022 - Verify pressing "Enter" key submits the login form',async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.loginWithEnter('sample123abc@gmail.com', 'Sample@123');
        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");
    });

    test('TC_023 - Verify login with unregistered email', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('Testusersac123@gmail.com', 'Test@123');
        await expect(loginPage.geterrorMessage()).toContainText("Incorrect email or password.");
    });

    test('TC_024 - Verify login is case-sensitive/insensitive for email', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('SAMPLE123ABC@GMAIL.COM', 'Sample@123');
        await expect(loginPage.geterrorMessage()).toContainText("Incorrect email or password.");
    });

    test('TC_025 - Verify multiple consecutive failed login attempts', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        for(let i=0 ; i<5 ; i++){
            const [response] = promise.all(
                [page.waitForResponse(r => r.url().includes('/api/ecom/auth/login')), loginPage.login("SAMPLE123ABC@GMAIL.COM", "SAMPLE@123"),]
            )
            expect(response.status()).toBe(400);
        }
        expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/auth/login");
    });

    test('TC_026 - Verify Login button remains disabled/no action with only whitespace input', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login('     ', '     ');
        await expect(loginPage.getloginButtonVisibility()).toBeVisible();
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/auth/login');
    });
});

test.describe('TS_05 - Forgot Password Link', async () => {

    test('TC_027 - Verify "Forgot password?" link is clickable', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.clickForgotPasswordLink();
        expect(page.url()).toContain("https://rahulshettyacademy.com/client/#/auth/password-new");
    });

    test('TC_028 - Verify Forgot Password page loads correct fields', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.clickForgotPasswordLink();
        await expect(loginPage.getforgotFiledEmail()).toBeVisible();
        await expect(loginPage.getforgetPasswordHeading()).toBeVisible();
        await expect(loginPage.getforgotPasswordField()).toBeVisible();
        await expect(loginPage.getconfirmPasswordField()).toBeVisible();
        await expect(loginPage.getsaveNewPassword()).toBeVisible();
    });
});

test.describe('TS_06 - Register Navigation', async () => {

    test('TC_029 - Verify "Register here" link navigates to Registration page', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.clickRegisterLink();
        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/auth/register");
    });

    test('TC_30 - Verify left banner "Register" button navigates to Registration page', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.clickBannerRegisterButton();
        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/auth/register");
    });
});