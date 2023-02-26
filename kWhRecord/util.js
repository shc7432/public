


export function delay(time = 0) {
    return new Promise(resolve => setTimeout(resolve, time));
}


export function queryElement(root, selector, noCache = false) {
    if (!selector) return root;

    if (!(queryElement.__caches__ instanceof Map)) queryElement.__caches__ = new Map();
    else if (!noCache) {
        const result = queryElement.__caches__.get(selector);
        if (result) return result;
    }

    const result = root.querySelector(selector);
    if (result) {
        result.on = result.addEventListener;
    }
    if (result && !noCache) queryElement.__caches__.set(selector, result);
    return result;
}

export function wrapQueryElement(root) {
    return queryElement.bind(null, root);
}


export const showTip_style = {
    position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, outline: 0,
    zIndex: 2097152, background: 'rgba(0, 0, 0, 0.5)', cursor: 'not-allowed',
    userSelect: 'none',
};
export const showTip_style_2 = {
    position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
    background: 'var(--color-scheme-background, #ffffff)',
    border: '1px solid gray',
    padding: '10px',
    cursor: 'default',
    maxHeight: 'calc(100% - 30px)', overflow: 'auto',
};
export function showTip(content, html = false, time = 0) {
    const el = document.createElement('div');
    el.role = 'dialog';
    for (const i in showTip_style) el.style[i] = showTip_style[i];
    const cont = document.createElement('div');
    for (const i in showTip_style_2) cont.style[i] = showTip_style_2[i];
    el.tabIndex = 1;
    el.append(cont);

    cont[html ? 'innerHTML' : 'innerText'] = content;
    el.addEventListener('wheel', ev => ev.preventDefault(), { passive: false });
    el.addEventListener('touchstart', ev => ev.preventDefault(), { passive: false });
    el.onkeydown = el.onpointerdown = ev => ev.preventDefault();
    el.onkeyup = el.onpointerup = ev => ev.preventDefault();
    const handlers = () => {
        el.onclick = () => el.remove();
        el.onkeydown = el.onpointerdown = () => el._flag = true;
        el.onkeyup = el.onpointerup = () => { el._flag && el.remove() };
    };
    if (time) setTimeout(handlers, time);
    else queueMicrotask(handlers);

    (document.body || document.documentElement).append(el);
    el.focus();

    return el;
}











