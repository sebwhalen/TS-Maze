const { exec } = require('child_process');
const { promisify } = require('util');

module.exports = (input, output) =>
({
    name: 'tailwind',
    setup(build) {
        build.onStart(async () => {
            const { stderr, stdout } = await promisify(exec)(`npx tailwindcss -i ${input} -o ${output}`);
            if (stderr) {
                console.error(stderr);
            } else {
                console.log(`Tailwind completed: ${ stdout }`)
            }
        })
    }
});