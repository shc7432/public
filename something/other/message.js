/********
DATE: 2020-05-31
METHOD: [[
<script src="https://shc7432.github.io/public/something/other/message.js"></script>
or..
<script src="//shc7432.github.io/public/something/other/message.js"></script>
or..
<script src="/public/something/other/message.js"></script>
]]
********/

(function(){
document.documentElement.innerHTML+="<span id=messageElement></span>"
var msgelem=messageElement;
msgelem.innerHTML+=`<style>
.inJavaScriptFunctionCreateMessageMessageElementStyle {
position: absolute;
z-index: 1;
overflow: auto;
}
</style>`
window.createMessage=window.showMessage=function(text,obj){
  msgelem.innerHTML+="<span class=inJavaScriptFunction"+
  "CreateMessageMessageElementStyle></span>"
  var elem=document.querySelectorAll(
  ".inJavaScriptFunctionCreateMessageMessageElementStyle");
  elem=elem[elem.length-1];
  if(typeof obj != "object") obj={};
  elem.style.backgroundColor=(obj.bgcolor||obj.backgroundColor||"#000000");
  elem.style.color=(obj.color||"#ffffff");
  elem.style.left=(obj.x||obj.left||0);
  elem.style.top=(obj.y||obj.top||0);
  elem.innerHTML=(text||obj.text||obj.content||obj.innerHTML||"")
  
}

})()
