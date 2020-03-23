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

window.Calc=function(...num){

  if(!new.target){              /////////// \\\\\\\\\\\\
    return new Calc(num);      // Hello //   \\ Happy! \\
  }                           ///////////     \\\\\\\\\\\\

if(num==undefined||num.length==0){
return 0;
}
for(let i=0;i<num.length;i++){
if(Array.isArray(num[i])) {
num=num[i];
break;
}
if(isNaN(num[i])) num[i]=0;
}

this.read=function(){
return num;
}
this.add=function(){
let s=0;
for(let i=0;i<num.length;i++){
s+=num[i]
}
return s;
}
this.unadd=function(){
let s=0;
for(let i=0;i<num.length;i++){
s-=num[i]
}
return s;
}
this.multiply=function(){
let s=0;
for(let i=0;i<num.length;i++){
s*=num[i]
}
return s;
}
this.unmultiply=function(){
let s=0;
for(let i=0;i<num.length;i++){
s/=num[i]
}
return s;
}
this.pow=function(onlytwo){
if(onlytwo){
return num[0]**num[1];
}
let s=num[0];
for(let i=1;i<num.length;i++){
s=s**num[i]
}
return s;
}

}

})()
