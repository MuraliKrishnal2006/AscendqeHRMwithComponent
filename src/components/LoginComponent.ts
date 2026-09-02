import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

/**
 * LoginComponent — reusable UI component for OrangeHRM/AscendqeHRM Login form.
 * Uses semantic ARIA roles and standard Playwright locators without any XPath.
 */
export class LoginComponent extends BaseComponent {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly alertErrorMessage: Locator;
    readonly inputFieldErrors: Locator;

    constructor(page: Page) {
        super(page);
        // Playwright semantic user-facing locators (no XPath)
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.alertErrorMessage = page.getByRole('alert');
        this.inputFieldErrors = page.locator('.oxd-input-field-error-message');
    }

    /**
     * Clicks the Login button
     */
    async clickLogin(): Promise<void> {
        await this.click(this.loginButton);
    }

    /**
     * Clicks the Username input field
     */
    async clickUsername(): Promise<void> {
        await this.waitForElement(this.usernameInput);
        await this.usernameInput.click();
    }

    /**
     * Fills the Username input field
     */
    async fillUsername(username: string): Promise<void> {
        await this.fill(this.usernameInput, username);
    }

    /**
     * Clicks the Password input field
     */
    async clickPassword(): Promise<void> {
        await this.waitForElement(this.passwordInput);
        await this.passwordInput.click();
    }

    /**
     * Fills the Password input field
     */
    async fillPassword(password: string): Promise<void> {
        await this.fill(this.passwordInput, password);
    }

    /**
     * Clears the Username input field
     */
    async clearUsername(): Promise<void> {
        await this.waitForElement(this.usernameInput);
        await this.usernameInput.fill('');
    }

    /**
     * Clears the Password input field
     */
    async clearPassword(): Promise<void> {
        await this.waitForElement(this.passwordInput);
        await this.passwordInput.fill('');
    }

    /**
     * Clears both Username and Password fields
     */
    async clearFields(): Promise<void> {
        await this.clearUsername();
        await this.clearPassword();
    }

    /**
     * Fills credentials and clicks the Login button
     */
    async login(username: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    /**
     * Reads the alert banner message (e.g. 'Invalid credentials')
     */
    async getAlertErrorMessage(): Promise<string> {
        await this.waitForElement(this.alertErrorMessage);
        return (await this.alertErrorMessage.innerText()).trim();
    }

    /**
     * Returns all visible inline field error messages (e.g. ['Required', 'Required'])
     */
    async getFieldErrors(): Promise<string[]> {
        await this.inputFieldErrors.first().waitFor({ state: 'visible' });
        const errorTexts = await this.inputFieldErrors.allInnerTexts();
        return errorTexts.map((text) => text.trim());
    }
}
