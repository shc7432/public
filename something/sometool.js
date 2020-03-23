/********
DATE=2020-03-22
LASTDATE=2020-03-22
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

window.sum=function(){
let tsum=0;    //temp_sum
    for (let i = 0; i < arguments.length; i++) {
        if(!(isNaN(arguments[i]))) tsum += arguments[i];
    }
return tsum;
}

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

window.Calc=function(n1=1,n2=1){

  if(!new.target){ // 如果你没有通过 new 运行我
    return new calc(n1,n2); // ......我会给你添加 new
  }

this.read=function(){
return [n1,n2]
}
this.add=function(){
return n1+n2;
}
this.unadd=function(){
return n1-n2;
}
this.multiply=function(){
return n1*n2;
}
this.unmultiply=function(){
return n1/n2;
}
this.pow=function(){
return n1**n2;
}

}

})()
