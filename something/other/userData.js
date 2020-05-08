function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

if(localStorage.userData){
let ud=JSON.parse(localStorage.userData);
let udtime=ud.time;
udtime=new Date(udtime);
udtc=(((new Date()-udtime)/1000)/3600);
if(udtc>23){
if(1){
delete localStorage.userData;
location.reload(1);
} else {
location.reload(1);
}
} else {
window.userData=ud;
}
} else {
let ud=new Object();
ud.uid=getRandom(10000000,99999999);
ud.id=String(CryptoJS.MD5(ud.uid));
ud.rid="";
for(let i=0;i<36;i++){
let r=getRandom(0,35).toString(36);
ud.rid+=r;
}
ud.time=new Date();
uds=JSON.stringify(ud);
localStorage.userData=uds;
location.reload(1);
}
