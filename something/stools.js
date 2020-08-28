/****
sTools javascript
========
CreateDate: 2020-08-28
LastUploadDate: 2020-08-28
========
****/
(function(newobject,w,d,run,norun){
//Verify parameter
if(!(typeof(newobject)=="object"&w==window&d==
document&run&(!norun))) return false;
//End #Verify parameter#
function loadjs(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
}
var s=new Object();
Object.defineProperty(s,"noConflict",{
get() {
  return function(){
    return delete window.sTools ? this : false ;
  }
}
set(val) {}
})

w.sTools=w.gadgetsInDomainShc7432=s;
})(new Object(),window,document,1,0)
