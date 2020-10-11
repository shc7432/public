/****
sTools javascript
========
CreateDate: 2020-08-28
LastUpdataDate: 2020-10-07
========
#END#
========
****/
(function(newobject,w,d,run,norun){
//Verify parameter
if(!(typeof(newobject)=="object"&w==window&d==
document&run&(!norun))) return false;
//End #Verify parameter#
function loadjs(a,b,c,d) {
/**
@a src or config
@b config
@c callback
@d error handler
**/
  let script = document.createElement('script');
  script.src = typeof(a)=="string" ? a : typeof(a)==
  "object" ? (a.src||a.href||"PLACEHOLDER") : typeof(
  b)=='object' ? (b.src||b.href||"PLACEHOLDER") : 
  "PLACEHOLDER";
  script.async = typeof(a)==
  "object" ? (a.async||false) : typeof(b)=='object' ?
  (b.async||false) : false;
  //ONLOAD
  script.onload= typeof(a)=='object' ? ((a.callback||
  a.onload||false) ? (a.callback||a.onload) : 
  undefined) : typeof(b)=='object' ? ((b.callback||
  b.onload||false) ? (b.callback||b.onload) : 
  undefined) : typeof(c)=='function' ? c : undefined;
  //ONERROR
  script.onerror= typeof(a)=='object' ? ((a.onerror||
  false) ? a.onerror : undefined) : typeof(b)==
  'object' ? ((b.onerror||false) ? b.onerror : 
  undefined) : typeof(d)=='function' ? d : undefined;
  document.head.appendChild(script);
  return script;
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
//Config parameter
s.noConflict=function(){
  return delete window.sTools ? this : false ;
};
s.unins000=s.uninstall=function(){
  return delete window.sTools && delete window.
gadgetsInDomainShc7432;};
s.addItem=function(ine,ict){//itemname,itemcontent
  var s=window.gadgetsInDomainShc7432;
  try{if(typeof(ine)!="string") return !0;}
  catch(e){return !0;};
  return (s[ine]=s.prototype[ine]=ict) ? !!1 : !!0 ;
};
s.removeItem=function(ina){
  var s=window.gadgetsInDomainShc7432;
  return delete s[ina]&&delete s.prototype[ina];
};
s.addItem('loadjs',loadjs);
//load JavaScript
loadjs("https://shc7432.github.io/public/something/"+
"other/dialog.js");/*
s.loadExternalJs=function(){*/
const JS_DOMAIN="https://shc7432.github.io",
THE_SOMETHING=JS_DOMAIN+"/public/something/",
THE_TOOLS=JS_DOMAIN+"/cdn/js/stools/";
loadjs(THE_SOMETHING+"sometool.js");
loadjs('https://shc0743.github.io/test/files/'+
'compression.js');
loadjs(THE_TOOLS+"copytext.js");/*
delete window.gadgetsInDomainShc7432.loadExternalJs};
loadjs("https://shc7432.github.io/cdn/js/stools/"+
"termsofservice.js");*/
//set toString
(function set_functions_toString(obj){
function F(){return ("function(){\n"+
"  [native code]\n}")};
for(let i in obj){
  let sp = obj;
  if(typeof sp[i]=='function'){
    sp[i].toString=F;
  } else if(typeof sp[i]=='object') {
    set_functions_toString(sp[i]);
  } else continue;
};
if(typeof obj=='function') obj.toString=F;
})(s);
//ok&set window variable
w.sTools=w.gadgetsInDomainShc7432=s;
})(new Object(),window,document,1,0);
