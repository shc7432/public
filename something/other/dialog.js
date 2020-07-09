/****
233
****/
(function(){
/*
Code:
========
.login{/**样式的名字 对应class=xxx**
width:200px;/**宽度**
height:100px;/**高度**
position:absolute;/**绝对定位**
left:50%;/**左边50%**
top:50%;/**顶部50%**
margin-top:-50px;/**上移-50%**
margin-left:-100px;/**左移-50%**
}
========
*/
function d(elem,set){
//set return value
var rtn={};
rtn.oSet=elem.innerHTML;
rtn.destroy=function(){
elem.innerHTML=this.oSet;
}
//set styles
elem.style.position="absolute";
elem.style.left="50%";
elem.style.top="50%";
elem.style.marginLeft="-50%";
elem.style.marginTop="-50%";
elem.style.backgroundColor=(set.backgroundColor||
set.bgcolor||"#fff");
elem.style.width=(set.width||screen.width-200+"px");
elem.style.height=(set.height||"auto");
elem.style.zIndex=(set.zIndex||set.zindex||"5");
//set modal
if(set.modal){
let el=document.createElement("span");
el.style.width=el.style.height="100%";
el.style.position="absolute";
el.style.top=el.style.left="0px";
document.documentElement.append(el)
}
//set title
if(!(set.notSetTitle||set.notitle)){

}
//set others

};
window.dialog=window.Dialog=d;
return d;
})()
