/****
233
****/
(function(){
var d=function(elem,set){
elem.style.position="absolute";
elem.style.left="50%";
elem.style.top="50%";
elem.style.marginLeft="-50%";
elem.style.marginTop="-50%";
elem.style.backgroundColor=(set.backgroundColor||
set.bgcolor||"#fff");

};
window.dialog=window.Dialog=d;
return d;
})()
