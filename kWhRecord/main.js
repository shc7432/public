// main.js


if ('serviceWorker' in globalThis.navigator) {
    navigator.serviceWorker.register('./sw.js');
};
import './sw_env.js';

import { delay, wrapQueryElement, showTip } from './util.js';


const app = document.getElementById('app');
if (!app) throw new Error('#app not found');
const $ = wrapQueryElement(app);


//#region open db
$('.loading-mask').innerHTML = '正在处理数据库';
await import('./userdata.js');

//#endregion


//#region register event handlers
$('.loading-mask').innerHTML = '正在注册事件处理程序';
$('#updateAllResources').on('click', async function () {
    if (this.dataset.na) return;
    this.previousElementSibling.showModal();
    await delay();
    caches.delete(globalThis.sw_env.cacheName);
    setTimeout(() => location.reload(), 1000);
});

//#endregion


//#region open db
$('.loading-mask').innerHTML = '正在处理数据';
const data_delete = function (id) {
    if (typeof id === 'object') id = id.id;
    return userdata.delete('records', id);
};
const data_computeId = function (obj) {
    const date = obj.date.split('-');
    const time = obj.time.split(':');
    const dd = new Date(0);
    dd.setFullYear(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]));
    dd.setHours(parseInt(time[0]), parseInt(time[1]), parseInt(time[2]), 0);
    return dd.getTime();
};
const data_addRow = function (obj) {
    const tr1 = document.createElement('tr'), td = [],
        a1 = document.createElement('a');
    for (let i = 0; i < 4; ++i) td.push(document.createElement('td'));
    tr1._$$data = obj;
    tr1.className = 'is-record user-data';
    td[0].dataset.keyPath = 'value';
    td[1].dataset.keyPath = 'date';
    td[2].dataset.keyPath = 'time';
    for (let i = 0, l = td.length; i < l; ++i) td[i].innerText = String(obj[td[i].dataset.keyPath] || '');
    for (let i = 0; i < 3; ++i) td[i].tabIndex = 0;
    a1.href = 'javascript:';
    a1.innerText = '删除';
    a1.dataset.action = 'delete';
    td[3].append(a1);
    tr1.append.apply(tr1, td);
    if ($('#records tbody').firstElementChild)
        $('#records tbody').firstElementChild.after(tr1);
    else $('#records tbody').append(tr1);
};
const fillZero = function (x, len = 1) {
    if (typeof x !== 'string') x = String(x);
    if (x.length < len) x = '0'.repeat(len - x.length) + x;
    return x;
};
const data_Add = async function () {
    const ipt = $('#records .user-input input');
    if (!ipt.value) return;
    const now = new Date();
    now.setMilliseconds(0); // normalize
    const date = `${fillZero(now.getFullYear(),4)}-${fillZero(now.getMonth()+1,2)}-${fillZero(now.getDate(),2)}`;
    const time = `${fillZero(now.getHours(),2)}:${fillZero(now.getMinutes(),2)}:${fillZero(now.getSeconds(),2)}`;
    const obj = {
        id: now.getTime(),
        date, time,
        value: ipt.value,
    };
    await userdata.put('records', obj);
    ipt.value = '';
    data_addRow(obj);
};

{
    const tr1 = document.createElement('tr');
    const td = document.createElement('td');
    const ipt = document.createElement('input');
    ipt.onkeydown = (ev) => { if (ev.key === 'Enter') { ev.preventDefault(); data_Add() } }
    ipt.onblur = () => { data_Add() };
    td.className = 'user-input';
    td.append(ipt);
    tr1.append(td);
    for (const i of ('\u2060'.repeat(3)))tr1.append(document.createElement('td'));
    $('#records tbody').prepend(tr1);
}

$('.loading-mask').innerHTML = '正在处理数据 >> 正在注册事件处理程序';
$('#records').on('click', function (ev) {
    if (ev.target.tagName.toUpperCase() !== 'A') return;

    switch (ev.target.dataset.action) {
        case 'delete':
            data_delete(ev.target.parentElement.parentElement._$$data).then(() => {
                ev.target.parentElement.parentElement.remove();
            }).catch(error => { console.error(error) });
            break;
    
        default:;
    }
});
$('#records').on('click', function (ev) {
    const target = ev.target;
    if (!target || target.tagName.toUpperCase() !== 'TD' ||
        !target.parentElement.classList.contains('user-data')) return;

    switch (target.dataset.keyPath) {
        case undefined:
            break;

        case 'date':
        case 'time':
        {
            target.classList.add('user-input');
            target.innerHTML = '';
            const ipt = document.createElement('input');
            ipt.type = target.dataset.keyPath;
            ipt.value = String(target.parentElement._$$data[target.dataset.keyPath]);
                target.dataset.keyPath === 'time' && (ipt.step = 1);
            const r = async () => {
                const newData = structuredClone(target.parentElement._$$data);
                try {
                    await data_delete(newData.id);
                    newData[target.dataset.keyPath] = ipt.value;
                    newData.id = data_computeId(newData);
                    await userdata.put('records', newData);
                    await data_Load();
                }
                catch (error) {
                    console.error(error);
                    ipt.replaceWith(document.createTextNode(String(target.parentElement._$$data[target.dataset.keyPath])));
                }
            };
            ipt.onblur = () => r();
            target.append(ipt);
            ipt.focus();
        }
            break;
    
        default: {
            target.classList.add('user-input');
            target.innerHTML = '';
            const ipt = document.createElement('input');
            ipt.type = 'text';
            ipt.value = String(target.parentElement._$$data[target.dataset.keyPath]);
            const r = async () => {
                await new Promise(resolve => queueMicrotask(resolve));
                const newData = structuredClone(target.parentElement._$$data);
                try {
                    if (!ipt.value) throw new TypeError('the value is empty.');
                    await data_delete(newData.id);
                    newData[target.dataset.keyPath] = ipt.value;
                    await userdata.put('records', newData);
                    ipt.replaceWith(document.createTextNode(ipt.value));
                }
                catch (error) {
                    console.error(error);
                    showTip(String(error));
                    ipt.replaceWith(document.createTextNode(String(target.parentElement._$$data[target.dataset.keyPath])));
                }
            };
            ipt.onblur = () => r();
            ipt.onkeydown = ev => {
                if (ev.key === 'Enter') {
                    ev.preventDefault(); return ipt.blur();
                }
                if (ev.key === 'Escape') {
                    ipt.replaceWith(document.createTextNode(String(target.parentElement._$$data[target.dataset.keyPath])));
                    return;
                }
            };
            target.append(ipt);
            ipt.focus();
        }
    }
});
$('#records').on('keydown', function (ev) {
    const target = ev.target;
    if (ev.key !== 'Enter') return;
    if (!target || target.tagName.toUpperCase() !== 'TD' ||
        !target.parentElement.classList.contains('user-data')) return;
    target.dispatchEvent(new(PointerEvent || MouseEvent)('click', {
        bubbles: true, cancelable: true
    }));
});

$('.loading-mask').innerHTML = '正在处理数据 >> 正在加载数据';
const data_Load = async function () {
    let frow = null;
    while ((frow = $('#records tbody').firstElementChild.nextElementSibling)) {
        frow.remove();
    }

    let cursor = await userdata.transaction('records').store.openCursor();

    while (cursor) {
        // console.log(cursor.key, cursor.value);
        data_addRow(cursor.value);
        cursor = await cursor.continue();
    }
};
await data_Load();
//#endregion


//#region data
$('.loading-mask').innerHTML = '正在加载数据用量情况';
try {
    const est = await navigator.storage.estimate();
    if (!est) throw 1;

    $('#data_estimate_usage').innerText = est.usage;
    $('#data_estimate_quota').innerText = est.quota;
} catch { }
$('#confirmClearData').on('click', async function () {
    this.parentElement.oncancel = () => false;
    this.parentElement.querySelectorAll('button').forEach(el => el.disabled = true);

    await userdata.clear('records');
    await delay(1000);
    
    this.parentElement.close();
    location.reload();
});
//#endregion


$('.loading-mask').innerHTML = '正在完成';
await delay((Math.floor(Math.random() * 1000)));
$().classList.remove('is-loading');


