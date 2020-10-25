(function(){
var i=new Date().getTime();
document.documentElement.innerHTML+=( true ? (
'<textarea id=wetxtasorgcodeelem'+i+
' style="z-index:2147483640;position:fixed;left:0;top:0;width:100%;height:50%">'+
document.documentElement.innerHTML+
'</textarea><span style="position:fixed;top:0;right:0;background-color:#fff;z-index:2147483647;border:1px solid #ccc">'+'
<a onclick="document.documentElement.innerHTML=wetxtasorgcodeelem'+i+'.value">Save</a> | <a onclick="this.hidden=1;'+
'wetxtasorgcodeelem'+i+'.hidden=1">Close | x</a></span>'
) : false );
})();
