module.exports = {
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    inject: ['./src/react-shim.js'],
    outfile: './dist/index.js',
    sourcemap: true
};