/********
DATE=2020-03-22
LASTDATE=2020-03-24
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
  value: function(){},
  writable: false,
  enumerable: false,
  configurable: true
});
Object.defineProperty(String.prototype, "showByAlert", {
  value: function(){},
  writable: false,
  enumerable: false,
  configurable: true
});
Object.defineProperty(String.prototype, "dmwrite", {
  value: function(){},
  writable: false,
  enumerable: false,
  configurable: true
});
Object.defineProperty(Object.prototype, "clone", {
  value: function(){},
  writable: false,
  enumerable: false,
  configurable: true
});

{
window.disabledEval=function(strone){
let eval_b=window.eval;
if(strone){
window.eval=undefined;
Object.defineProperty(window, "eval", {
  value: undefined,
  writable: false,
  enumerable: false,
  configurable: false
});
return eval_b;
}

window.eval=undefined;

return eval_b;

 }
window.disabledDisabledEval=function(stone){
let disabledEval_b=window.disabledEval;
window.disabledEval=undefined;
if(stone){
Object.defineProperty(window, "disabledEval", {
  value: undefined,
  writable: false,
  enumerable: false,
  configurable: false
});
}
return disabledEval_b;
 }
}

window.random=function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

Object.prototype.dialog=function(){
if(this.title===undefined||this.text===undefined||
window.jQuery===undefined||this.content===undefined||
this.class===undefined) return false;
let elem=document.querySelectorAll(".aNewDivThisDivIsUseToDialog");
elem=elem[elem.length-1];
elem.innerHTML+=
`<div class="${this.class}" title="${this.title}">${this.text}</div>`
};
(function(){
  // 创建一个新的 span 元素
  let newDiv = document.createElement("span"); 
  newDiv.class="aNewDivThisDivIsUseToDialog";
  newDiv.hidden=true;
  ///////// 
  // 给它一些内容
  //let newContent = document.createTextNode("Hi there and greetings!"); 
  // 添加文本节点 到这个新的 span 元素
  //newDiv.appendChild(newContent); 
  //
  // 将这个新的元素和它的文本添加到 DOM 中
  //let currentDiv = document.getElementById("div1");
  ///////// 
  document.documentElement.appendChild(newDiv); 
})()

})()
