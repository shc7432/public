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

(function(){
try{
document.documentElement.innerHTML+="<div class="+
'"aNewDivThisDivIsUseToDialog"'+
"></div>"
Object.prototype.dialog=function(){
if(this.title===undefined||this.text===undefined||
window.jQuery===undefined||this.content===undefined||
this.class===undefined) return false;
let elem=document.querySelectorAll(".aNewDivThisDivIsUseToDialog");
elem=elem[elem.length-1];
elem.innerHTML+=
`<div class="${this.class}" title="${this.title}">${this.text}</div>`
};

}catch(err){alert(err)}
})()

})()
