(function(){
var i
var testscript=document.querySelectorAll('script[type="test/js"]')
for(i=0;i<testscript.length;i++){
try{
eval(testscript[i].innerHTML)
}
catch(err){document.body.innerHTML+="<br>"+err;console.log(err)}
}
})()
