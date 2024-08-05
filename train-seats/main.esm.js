import { createApp } from './vue.esm-browser.js';

const Vue_App = (await import('./app.js')).default;

const app = createApp(Vue_App);
app.config.unwrapInjectedRef = true;
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-');
app.config.compilerOptions.comments = true;
const myApp = document.getElementById('myApp');
console.assert(myApp); if (!myApp) throw new Error('FATAL: #myApp not found');
app.mount(myApp);
