globalThis.sw_env = {
    cacheName: 'kWh_record-f922cc1f492141fa8ea6d63d03b1381c',
    cacheFiles: [
        'main.js',
    ],
};

globalThis.sw_replaces = {
    async 'sw_content.js'(req) {
        return new Response(new Blob(['globalThis.swAlive = true'], { type: 'text/javascript' }));
    },
};

