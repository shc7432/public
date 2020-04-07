/********
DATE=2020-03-22
LASTDATE=2020-03-25
********/

/****
You can also use this link:
<script src="https://shc7432.github.io/public/something/sometool.js"></script>
Are you want test your code's error?You can use this link:
<script src="https://shc7432.github.io/public/getLinkInput/testcode.js"></script>
****/

(function(){

"use strict";

Number.prototype.pow=function(a){
if(isNaN(a)) a=1;
return (this**a);
}
String.prototype.showByAlert=function(){
alert(this);
}
String.prototype.dmwrite=function(){
document.write(this);
}
Object.prototype.clone=function(){
let a=JSON.stringify(this);
return JSON.parse(a);
}
Object.defineProperty(Number.prototype, "pow", {
  writable: false,
  enumerable: false,
  configurable: true
});
Object.defineProperty(String.prototype, "showByAlert", {
  writable: false,
  enumerable: false,
  configurable: true
});
Object.defineProperty(String.prototype, "dmwrite", {
  writable: false,
  enumerable: false,
  configurable: true
});
Object.defineProperty(Object.prototype, "clone", {
  writable: false,
  enumerable: false,
  configurable: true
});

window.copytext=function(text){
if(typeof document.execCommand!=="function"){
//alert("复制失败，请长按复制");
return false;
}
var dom = document.createElement("textarea");
dom.value = text;
dom.setAttribute('style', 'display: block;width: 1px;height: 1px;');
if(document.body){
document.body.appendChild(dom);
} else if(document.documentElement){
document.documentElement.appendChild(dom);
} else {
//alert("复制失败，请长按复制");
return false;
}
dom.select();
 var result = document.execCommand('copy');
if(document.body){
document.body.removeChild(dom);
} else if(document.documentElement){
document.documentElement.removeChild(dom);
} else {
//alert("复制失败，请长按复制");
return false;
}
if (result) {
//alert("复制成功");
return true;
}
if(typeof document.createRange!=="function"){
//alert("复制失败，请长按复制");
return false;
}
var range = document.createRange();
var div=document.createElement('div');
div.innerHTML=text;
div.setAttribute('style', 'height: 1px;fontSize: 1px;overflow: hidden;');
if(document.body){
document.body.appendChild(div);
} else if(document.documentElement){
document.documentElement.appendChild(div);
} else {
//alert("复制失败，请长按复制");
return false;
}
range.selectNode(div);
const selection = window.getSelection();
if (selection.rangeCount > 0){
selection.removeAllRanges();
}
selection.addRange(range);
document.execCommand('copy');
//alert("复制成功")
return true;
}

window.aesPwAdd=(function(){
if(!window.CryptoJS) return false;
return function(){
var plaintText = arguments[0];
var keyStr = arguments[1];
var key = CryptoJS.enc.Utf8.parse(keyStr);
var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
mode: CryptoJS.mode.ECB,
padding: CryptoJS.pad.Pkcs7
});
var encryptedBase64Str = encryptedData.toString();
console.log(encryptedBase64Str);
return encryptedData.ciphertext.toString();
}
})()
window.aesPwUnAdd=(function(){
if(!window.CryptoJS) return false;
return function(){
try{
var encryptedHexStr = CryptoJS.enc.Hex.parse(arguments[0]);
var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, arguments[1], {
mode: CryptoJS.mode.ECB,
padding: CryptoJS.pad.Pkcs7
});
return decryptedData.toString(CryptoJS.enc.Utf8);
}catch(err){return "Incorrect password."}
}
})()

})()
