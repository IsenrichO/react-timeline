/* TRUE CONSTANTS */
export const env = process.env.NODE_ENV || 'development';

// Set `env` variable:
export const hasSSREnabled = (process.env.SSR || process.argv[2] === 'ssr') || false;

/* MODULE EXPORT(s) */
module.exports = {
  isDevelopment: env === 'DEVELOPMENT',
  isProduction: env === 'PRODUCTION',
  name: env,
  ssrEnabled: hasSSREnabled,
};
