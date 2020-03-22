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

window.createErr=function (name,message){
let obj={};
if(typeof(name)!=="string"||typeof(message)!=="string"){
throw createErr("createErrError",'The "createErr" function is needs two parameter.')
}
obj.name=name;
obj.message=message;
throw obj;
}

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

})()
