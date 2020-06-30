/*

**
* js使用canvas将文字转换成图像数据base64
* @param {string}    text              文字内容  "abc"
* @param {string}    fontsize          文字大小  20
* @param {function}  fontcolor         文字颜色  "#000"
* @param {boolean}   imgBase64Data     图像数据
*/
textToImg= function (text,set){
    var canvas = document.createElement('canvas');
    var s=(typeof(set)=="object"||{});
    //小于32字加1  小于60字加2  小于80字加4    小于100字加6
    $buHeight = 0;
    fontsize=(s.fontSize||s.fontsize||30);
    if(fontsize <= 32){ $buHeight = 1; }
    else if(fontsize > 32 && fontsize <= 60 ){ $buHeight = 2;}
    else if(fontsize > 60 && fontsize <= 80 ){ $buHeight = 4;}
    else if(fontsize > 80 && fontsize <= 100 ){ $buHeight = 6;}
    else if(fontsize > 100 ){ $buHeight = 10;}
    //对于g j 等有时会有遮挡，这里增加一些高度
    canvas.height=fontsize + $buHeight ;
    var context = canvas.getContext('2d');
    // 擦除(0,0)位置大小为200x200的矩形，擦除的意思是把该区域变为透明
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = fontcolor;
    context.font=fontsize+"px "+(s.fontFamily||s.fontfamily||"Arial");
    //top（顶部对齐） hanging（悬挂） middle（中间对齐） bottom（底部对齐） alphabetic是默认值
    context.textBaseline = (s.textBaseline||textbaseline||'middle');
    context.fillText(text,0,fontsize/2)
    //如果在这里直接设置宽度和高度会造成内容丢失 , 暂时未找到原因 , 可以用以下方案临时解决
    //canvas.width = context.measureText(text).width;
    //方案一：可以先复制内容  然后设置宽度 最后再黏贴   
    //方案二：创建新的canvas,把旧的canvas内容黏贴过去 
    //方案三： 上边设置完宽度后，再设置一遍文字
    //方案一： 这个经过测试有问题，字体变大后，显示不全,原因是canvas默认的宽度不够，
    //如果一开始就给canvas一个很大的宽度的话，这个是可以的。   
    //var imgData = context.getImageData(0,0,canvas.width,canvas.height);  //这里先复制原来的canvas里的内容
    //canvas.width = context.measureText(text).width;  //然后设置宽和高   
    //context.putImageData(imgData,0,0); //最后黏贴复制的内容
    //方案三：改变大小后，重新设置一次文字
    canvas.width = context.measureText(text).width;
    context.fillStyle = fontcolor;
    context.font=fontsize+"px "+(s.fontFamily||s.fontfamily||"Arial");
    context.textBaseline = (s.textBaseline||textbaseline||'middle');
    context.fillText(text,0,fontsize/2)
 
    var dataUrl = canvas.toDataURL('image/png');//注意这里背景透明的话，需要使用png
    return dataUrl;
}
/*/
window.loadjs=window.loadJS=(function(){
    var head = document.getElementsByTagName('head')[0]; 
    var script= document.createElement("script"); 
    script.type = "text/javascript"; 
    script.src=arguments[0]; 
    head.appendChild(script); 
    if(/ie/i.test(navigator.userAgent)) return script;
    script.onload=arguments[1];
    if(typeof arguments[1] != "function" ) script.onload=undefined;
    return script;
})
loadjs("https://html2canvas.hertzen.com/dist/html2canvas.js")
window.htmlToImg=function(){
    if(typeof arguments[0] == "object") {var _canvas=arguments[0]} else return (false);
    var canvas2 = document.createElement("canvas");
    var w = parseInt(window.getComputedStyle(_canvas).width);
    var h = parseInt(window.getComputedStyle(_canvas).height);
    //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
    canvas2.width = w * 2;
    canvas2.height = h * 2;
    canvas2.style.width = w + "px";
    canvas2.style.height = h + "px";
    //可以按照自己的需求，对context的参数修改,translate指的是偏移量
    //  var context = canvas.getContext("2d");
    //  context.translate(0,0);
    var context = canvas2.getContext("2d");
    context.scale(2, 2);
    var arg1=arguments[1];
    html2canvas(arguments[0], { backgroundColor: "test" }).then(function(canvas) {
    var src=canvas.toDataURL("image/png");
    if(typeof arg1 == "function") arg1(src);
    });
    
}
/*/
