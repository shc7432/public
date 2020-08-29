/****
sTools javascript
========
CreateDate: 2020-08-28
LastUpdataDate: 2020-08-28
========
#END#
========
****/
(function(newobject,w,d,run,norun){
//Verify parameter
if(!(typeof(newobject)=="object"&w==window&d==
document&run&(!norun))) return false;
//End #Verify parameter#
function loadjs(a,b) {
  let script = document.createElement('script');
  script.src = typeof(a)=="string" ? a : typeof(a)==
  "object" ? (a.src||a.href||"PLACEHOLDER") : typeof(
  b)=='object' ? (b.src||b.href||"PLACEHOLDER") : 
  "PLACEHOLDER";
  script.async = typeof(a)==
  "object" ? (a.async||false) : typeof(b)=='object' ?
  (b.async||false) : false;
  document.head.appendChild(script);
}
var s=function(IMPORT_FUNCTION){
const RUN_FUNCTION=IMPORT_FUNCTION?function(){
//Defined variable
//Not yet
//Run function
return IMPORT_FUNCTION();
}:false;
if(new.target){
return RUN_FUNCTION?RUN_FUNCTION():s.prototype;
}
if(!IMPORT_FUNCTION) return s.prototype;
return RUN_FUNCTION()
};
Object.defineProperty(s.prototype,"noConflict",{
get() {
  return function(){
    return delete window.sTools ? this : false ;
  }
}
set(val) {}
})
s.prototype.loadjs=loadjs;
//load JavaScript
loadjs();
w.sTools=w.gadgetsInDomainShc7432=s;
})(new Object(),window,document,1,0)
