const env = process.env.NODE_ENV || 'DEVELOPMENT';
// Set `env` variable:
const hasSSREnabled = (process.env.SSR || process.argv[2] === 'ssr') || false;

export default {
  isDevelopment: env === 'DEVELOPMENT',
  isProduction: env === 'PRODUCTION',
  name: env,
  ssrEnabled: hasSSREnabled,
};
