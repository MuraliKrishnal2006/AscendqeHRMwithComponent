/**
 * Test credentials — read from environment variables, never hardcoded.
 *
 * Local dev: copy .env.example to .env and fill in real values.
 * .env is gitignored, so it never gets committed.
 *
 * CI: these are injected from GitHub Actions Secrets
 * (see .github/workflows/playwright.yml) as environment variables —
 * same process.env.* reads, no code change needed between environments.
 */

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(
            `Missing required environment variable: ${name}. ` +
            `Copy .env.example to .env and fill in real values ` +
            `(or set it in your CI secrets).`
        );
    }
    return value;
}
export const dashboardHeader = 'Dashboard';

export const validUser = {
    username: requireEnv('ASCENDQE_ADMIN_USERNAME'),
    password: requireEnv('ASCENDQE_ADMIN_PASSWORD')
};

export const userlogin = {
    username: requireEnv('ASCENDQE_USER_USERNAME'),
    password: requireEnv('ASCENDQE_USER_PASSWORD')
};

export const specificUser = {
    username: userlogin.username,
    password: userlogin.password
};

export const invalidUser = {
    username: 'invaliduser',
    password: 'invalidpword'
};

export const invalidErrorMesage = 'Invalid credentials';
