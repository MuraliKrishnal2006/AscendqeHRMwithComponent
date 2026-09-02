import { test, expect } from '../../src/fixtures/page.fixture';
import { validUser, dashboardHeader } from '../../src/data/credentials';
import { AdminMenuComponent } from '../../src/components/adminmenu';

test.describe('TC10 - Session Invalidation & Protected Route Navigation', () => {
    test('TC10: Protected page URL after logout should redirect to login', async ({ page, loginPage, dashboardPage }) => {
        const adminMenu = new AdminMenuComponent(page);

        // 1-3. Launch browser and navigate to the application URL
        await loginPage.gotoLogin();

        // 4-6. Enter Admin credentials and click Login
        await loginPage.login(validUser.username, validUser.password);
        expect(await dashboardPage.getDashBoardHeaderText()).toBe(dashboardHeader);

        // 7. Navigate to PIM → Employee List (protected page) and capture the URL
        await adminMenu.clickPim();
        const protectedEmployeeListUrl = page.url();
        expect(protectedEmployeeListUrl).toContain('pim');

        // 8-9. Click profile icon in top-right header and click Logout
        await dashboardPage.logout();
        await expect(page).toHaveURL(/auth\/login/);

        // 10. Click the browser Back button and verify access is denied
        await page.goBack();
        await expect(page).toHaveURL(/auth\/login/);

        // 11. Paste previously noted protected Employee List URL directly into Address Bar
        await page.goto(protectedEmployeeListUrl);
        await expect(page).toHaveURL(/auth\/login/);

        // 12. Log in again with valid Admin credentials
        await loginPage.userlogin(validUser.username, validUser.password);
        // OrangeHRM redirects back to the intended protected page (PIM) after re-authentication
        await expect(page).not.toHaveURL(/auth\/login/);
    });
});
