const fs = require('fs');
const path = require('path');

module.exports = (file, out) =>
({
    name: 'htmlcopy',
    setup(build) {
        build.onEnd(async () => {
            await fs.promises.copyFile(file, out);
        })
    }
});