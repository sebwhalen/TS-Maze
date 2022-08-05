const config = require('./esbuild.config.js');

require('esbuild').serve({ servedir: 'dist', host: 'localhost', port: 8000 }, config)
    .then(server => {
        console.log(`Server started at http://${server.host}:${server.port}.`)
    });
