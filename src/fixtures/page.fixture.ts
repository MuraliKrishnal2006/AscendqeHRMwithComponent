import {test as base} from '@playwright/test';
import {LoginPage} from '../pages/TC-09-LoginPage';
import {DashboardPage} from '../pages/DashboardPage';
import { AdminPage } from '../pages/TC-07-AdminUserManagement';
import { LoginComponent } from '../components/LoginComponent';

 
/**
 * page.fixture.ts — injects every Page Object and Component into tests as a fixture,
 * so specs never do `new LoginPage(page)` manually. Add a new page/component
 * class here once, and every test gets access to it via destructuring
 * (e.g. `async ({ loginPage, loginComponent }) => {...}`).
 */

 type Pages ={
    loginPage : LoginPage;
    loginComponent: LoginComponent;
    dashboardPage : DashboardPage;
    adminPage: AdminPage;
    

   
 };

 export const test = base.extend<Pages>({
    loginPage : async ({page},use)=>{
        await use(new LoginPage(page));
    },
    loginComponent: async ({ page }, use) => {
        await use(new LoginComponent(page));
    },
    dashboardPage : async ({page},use)=>{
        await use(new DashboardPage(page));
    },
    adminPage: async ({ page }, use) => {
        await use(new AdminPage(page));
    },
    

 });

 export const expect = test.expect;