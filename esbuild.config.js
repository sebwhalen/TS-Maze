const fileCopy = require('./esbuildPlugins/fileCopy.js');
const tailwind = require('./esbuildPlugins/tailwind.js');

module.exports = {
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    inject: ['./src/react-shim.js'],
    outfile: './dist/index.js',
    sourcemap: true,
    plugins: [
        fileCopy('./src/index.html', './dist/index.html'),
        tailwind('./src/index.css', './dist/index.css')
    ]
};