(function(){
var hexscript=document.querySelectorAll('script[type="hex/js"]')
var i
for(i=0;i<hexscript.length;i++){
try{
eval(hexscript[i].innerHTML)
}
catch(err){document.body.innerHTML+="<br>"+err;console.log(err)}
}
var testscript=document.querySelectorAll('script[type="test/js"]')
for(i=0;i<testscript.length;i++){
try{
eval(testscript[i].innerHTML)
}
catch(err){document.body.innerHTML+="<br>"+err;console.log(err)}
}
})()