/********
DATE=2020-02-26
LASTDATE=2020-03-18
********/

/****
You can also use this link:
<script src="https://shc7432.github.io/public/getLinkInput/getLinkInput.js"></script>
Are you want test your code's error?You can use this link:
<script src="https://shc7432.github.io/public/getLinkInput/testcode.js"></script>
****/

getUrlValue = function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            try {
                return decodeURIComponent(r[2]);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

window.getElement=function (elementname){
return document.getElementById(elementname);
}
window.document.element=function (Element){
return document.getElementById(Element);
}
window.ElementByTagName=function (Element){
return document.getElementsByTagName(Element);
}
window.tagElement=function (Element){
return document.getElementsByTagName(Element);
}
window.document.tagElement=function (Element){
return document.getElementsByTagName(Element);
}
window.addevent =function (ojt,even,func,capt){
if(capt===undefined) {capt=0}
ojt.addEventListener(even, func, capt);
/*addEventListener(event, function, useCapture);*/
}
window.addeventbyid =function (id,even,func,capt){
if(capt===undefined) {capt=0}
getElement(id).addEventListener(even, func, capt);
}

addevent(window,"load",function (){
try{
var nbs=tagElement('nbsp')
if(nbs.length!==0){
var nbi,nbn;
for(var i=0;i<nbs.length;i++){
  nbi=nbs[i].innerHTML
  nbsi=nbs[i]
    if(typeof(nbi)!==undefined) {
        if(!(isNaN(parseInt(nbi)))) {
nbn=parseInt(nbi)
nbs[i].innerHTML=""
for(var ii=0;ii<nbn+1;ii++){
nbs[i].innerHTML+="&nbsp;"
}
nbn=undefined
        }
    }
  nbi=undefined
  }
 }

 /*end-try*/;}
catch(err){alert(err)}
},false)
window.disableEval=function(){
window.eval=undefined
}
window.disableDisableEval=function(){
window.disableEval=undefined
}

function setCookie(cname, cvalue, exdays ,s) {
    var d = new Date();
    if(!s){
      d.setTime(d.getTime() + (exdays * 60 * 1000));
    } else {
      d.setTime(d.getTime() + (exdays * 1000));
    }
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    return getCookie(cvalue)
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
         }
        if (c.indexOf(name)  == 0) {
            return c.substring(name.length, c.length);
         }
    }
    return null;
}
function removeCookie(cname){
setCookie(cname,"",-1,false)
}
