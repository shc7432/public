(function(){
var i=new Date().getTime();
if(confirm('View method?\nYes -- in new window\nNo -- in this window')){
let w=window.open();w.document.open();
w.document.write('<meta name=viewport content="width=device-width">'+'<textarea id=v'+
' style="z-index:1;position:fixed;left:0;top:0;width:100%;height:100%">'+
'</textarea><span style="position:fixed;top:0;right:0;background-color:#fff;z-index:2;border:1px solid #ccc">'+
'<a onclick="let w=window.open();w.document.open();w.document.write(v.value)">Preview</a> | '+
'<a onclick="window.close()">Close | x</a></span>');w.document.getElementById('v').value=
document.documentElement.innerHTML.replace(new RegExp('</textarea>','igm'),'</text area>');
return true};var a=document.createElement('div');
a.innerHTML=('<textarea id=wetxtasorgcodeelem'+i+
' style="background-color:#fff;z-index:2147483640;position:fixed;left:0;top:0;width:100%;height:50%">'+
document.documentElement.innerHTML.replace(new RegExp('</textarea>','igm'),'</text area>')+
'</textarea><span style="position:fixed;top:0;right:0;background-color:#fff;z-index:2147483647;border:1px solid #ccc">'+
'<a onclick="document.documentElement.innerHTML=wetxtasorgcodeelem'+i+'.value">Save</a> | <a onclick="this.parentElement.hidden=1;'+
'wetxtasorgcodeelem'+i+'.hidden=1">Close | x</a></span>');
document.documentElement.appendChild(a);
})();
