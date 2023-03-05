

export async function clearCache(cacheName) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    for (const i of keys) {
        cache.delete(i);
    }
    return true;
}


export const availableUpdateOptions = [0, 1, 2, 3, 4, { id: 5, disabled: true }, 6];
export const defaultUpdateOption = 3;
export const updateCheckingDelayLimits = {
    min: 3600 * 1000,       // 1 hour
    max: 86400 * 7 * 1000,  // 7 days
};


let translation_table = {};
export const translations = new Proxy({}, {
    get(target, p, receiver) {
        if (Reflect.has(translation_table, p)) return Reflect.get(translation_table, p);
        return p;
    },
    set(target, p, newValue, receiver) {
        return false;
    },
    has(target, p) {
        return Reflect.has(translation_table, p);
    },
});
export const tr = function (p) { return translations[p] };

const path = import.meta.url.replace(/updater\.js$/, '');
try {
    translation_table = await (await fetch(path + `lang/${navigator.language}.json`)).json();
} catch {
    try {
        translation_table = await (await fetch(path + `lang/en-US.json`)).json();
    } catch (error) {
        console.error('[updater]', '[translation]', 'Failed to load translations:', error);
    }
}



export const updateManager_content = document.createElement('template');
updateManager_content.innerHTML = /*html*/`<div id=container>
<style>
*:disabled, *[disabled] {
    cursor: not-allowed;
}
a, button, summary {
    cursor: pointer;
}
a {
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
[hidden] {
    display: none!important;
}

::selection {
    background-color: rgb(141 199 248 / 60%);
}
</style>
<style>
#autoupdate_config {
    font-size: small;
    font-family: monospace;
}
#cfgau {
    display: inline-block;
    width: 2em; opacity: 0;
    position: absolute;
    cursor: pointer;
}
#cfgaut {
    border: 1px solid;
    border-radius: 5px;
    padding: 5px; font-size: large;
}
.update-widget.text-tip {
    height: 3em;
    display: grid;
    place-items: center;
}
#updates .opts {
    font-family: Consolas, monospace;
}
</style>
<style>
.infobox {
    background: #e5f3fe;
    border: 1px solid #cdcdcd;
    border-radius: 5px;
    padding: 10px;
}
.update-card {
    border-radius: 10px;
    border: 1px solid gray;
    padding: 10px;
    margin: 10px 0;
}
.update-card-caption {
    font-weight: bold;
}
.update-card-caption.ignored {
    text-decoration: line-through;
}
.update-card-content {
    margin: 5px 0;
    word-break: break-all;
    white-space: pre-wrap;
}
.update-card-buttons {
    text-align: right;
}
</style>

<fieldset>
    <legend>${tr('autoupdate')}</legend>
    <div id="autoupdate_config">
        <div><label>
            <span>${tr('cfgau')} </span>
            <select id="cfgau"></select>
            <span id="cfgaut"></span>
        </label></div>

        <div id="cfgctime_wrapper" style="margin-top:15px"><label>
            <span>${tr('cfgctime')} </span>
            <input id="cfgctime" type=number min=1 max=31104000 value=86400>
        </label></div>
    </div>
    <div style="margin-top: 10px" class="infobox" id="settingsChangedTips" hidden>${tr('needReloadToApply')} <a href="javascript:" data-action=reload>${tr('reloadNow')}</a></div>
</fieldset>

<fieldset>
    <legend>${tr('checkupdate')}</legend>
    <div>
        <div style="margin-bottom: 10px;">[<a href="javascript:" id="checkNow">${tr('checkNow')}</a>]</div>
        <div style="font-family: monospace; font-size: small; color: gray">${tr('updlastctime')}: <span id="lastCheck"></span></div>
        <p class="update-widget text-tip" id=noUpdates>${tr('noUpdate')}</p>
        <p class="update-widget text-tip" id=checkingUpdates>${tr('checkingUpdates')}</p>
        <p class="update-widget text-tip" id=failedToCheckUpdates>${tr('failedToCheckUpdates')}</p>
        <div class="update-widget" id=updates style="margin-top:12px">
            <div id=updates_count></div>
            <div class=updates-container > .update-card></div>
            <div class=opts>
                <a href="javascript:" id="updateAll">${tr('updateAll')}</a><span
                > | </span><a href="javascript:" id="ignoreAll">${tr('ignoreAll')}</a><span
                > | </span><a href="javascript:" id="clearAll">${tr('clearAll')}</a>
            </div>
        </div>
    </div>
</fieldset>

</div>`;

export const updateManager_defaultOptions = {
    getConfig() {
        try {
            return JSON.parse(localStorage.getItem('update manager options'));
        } catch { return {} }
    },
    setConfig(newConfig) {
        try {
            return localStorage.setItem('update manager options', JSON.stringify(newConfig));
        } catch {
            return localStorage.setItem('update manager options', '{}');
        }
    },
    getCurrentVersion() {
        return '1.1.1.1';
    },
    doUpdate(targetVersion, doNotApply) { },
};


export class UpdateManager {
    #el = null;
    #inited = false;
    #getConfigPtr = null;
    #setConfigPtr = null;
    #config = {};
    #initPromise = null;
    #crinfo = {};

    constructor({
        getConfig = updateManager_defaultOptions.getConfig,
        setConfig = updateManager_defaultOptions.setConfig,
        getCurrentVersion = updateManager_defaultOptions.getCurrentVersion,
        versionPath = 'version',
        releaseNotesPath = 'release-notes/[[version]].txt',
        doUpdate = updateManager_defaultOptions.doUpdate,
    }) {
        this.#getConfigPtr = getConfig;
        this.#setConfigPtr = setConfig;
        Object.assign(this.#crinfo, {
            getCurrentVersion, versionPath, releaseNotesPath, doUpdate,
        });

        this.#el = document.createElement('div');
        this.#initPromise = this.#init();
        this.#initPromise.then(() => this.checkIf()).catch(error => { throw error });

    }

    async #init() {
        const shadowRoot = this.#el.attachShadow({ mode: 'open' });
        shadowRoot.append(updateManager_content.content.cloneNode(true));

        let retCfg = this.#getConfigPtr.call(this);
        if (retCfg instanceof Promise) retCfg = await retCfg;
        this.#config = retCfg;

        shadowRoot.querySelectorAll('[data-action=reload]').forEach(el => el.onclick = () => location.reload());

        const cfgau = shadowRoot.getElementById('cfgau');
        const cfgaut = shadowRoot.getElementById('cfgaut');
        const auopt_list = tr('auopt_list');
        let aucfg = await this.getConfig('configuration');
        if (aucfg == undefined) {
            await this.setConfig('configuration', defaultUpdateOption);
            aucfg = defaultUpdateOption;
        }
        for (const i of availableUpdateOptions) {
            const el = document.createElement('option');
            const value = typeof i === 'object' ? i.id : i;
            el.value = value;
            el.append(`${value} - ${auopt_list[String(value)]}`);
            if (value == aucfg) el.selected = true;
            if ((typeof i === 'object') && (i.disabled)) el.disabled = true;
            cfgau.append(el);
        }
        cfgaut.innerText = aucfg;
        cfgau.onchange = async () => {
            cfgaut.innerText = cfgau.value;
            await this.setConfig('configuration', +cfgau.value);
            shadowRoot.getElementById('settingsChangedTips').hidden = false;
            if (await this.allowAutoUpdate) {
                cfgctime_wrapper.hidden = false;
            } else cfgctime_wrapper.hidden = true;
        };
        cfgaut.onclick = () => cfgau.focus();
        
        const cfgctime = shadowRoot.getElementById('cfgctime');
        const cfgctime_wrapper = shadowRoot.getElementById('cfgctime_wrapper');
        if (!(await this.allowAutoUpdate)) {
            cfgctime_wrapper.hidden = true;
        } {
            const period = await this.getConfig('check period');
            if (undefined == period) await this.setConfig('check period', 86400);
            else cfgctime.value = period;
        };
        cfgctime.onchange = async () => {
            if (!cfgctime.checkValidity()) return;
            await this.setConfig('check period', cfgctime.value);
            shadowRoot.getElementById('settingsChangedTips').hidden = false;
        }

        shadowRoot.getElementById('checkNow').onclick = () => {
            if (this.#isChecking) return;
            queueMicrotask(() => this.check());
        };
        shadowRoot.getElementById('updateAll').onclick = () => {
            this.#doUpdate(null);
        };
        shadowRoot.getElementById('ignoreAll').onclick = async () => {
            const ignored = await this.getConfig('ignored versions') || [];
            for (const i of shadowRoot.querySelectorAll('#updates .updates-container > .update-card')) {
                if (!ignored.includes(i.$VERSION)) ignored.push(i.$VERSION);
                const caption = i.querySelector('.update-card-caption');
                caption && caption.classList.add('ignored');
            }
            await this.setConfig('ignored versions', ignored);
        };
        shadowRoot.getElementById('clearAll').onclick = () => {
            const updatesc = this.#el.shadowRoot.querySelector('#updates > .updates-container');
            updatesc.innerHTML = '';
            this.#updateCheckStatus('noUpdates');
        };

        shadowRoot.getElementById('lastCheck').innerText = new Date(await this.getConfig('Last Check Time') || 0).toLocaleString();
        this.#updateCheckStatus('noUpdates');

        const period = Math.min(Math.max(await this.getConfig('check period') * 1000, updateCheckingDelayLimits.min), updateCheckingDelayLimits.max);
        if ((!isNaN(period))) setInterval(() => this.checkIf(), period);


        this.#inited = true;
    }

    async getConfig(key) {
        return Reflect.get(this.#config, key);
    }
    async setConfig(key, value) {
        const ret = Reflect.set(this.#config, key, value);
        await this.saveConfig();
        return ret;
    }
    async saveConfig() {
        const ret = this.#setConfigPtr.call(this, this.#config);
        if (ret instanceof Promise) return await ret;
        return ret;
    }


    get allowAutoUpdate() {
        return (async () => {
            const cfg = await this.getConfig('configuration');
            return cfg >= 1 && cfg <= 4;
        })();
    }
    get isServiceWorkerEnabled() {
        if (!this.#inited) return this.#initPromise.then(() => {
            return this.getConfig('configuration')
        }).then(result => {
            return result != 6;
        });
        return this.getConfig('configuration') != 6;
    }


    attach(target) {
        if (!(target instanceof HTMLElement)) throw new TypeError('87');
        target.append(this.#el);
    }


    #isChecking = false;
    #isFirstFound = true;
    async check() {
        if (!navigator.onLine) return false;

        this.#isChecking = true;
        this.#updateCheckStatus('checkingUpdates');
        try {
            const resp = await fetch(this.#crinfo.versionPath);
            if (!resp.ok) throw resp;
            const newVersion = await resp.text();
            const currentVersion = await (async () => {
                let temp1 = this.#crinfo.getCurrentVersion.call(this);
                return (temp1 instanceof Promise) ? await temp1 : temp1;
            })();

            this.setConfig('Last Check Time', new Date().getTime());
            this.#el.shadowRoot.querySelector('#lastCheck').innerText = new Date(await this.getConfig('Last Check Time') || 0).toLocaleString();

            if (newVersion === currentVersion) {
                this.#updateCheckStatus('noUpdates');
                this.#isChecking = false;
                return false;
            }

            await this.setConfig('Last Check Time', 0);
            const updatesc = this.#el.shadowRoot.querySelector('#updates > .updates-container');
            updatesc.innerHTML = '';
            const ret = await this.#updateInfo(newVersion);
            const cfg = await this.getConfig('configuration');
            if (cfg == 2) {
                if (this.#isFirstFound) await this.#showUpdateTipUI(newVersion);
            }
            else if (cfg == 3) {
                requestIdleCallback(() => this.#doUpdate(null, true), {
                    timeout: 5000,
                });
            }
            else if (cfg == 4) {
                requestIdleCallback(() => this.#doUpdate(null), {
                    timeout: 5000,
                });
            }
            this.#isChecking = false;
            this.#isFirstFound = false;
            return ret;
        }
        catch (error) {
            console.warn('[updater]', 'Failed to check for updates:', error);
            this.#updateCheckStatus('failedToCheckUpdates');
        }
        this.#isChecking = false;
    }

    async checkIf() {
        if (await this.allowAutoUpdate) {
            const period = await this.getConfig('check period') || 0;
            const lastTime = new Date(await this.getConfig('Last Check Time') || 0);
            const now = new Date();
            if ((now - lastTime) < (period * 1000)) return null;
            return await this.check();
        }
        else return null;
    }

    #updateCheckStatus(stat) {
        this.#el.shadowRoot.querySelectorAll('.update-widget').forEach(el => el.hidden = true);
        try {
            this.#el.shadowRoot.getElementById(stat).hidden = false;
        } catch { }
    }

    async #updateInfo(version) {
        const cfg = this.getConfig('configuration');
        const updatesc = this.#el.shadowRoot.querySelector('#updates > .updates-container');
        this.#updateCheckStatus('updates');

        const el = document.createElement('div');
        el.className = 'update-card';
        el.$VERSION = version;
        const ver = document.createElement('div');
        ver.className = 'update-card-caption';
        ver.innerText = version;
        el.append(ver);
        const ignored = await this.getConfig('ignored versions');
        let isIgnored = false;
        if (ignored) {
            if (ignored.includes(version)) {
                isIgnored = true;
                ver.classList.add('ignored');
            }
        }
        const cont = document.createElement('div');
        cont.className = 'update-card-content';
        const btn_showRn = document.createElement('button');
        btn_showRn.type = 'button';
        btn_showRn.innerText = tr('showRn');
        btn_showRn.onclick = () => {
            btn_showRn.disabled = true;
            fetch(this.#crinfo.releaseNotesPath.replace('[[version]]', version))
            .then(v => {
                if (v.ok) return v.text();
                throw new Error(`HTTP Error ${v.status} ${v.statusText}`);
            })
            .then(t => {
                btn_showRn.replaceWith(document.createTextNode(t));
            })
            .catch(error => btn_showRn.replaceWith(document.createTextNode(`Failed to load Release Notes: ${error}`)));
        };
        cont.append(btn_showRn);
        el.append(cont);
        const btns = document.createElement('div');
        btns.className = 'update-card-buttons';
        const btn = [{
            text: tr('u:update'), click: () => {
                this.#doUpdate(version);
        }},{
            id: 'ignore', text: tr('u:ignore'), click: async function (thisArg) {
                const ignored = await thisArg.getConfig('ignored versions') || [];
                if (!ignored.includes(version)) ignored.push(version);
                await thisArg.setConfig('ignored versions', ignored);
                ver.classList.add('ignored');
                this.replaceWith(document.createTextNode('--'));
        }},{
            text: tr('u:close'), click: () => {
                el.remove();
        }},];
        for (let i = 0; i < btn.length; ++i) {
            const obj = btn[i];
            const a = document.createElement('a');
            a.href = 'javascript:';
            a.onclick = obj.click.bind(a, this);
            a.innerText = obj.text;
            btns.append(a);
            if (i + 1 !== btn.length) btns.append(' | ');

            if (isIgnored && obj.id === 'ignore') a.replaceWith(document.createTextNode('--'));
        }
        el.append(btns);
        updatesc.append(el);

        return true;
    }
    async #showUpdateTipUI(version) {
        const ignored = await this.getConfig('ignored versions');
        if (ignored) if (ignored.includes(version)) return;

        const el = document.createElement('dialog');
        el.innerHTML = `
        <div style="font-weight: bold;">
            <span>${tr('newerVersionDetected')}</span>
        </div>

        <p data-id="version"></p>

        <div style="text-align: right">
            <a href="javascript:" data-id="u">${tr('u:update')}</a><span
            > | </span><a href="javascript:" data-id="s">${tr('u:see')}</a><span
            > | </span><a href="javascript:" data-id="c">${tr('u:close')}</a>
        </div>
        `;
        el.querySelector('[data-id=version]').innerText = version;
        el.querySelector('[data-id=u]').onclick = () => {
            queueMicrotask(() => this.#doUpdate(version));
        };
        el.querySelector('[data-id=s]').onclick = () => {
            el.close();
            requestAnimationFrame(() => {
                el.remove();
                this.#el.scrollIntoView({ behavior: 'smooth' });
            });
        };
        el.querySelector('[data-id=c]').onclick = () => {
            el.close();
            requestAnimationFrame(() => {
                el.remove();
            });
        };
        (document.body || document.documentElement).append(el);
        el.showModal();
    }

    async #doUpdate(targetVersion, doNotApply = false) {
        await this.setConfig('ignored versions', []);
        return this.#crinfo.doUpdate.call(this, targetVersion, doNotApply);
    }


};



