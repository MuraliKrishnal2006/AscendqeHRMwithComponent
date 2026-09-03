import { test, expect } from '../../src/fixtures/page.fixture';
import { tc09LoginData } from '../../src/data/TC-09-LoginSecurity';


test.describe('TC-09: Login Security and Validation', () => {

    test.beforeEach(async ({ loginPage }) => {
        // Navigates directly to the login URL
        await loginPage.gotoLogin();
    });

    test('TC-09: Field Validation, Invalid Credentials, and Successful Login', async ({
        page,
        loginPage,
        loginComponent,
        dashboardPage,
    }) => {
        // 1. Click login button without entering credentials -> getByRole('button', { name: 'Login' })
        await loginComponent.clickLogin();
        const emptyErrors = await loginComponent.getFieldErrors();
        expect(emptyErrors).toContain(tc09LoginData.expectedRequiredError);
        expect(emptyErrors.length).toBe(2);

        // 2. Click username field -> getByRole('textbox', { name: 'Username' }), fill 'AscendQETest', click login
        await loginComponent.clickUsername();
        await loginComponent.fillUsername(tc09LoginData.initialUsername);
        await loginComponent.clickLogin();
        const usernameOnlyErrors = await loginComponent.getFieldErrors();
        expect(usernameOnlyErrors).toContain(tc09LoginData.expectedRequiredError);
        expect(usernameOnlyErrors.length).toBe(1);

        // 3. Clear fields, click username, enter invalid username 'wronguser', enter invalid password 'wrongpass12', click login
        await loginComponent.clearFields();
        await loginComponent.clickUsername();
        await loginComponent.fillUsername(tc09LoginData.invalidUsername);
        await loginComponent.fillPassword(tc09LoginData.invalidPassword);
        await loginComponent.clickLogin();
        const alert1 = await loginComponent.getAlertErrorMessage();
        expect(alert1).toBe(tc09LoginData.expectedInvalidCredentialsError);

        // 4. Clear both fields, enter username 'wronguser', enter password '@Ascendqe123', click login
        await loginComponent.clearFields();
        await loginComponent.fillUsername(tc09LoginData.invalidUsername);
        await loginComponent.fillPassword(tc09LoginData.validPassword);
        await loginComponent.clickLogin();
        const alert2 = await loginComponent.getAlertErrorMessage();
        expect(alert2).toBe(tc09LoginData.expectedInvalidCredentialsError);

        // 5. Clear both fields, enter username 'AscendQETest', enter password '@Ascendqe123', click login
        await loginComponent.clearFields();
        await loginComponent.fillUsername(tc09LoginData.validUsername);
        await loginComponent.fillPassword(tc09LoginData.validPassword);
        await loginComponent.clickLogin();

        // 6. Verify successful login: page redirects to dashboard and header is displayed
        await page.waitForURL(/.*dashboard.*/);
        const headerText = await dashboardPage.getDashBoardHeaderText();
        expect(headerText).toBe(tc09LoginData.dashboardHeader);
    });

});
