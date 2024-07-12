app.showModal();
app.oncancel = () => false;


import('./keyboard_shortcuts.js').then((moduleHandle) => {
    const { default: ks, NoPrevent } = moduleHandle;
    globalThis.addEventListener('keydown', function (ev) {
        const keys = [];
        if (ev.ctrlKey && ev.key !== 'Control') keys.push('Ctrl');
        if (ev.altKey && ev.key !== 'Alt') keys.push('Alt');
        if (ev.shiftKey && ev.key !== 'Shift') keys.push('Shift');
        keys.push(ev.key.length === 1 ? ev.key.toUpperCase() : ev.key);
        const key = keys.join('+');

        const fn = ks[key];
        if (fn) {
            const ret = fn.call(globalThis, ev, key);
            if (ret !== NoPrevent) ev.preventDefault();
        }
        return;
    });
});




globalThis.addEventListener('beforeunload', function (ev) {
    if (globalThis.unsavedChanges) {
        ev.preventDefault();
        ev.returnValue = false;
        return false;
    }
});



globalThis.addEventListener('click', function (ev) {
    if (ev.target?.tagName?.toUpperCase?.() === 'A' && ev.target.getAttribute('href') === '#nop') {
        ev.preventDefault();
        return false;
    }
});


{
    let value = undefined;
    Object.defineProperty(globalThis, 'unsavedChanges', {
        get() { return value },
        set(new_value) {
            value = new_value;
            if (!isNaN(value) && value > 0) saveProject.dataset.count = value;
            else if (saveProject.dataset.count) delete saveProject.dataset.count;
            return true;
        },
        enumerable: true,
        configurable: true,
    });
}




openProject.onclick = async function () {
    this.disabled = true;

    if (globalThis.myEntry) {
        if (globalThis.unsavedChanges) {
            if (!confirm('You have unsaved changes.\nIf continue, you will lost your changes.\nIf you want to save them, you should click Save first.\nDiscard changes and close project?')) return (this.disabled = false);
        }

        treeErrors.innerHTML = '';

        delete globalThis.myEntry;
        delete globalThis.edit_data;
        delete globalThis.edit_handles;
        delete globalThis.unsavedChangesInfo;
        delete globalThis.defaultLang;
        delete globalThis.data_manifest;
        editreset();
        treeMessages.innerHTML = '';
        globalThis.unsavedChanges = 0;
        currentProject.value = '<null>';
        openProject.classList.remove('el-button--danger');
        openProject.classList.add('el-button--primary');
        openProject.innerText = 'Open';
        loadProject.disabled = saveProject.disabled = true;
    } else try {
        const entry = await window.showDirectoryPicker({});
        globalThis.myEntry = entry;

        globalThis.unsavedChanges = 0;
        currentProject.value = entry.name;
        openProject.classList.add('el-button--danger');
        openProject.classList.remove('el-button--primary');
        openProject.innerText = 'Close';
        loadProject.disabled = saveProject.disabled = false;

        setTimeout(() => loadProject.click(), 500);
    } catch { }

    this.disabled = false;
}

loadProject.onclick = async function () {
    if (globalThis.unsavedChanges) {
        if (!confirm('You have unsaved changes.\nIf continue, you will lost your changes.\nDiscard changes and reload project?')) return;
        globalThis.unsavedChanges = 0;
    }

    treeMessages.innerHTML = '';
    globalThis.edit_data = {};
    globalThis.edit_handles = {};
    globalThis.unsavedChangesInfo = new Set();
    editreset();
    this.disabled = true;
    const oldText = this.innerHTML;
    this.innerText = 'Loading...';
    try {
        const locales = await myEntry.getDirectoryHandle('_locales');

        for await (const [key, value] of locales.entries()) {
            const el = document.createElement('tree-node');
            const tt = document.createElement('tree-text');
            const tc = document.createElement('tree-content');
            edit_data[key] = null;

            try {
                tt.innerText = key;
                let message;
                try {
                    message = await value.getFileHandle('messages.json');
                    if (!message) throw 0;
                } catch {
                    message = await value.getFileHandle('messages.json', { create: true });
                    // const writable = await message.createWritable();
                    // await writable.write(new Blob(['{}']));
                    // await writable.close();
                } 
                // const json = JSON.parse(await (await message.getFile()).text());
                // edit_data[key] = json;
                edit_handles[key] = message;

                const a = document.createElement('a');
                a.href = '#nop';
                a.dataset.lang = key;
                a.innerText = 'messages.json';
                tc.append(a);
            } catch (error) {
                tc.innerText = 'Invalid content';
                console.warn('[load]', 'Invalid content found while parsing', key, ':', error);
            }

            el.append(tt); el.append(tc);
            treeMessages.append(el);
        }


        try {
            const manifest = JSON.parse(await (await (await myEntry.getFileHandle('manifest.json')).getFile()).text());
            globalThis.data_manifest = manifest;
        } catch (error) {
            const th = document.createElement('tree-node');
            const tt = document.createElement('tree-text');
            tt.innerHTML = 'Cannot load manifest';
            th.append(tt);
            th.append(document.createTextNode(error))
            treeErrors.append(th);
        }

        globalThis.defaultLang = globalThis.data_manifest?.default_locale;
        queueMicrotask(async () => {
            if (globalThis.defaultLang) {
                const lang = globalThis.defaultLang;
                if (!edit_data[lang] || Reflect.ownKeys(edit_data[lang]).length < 1) {
                    const message = globalThis.edit_handles[lang];
                    try {
                        const json = JSON.parse(await(await message.getFile()).text());
                        edit_data[lang] = json;
                    } catch (error) {
                        return false;
                    }
                }
            }
        });
    } catch (error) {
        const th = document.createElement('tree-node');
        const tt = document.createElement('tree-text');
        const tc = document.createElement('tree-content');
        tt.innerHTML = 'Failed to load.';
        tc.innerHTML = 'Please choose the root directory with "_locales" directory.<br>' +
            'For more information, see <a target=_blank href="https://developer.chrome.com/docs/extensions/reference/i18n/">Official Document</a><hr>';
        tc.append(document.createTextNode('Error: ' + error));
        th.append(tt);
        th.append(tc);
        treeErrors.append(th);
    }
    this.innerText = 'Success';
    setTimeout(() => {
        this.innerText = oldText;
        this.disabled = false;
    }, 1000);
}

saveProject.onclick = async function () {
    const changes = globalThis.unsavedChangesInfo;
    if (!changes || !(changes instanceof Set)) return;
    
    this.disabled = true;
    const oldText = this.innerHTML;
    this.innerText = 'Saving...';

    const edit_data = structuredClone(globalThis.edit_data);
    const uci = structuredClone(globalThis.unsavedChangesInfo);
    globalThis.unsavedChangesInfo.clear();
    const beforeNum = globalThis.unsavedChanges;
    const time = new Date();

    for (const i of uci) try {
        const file = globalThis.edit_handles[i];
        if (!file) continue;
        this.innerText = 'Saving ' + i;
        const writable = await file.createWritable();
        await writable.write(new Blob([JSON.stringify(edit_data[i], null, 2)]));
        await writable.close();
        if (i !== globalThis.currentLang) {
            delete globalThis.edit_data[i];
        }
    } catch (error) {
        console.error('[save]', 'Cannot save:', error);
        const th = document.createElement('tree-node');
        const tt = document.createElement('tree-text');
        const tc = document.createElement('tree-content');
        tt.innerHTML = 'Failed to save changes.';
        tc.append(document.createTextNode('Error: ' + error));
        th.append(tt);
        th.append(tc);
        treeErrors.append(th);
        this.innerText = oldText;
        this.disabled = false;
        globalThis.unsavedChangesInfo = uci;
        return;
    }
    
    if (globalThis.unsavedChanges === beforeNum) globalThis.unsavedChanges = 0;
    else globalThis.unsavedChanges -= beforeNum;
    // for (const i in globalThis.edit_data) {
        // if (i !== globalThis.currentLang) delete globalThis.edit_data[i];
    // }
    
    this.innerText = 'Changes saved.';
    setTimeout(() => {
        this.innerText = oldText;
        this.disabled = false;
    }, 2000);
}

clearErrors.onclick = function () {
    treeErrors.innerHTML = '';
}

function editreset() {
    i18n_data.innerHTML = '';
    currentFile.innerText = 'null';
    defaultLang_e.innerText = 'null';
}
let editPending = false;
function createEditItem(key, value, { specNoOpts = false, specCustomKeyStr = null, doNotInsert = false } = {}) {
    const el = document.createElement('tr');
    el.dataset.key = key;

    const td1 = document.createElement('td');
    const edit1 = document.createElement('editable-text-view');
    edit1.innerText = specCustomKeyStr || key;
    edit1.dataset.type = 'key';
    td1.append(edit1);
    el.append(td1);

    const td2 = document.createElement('td');
    const edit2 = document.createElement('editable-text-view');
    edit2.innerText = value;
    edit2.dataset.type = 'value';
    td2.append(edit2);
    el.append(td2);

    const td3 = document.createElement('td');
    if (!specNoOpts) {
        const delBtn = document.createElement('button');
        delBtn.type = 'button'; delBtn.innerText = 'Delete';
        delBtn.dataset.type = 'delete';
        td3.append(delBtn);
    }
    el.append(td3);

    if (!doNotInsert) i18n_data.append(el);
    return el;
}
async function edit(lang) {
    if (editPending) return;
    const currentOffset = document.getElementById('main')?.scrollTop;
    
    editreset();
    currentFile.innerText = lang;
    defaultLang_e.innerText = globalThis.defaultLang;

    if (!edit_data[lang] || Reflect.ownKeys(edit_data[lang]).length < 1) {
        const message = globalThis.edit_handles[lang];
        try {
            const json = JSON.parse(await (await message.getFile()).text());
            if (!(typeof json === 'object') || json == null) throw new SyntaxError('Invalid Type in JSON: ' + (json === null ? 'null' : typeof (json)));
            edit_data[lang] = json;
        } catch (error) {
            if (error instanceof SyntaxError) {
                i18n_data.append('Invalid JSON content. The file needs to be repaired; however, it will lost all data storaged.\nDo you want to repair the file? ');
                const a = document.createElement('a');
                a.href = '#nop';
                a.onclick = async function () {
                    const node = document.createTextNode('Repairing, please wait...');
                    a.before(node);
                    try {
                        this.hidden = true;
                        const writable = await message.createWritable();
                        await writable.write(new Blob(['{}']));
                        await writable.close();
                        setTimeout(() => edit(lang), 10);
                    } catch (error) {
                        this.hidden = false;
                        alert('The file cannot be repaired. Please open your system explorer to lookup what happened. Error= ' + error);
                    }
                    node.remove();
                };
                a.innerHTML = 'Repair Now';
                i18n_data.append(a);
            } else {
                console.error('Unknown Error', error);
                alert('Unknown Error: ' + error);
            }
            return false;
        }
    }
    
    editPending = true;

    const ValueCreator = createEditItem('/NewValue@@d60c41933a05433fae92acdb4a35c35c.V0', '', {
        specNoOpts: true,
        specCustomKeyStr: 'Create New...',
    });
    ValueCreator.classList.add('is-internal');
    ValueCreator.addEventListener('beforeupdate', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const { newValue } = ev.detail;
        if (!newValue) return;
        edit_data[lang][newValue] = { message: '' };
        const el2 = (createEditItem(newValue, '', { doNotInsert: true }));
        i18n_data.firstElementChild ? i18n_data.firstElementChild.after(el2) : i18n_data.prepend(el2);
        // el2.scrollIntoView({ behavior: 'smooth' });
        globalThis.unsavedChangesInfo.add(globalThis.currentLang);
        ++globalThis.unsavedChanges;
    });
    
    if (!edit_data[lang]) edit_data[lang] = {};
    const ownDatas = Reflect.ownKeys(edit_data[lang]);
    if (globalThis.defaultLang && (lang !== globalThis.defaultLang) && edit_data[defaultLang]) {
        for (const i of Reflect.ownKeys(edit_data[defaultLang])) try {
            if (ownDatas.includes(i)) continue;
            const el = createEditItem(i, edit_data[defaultLang][i].message, { specNoOpts: true });
            el.classList.add('is-untranslated');

        } catch (error) {
            console.error(error);
            break
        }
    }

    for (const i of ownDatas) try {
        createEditItem(i, edit_data[lang][i].message);
    } catch (error) {
        console.error(error);
        break
    }

    globalThis.currentLang = lang;
    setTimeout(() => (document.getElementById('main')).scrollTop = currentOffset, 10);
    editPending = false;
}

treeMessages.addEventListener('click', function (ev) {
    if (ev.target?.tagName?.toLowerCase?.() !== 'a') return; 
    const data = ev.target.dataset.lang;
    edit(data);
}, true);

i18n_data.addEventListener('click', function (ev) {
    switch (ev.target?.dataset?.type) {
        case 'delete':
            delete edit_data[globalThis.currentLang][ev.target.parentElement.parentElement.dataset.key];
            globalThis.unsavedChangesInfo.add(globalThis.currentLang);
            ++globalThis.unsavedChanges;
            ev.target.parentElement.parentElement.remove();
            break;
    
        default:
            break;
    }
}, true);

i18n_data.addEventListener('beforeupdate', function (ev) {
    const el = ev.target;
    if (!el) return;
    if (el.dataset.type === 'key' && el.parentElement.parentElement.classList.contains('is-untranslated')) {
        ev.preventDefault();
    }
});

i18n_data.addEventListener('updated', function (ev) {
    const el = ev.target;
    if (el?.tagName?.toLowerCase?.() !== 'editable-text-view') return;
    const type = el.dataset.type;
    if (type !== 'key' && type !== 'value') return;
    const datakey = el.parentElement.parentElement.dataset.key;
    if (type === 'key') {
        const newkey = ev.detail.newValue;
        edit_data[globalThis.currentLang][newkey] = edit_data[globalThis.currentLang][datakey];
        delete edit_data[globalThis.currentLang][datakey];
        el.parentElement.parentElement.dataset.key = newkey;
    }
    if (type === 'value') {
        if (!edit_data[globalThis.currentLang][datakey]) edit_data[globalThis.currentLang][datakey] = {};
        edit_data[globalThis.currentLang][datakey].message = ev.detail.newValue;
    }
    if (el.parentElement.parentElement.classList.contains('is-untranslated')) {
        el.parentElement.parentElement.remove();

        const el2 = (createEditItem(datakey, edit_data[globalThis.currentLang][datakey].message, { doNotInsert: true }));
        const tag = i18n_data.querySelector('tr:not(.is-untranslated):not(.is-internal)');
        tag ? tag.before(el2) : i18n_data.prepend(el2);
    }
    globalThis.unsavedChangesInfo.add(globalThis.currentLang);
    ++globalThis.unsavedChanges;
});

i18n_langCreate.onclick = i18n_langRemove.onclick = function () {
    create_or_remove_i18nLang.showModal();
}

i18n_langopt1.onclick = async function () {
    const lang = create_or_remove_i18nLang__lang.value;
    if (!lang) return alert('Please input language code');
    this.disabled = true;

    const stop = Symbol();
    const key = lang;
    const el = document.createElement('tree-node');
    const tt = document.createElement('tree-text');
    const tc = document.createElement('tree-content');
    const a = document.createElement('a');
    try {
        el.append(tt); el.append(tc);
        tt.innerText = key;

        a.href = '#nop';
        a.dataset.lang = key;
        a.innerText = 'messages.json';

        const locales = await myEntry.getDirectoryHandle('_locales');
        const new_entry = await locales.getDirectoryHandle(lang, { create: true });
        treeMessages.append(el);
        const file_handle = await new_entry.getFileHandle('messages.json', { create: true });
        const size = (await file_handle.getFile()).size;
        if (size) {
            if (!confirm('The target language already exists.\nOverwrite?')) throw stop;
        }
        if (!size) {
            edit_data[key] = null;
            edit_handles[key] = file_handle;
        }

        const writable = await file_handle.createWritable();
        await new Promise(r => setTimeout(r, 500));
        treeMessages.append(a);
        await writable.write(new Blob(['{}']));
        await writable.close();


        if (!size) {
            tc.append(a);
        } else {
            el.remove(); a.remove();
        }


        create_or_remove_i18nLang.close();
        queueMicrotask(() => edit(lang));
    } catch (error) {
        if (el.isConnected) el.remove();
        if (a.isConnected) a.remove();
        if (error !== stop) alert('Error: ' + error);
    }



    this.disabled = false;
}
i18n_langopt2.onclick = async function () {
    const lang = create_or_remove_i18nLang__lang.value;
    if (!lang) return alert('Please input language code');
    if (!confirm('Are you sure?\n\nYou are going to remove: ' + lang)) return;
    if (globalThis.unsavedChanges && !confirm('You have unsaved changes. If continue, you will lost your changes.\n\nContinue?')) return;
    this.disabled = true;

    try {
        const locales = await myEntry.getDirectoryHandle('_locales');
        await locales.removeEntry(lang, { recursive: true });
        create_or_remove_i18nLang.close();
        setTimeout(() => loadProject.click());
    } catch (error) {
        alert('Error: ' + error);
    }

    this.disabled = false;
}



