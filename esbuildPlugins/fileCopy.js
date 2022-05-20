const fs = require('fs');

module.exports = (file, out) =>
({
    name: 'fileCopy',
    setup(build) {
        build.onStart(async () => {
            try {
                await fs.promises.access('./dist');
            } catch {
                await fs.promises.mkdir('./dist');
            }
            
            await fs.promises.copyFile(file, out);
        })
    }
});