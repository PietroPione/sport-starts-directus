import { useEnv } from '@directus/env';
import { InvalidProviderConfigError } from '@directus/errors';
import { toArray } from '@directus/utils';
import { LDAPAuthDriver, LocalAuthDriver, OAuth2AuthDriver, OpenIDAuthDriver, SAMLAuthDriver, } from './auth/drivers/index.js';
import { DEFAULT_AUTH_PROVIDER } from './constants.js';
import getDatabase from './database/index.js';
import { useLogger } from './logger/index.js';
import { getConfigFromEnv } from './utils/get-config-from-env.js';
import { getSchema } from './utils/get-schema.js';
const providers = new Map();
export function getAuthProvider(provider) {
    const logger = useLogger();
    if (!providers.has(provider)) {
        logger.error('Auth provider not configured');
        throw new InvalidProviderConfigError({ provider });
    }
    return providers.get(provider);
}
export async function registerAuthProviders() {
    const env = useEnv();
    const logger = useLogger();
    const options = { knex: getDatabase(), schema: await getSchema() };
    const providerNames = toArray(env['AUTH_PROVIDERS']);
    // Register default provider if not disabled
    if (!env['AUTH_DISABLE_DEFAULT']) {
        const defaultProvider = getProviderInstance('local', options);
        providers.set(DEFAULT_AUTH_PROVIDER, defaultProvider);
    }
    if (!env['AUTH_PROVIDERS']) {
        return;
    }
    // Register configured providers
    providerNames.forEach((name) => {
        name = name.trim();
        if (name === DEFAULT_AUTH_PROVIDER) {
            logger.error(`Cannot override "${DEFAULT_AUTH_PROVIDER}" auth provider.`);
            process.exit(1);
        }
        const { driver, ...config } = getConfigFromEnv(`AUTH_${name.toUpperCase()}_`);
        if (!driver) {
            logger.warn(`Missing driver definition for "${name}" auth provider.`);
            return;
        }
        const provider = getProviderInstance(driver, options, { provider: name, ...config });
        if (!provider) {
            logger.warn(`Invalid "${driver}" auth driver.`);
            return;
        }
        providers.set(name, provider);
    });
}
function getProviderInstance(driver, options, config = {}) {
    switch (driver) {
        case 'local':
            return new LocalAuthDriver(options, config);
        case 'oauth2':
            return new OAuth2AuthDriver(options, config);
        case 'openid':
            return new OpenIDAuthDriver(options, config);
        case 'ldap':
            return new LDAPAuthDriver(options, config);
        case 'saml':
            return new SAMLAuthDriver(options, config);
    }
    return undefined;
}
