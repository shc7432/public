


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











