// main.js


if ('serviceWorker' in globalThis.navigator) {
    navigator.serviceWorker.register('./sw.js');
};
import './sw_env.js';

import { delay, wrapQueryElement } from './util.js';


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
}
const data_addRow = function (obj) {
    const tr1 = document.createElement('tr'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        td4 = document.createElement('td'),
        a1 = document.createElement('a');
    tr1._$$data = obj;
    td1.innerText = String(obj.value);
    td2.innerText = obj.date;
    td3.innerText = obj.time;
    a1.href = 'javascript:';
    a1.innerText = '删除';
    a1.dataset.action = 'delete';
    td4.append(a1);
    tr1.append(td1, td2, td3, td4);
    if ($('#records tbody').firstElementChild)
        $('#records tbody').firstElementChild.after(tr1);
    else $('#records tbody').append(tr1);
};
const data_Add = async function () {
    const ipt = $('#records .user-input input');
    if (!ipt.value) return;
    const now = new Date();
    const date = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
    const time = `${now.getHours()}:${now.getMinutes()+1}:${now.getSeconds()}`;
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

const data_Load = async function () {
    let cursor = await userdata.transaction('records').store.openCursor();

    while (cursor) {
        // console.log(cursor.key, cursor.value);
        data_addRow(cursor.value);
        cursor = await cursor.continue();
    }
};
await data_Load();
//#endregion


$('.loading-mask').innerHTML = '正在完成';
await delay((Math.floor(Math.random() * 1000)));
$().classList.remove('is-loading');


