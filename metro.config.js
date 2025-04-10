const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolution for problematic packages
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  './lib/constants': require.resolve('@supabase/realtime-js/dist/module/lib/constants')
};

// Add any additional configuration needed
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];

module.exports = config;