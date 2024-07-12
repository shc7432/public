export const NoPrevent = Symbol('NoPrevent');
export default {
    'Ctrl+O'() { if (!(globalThis.myEntry)) openProject.click() },
    'Ctrl+L'() { loadProject.click() },
    'Ctrl+S'() { saveProject.click() },
    
};

