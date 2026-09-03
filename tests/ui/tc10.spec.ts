import { test, expect } from '../../src/fixtures/page.fixture';
import { validUser, dashboardHeader } from '../../src/data/credentials';

test.describe('TC10 - Session Invalidation & Protected Route Navigation', () => {
    test('TC10: Protected page URL after logout should redirect to login', async ({ page, loginPage, dashboardPage, adminMenu }) => {
        await loginPage.gotoLogin();

        await loginPage.login(validUser.username, validUser.password);
        expect(await dashboardPage.getDashBoardHeaderText()).toBe(dashboardHeader);

        await adminMenu.clickPim();
        const protectedEmployeeListUrl = page.url();
        expect(protectedEmployeeListUrl).toContain('pim');

        await dashboardPage.logout();
        await expect(page).toHaveURL(/auth\/login/);
        await page.goBack();
        await expect(page).toHaveURL(/auth\/login/);
        await page.goto(protectedEmployeeListUrl);
        await expect(page).toHaveURL(/auth\/login/);
        await loginPage.userlogin(validUser.username, validUser.password);
        
        await expect(page).not.toHaveURL(/auth\/login/);
    });
});
