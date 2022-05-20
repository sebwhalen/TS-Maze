const config = require('./esbuild.config.js');

require('esbuild').serve({ servedir: 'dist' }, config)
    .then(server => {
        console.log(`Server started at ${server.host}:${server.port}.`)
    });
