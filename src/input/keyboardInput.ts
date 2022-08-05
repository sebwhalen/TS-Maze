export const inputHandler = (element: HTMLElement) => {
    const buffer: Set<string> = new Set();

    element.addEventListener('keydown', (e) => {
        buffer.add(e.key.toLowerCase());
    });

    element.addEventListener('keyup', (e) => {
        buffer.delete(e.key.toLowerCase());
    });

    return {
        getKeys() {
            return buffer;
        }
    }
};

export type InputHandler = ReturnType<typeof inputHandler>