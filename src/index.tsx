import { MainApp } from 'ui';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('container');

if(!container) {
    throw new Error('No container detected');
}

const root = createRoot(container);

root.render(<MainApp />);