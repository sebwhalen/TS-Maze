const htmlCopyPlugin = require('./esbuildPlugins/htmlCopyPlugin.js');

module.exports = {
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    inject: ['./src/react-shim.js'],
    outfile: './dist/index.js',
    sourcemap: true,
    plugins: [
        htmlCopyPlugin('./src/index.html', './dist/index.html')
    ]
};