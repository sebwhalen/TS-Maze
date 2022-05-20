const fs = require('fs');

module.exports = (file, out) =>
({
    name: 'fileCopy',
    setup(build) {
        build.onEnd(async () => {
            await fs.promises.copyFile(file, out);
        })
    }
});