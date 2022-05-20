const config = require('./esbuild.config.js')

require('esbuild').build(config)
    .then(() => 'Build completed.')
    .catch(() => process.exit(1));