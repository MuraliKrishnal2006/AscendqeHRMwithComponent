/**
 * Test data for TC-09: Login Security & Field Validation test suite
 */
export const tc09LoginData = {
    // Initial username fill
    initialUsername: 'AscendQETest',

    // Invalid credentials attempt
    invalidUsername: 'wronguser',
    invalidPassword: 'wrongpass12',

    // Second attempt credentials (invalid user with valid password)
    validPassword: '@Ascendqe123',

    // Valid credentials
    validUsername: 'AscendQETest',

    // Expected validation error messages
    expectedRequiredError: 'Required',
    expectedInvalidCredentialsError: 'Invalid credentials',

    // Expected dashboard header after successful login
    dashboardHeader: 'Dashboard',
};
