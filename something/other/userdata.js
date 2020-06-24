(function(){
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
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
    return getCookie(cname)
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

if(localStorage.userData){
let ud=JSON.parse(localStorage.userData);
let udtime=ud.time;
udtime=new Date(udtime);
udtc=(((new Date()-udtime)/1000)/3600);
if(udtc>23){
delete localStorage.userData;
location.reload(1);
} else {
ud.loginuser={
username: getCookie("loginusername")
}
ud.signin=function(){
var link=encodeURIComponent(location.href);
location.href="https://shc7432.github.io/download/user-center/user"+
"data/login.php?type=signin&returnto="+link;
}
ud.signup=function(){
var link=encodeURIComponent(location.href);
location.href="https://shc7432.github.io/download/user-center/user"+
"data/login.php?type=signup&returnto="+link;
}
window.userData=ud;
}
} else {
let ud=new Object();
ud.uid=getRandom(10000000,99999999);
ud.id=String(CryptoJS.MD5(ud.uid));
ud.rid="";
ud.users=[];
for(let i=0;i<36;i++){
let r=getRandom(0,35).toString(36);
ud.rid+=r;
}
ud.time=new Date();
uds=JSON.stringify(ud);
localStorage.userData=uds;
location.reload(1);
}

/****
HTML:

<script src="https://shc7432.github.io/public/something/other/userdata.js"></script>

****/

document.querySelectorAll(".userdata")[0].innerHTML=(
`<div style="font-size:10px;color:#ccc;">IP:<script>
document.write(getIP())</script></div>
<div style="font-size:10px;color:#ccc;">uid:<script>
document.write(userData.uid)</script></div>
<div style="font-size:10px;color:#ccc;">ID:<script>
document.write(userData.id)</script></div>
<div style="font-size:10px;color:#ccc;">RandomID:<script>
document.write(userData.rid)</script></div>
<div style="font-size:10px;color:#ccc;">username:<script>
document.write(userData.loginuser.username)</script></div>
<div style="font-size:10px;color:#ccc;">
<a href="javascript:userData.signin()">Sign in</a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:userdata.signup()">Sign up</a></div>`)

})()
