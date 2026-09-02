import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginComponent } from '../components/LoginComponent';

/**
 * LoginPage — models AscendqeHRM's login screen.
 * Covers both the happy path (valid login) and the negative path
 * (invalid credentials → error message), used across tests/ui/login.spec.ts
 * and as the entry point for the `loggedIn` auth fixture.
 * Uses semantic Playwright locators (no XPaths) and delegates component-level
 * actions to LoginComponent.
 */
export class LoginPage extends BasePage {
    readonly UsernameInput: Locator;
    readonly PasswordInput: Locator;
    readonly LoginButton: Locator;
    readonly ErrorMessage: Locator;
    readonly loginComponent: LoginComponent;

    constructor(page: Page) {
        super(page);
        this.loginComponent = new LoginComponent(page);
        this.UsernameInput = page.getByRole('textbox', { name: 'Username' });
        this.PasswordInput = page.getByPlaceholder('Password');
        this.LoginButton = page.getByRole('button', { name: 'Login' });
        // Semantic alert locator 
        this.ErrorMessage = page.getByRole('alert');
    }

    // Navigates directly to the login URL (bypasses any prior page state).
    async gotoLogin(): Promise<void> {
        await this.goto('/web/index.php/auth/login');
    }

    // Fills credentials and submits the form — the standard login flow.
    async login(username: string, password: string): Promise<void> {
        await this.loginComponent.login(username, password);
    }

    async userlogin(username: string, password: string): Promise<void> {
        await this.loginComponent.login(username, password);
    }

    /**
     * Reads the error banner text after a failed login attempt.
     */
    async getErrorMessage(): Promise<string> {
        return await this.loginComponent.getAlertErrorMessage();
    }

    /**
     * Clicks the login button
     */
    async clickLogin(): Promise<void> {
        await this.loginComponent.clickLogin();
    }

    /**
     * Clicks the username input field
     */
    async clickUsername(): Promise<void> {
        await this.loginComponent.clickUsername();
    }

    /**
     * Fills the username field
     */
    async fillUsername(username: string): Promise<void> {
        await this.loginComponent.fillUsername(username);
    }

    /**
     * Fills the password field
     */
    async fillPassword(password: string): Promise<void> {
        await this.loginComponent.fillPassword(password);
    }

    /**
     * Clears both username and password input fields
     */
    async clearFields(): Promise<void> {
        await this.loginComponent.clearFields();
    }

    /**
     * Returns inline field error messages (e.g. ['Required', 'Required'])
     */
    async getFieldErrors(): Promise<string[]> {
        return await this.loginComponent.getFieldErrors();
    }
}
