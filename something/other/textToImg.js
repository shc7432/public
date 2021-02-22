function textToImg(val="",fontSize=12,fontColor="#abcdef") {
    var len = val.length;/*文字长度*/
    var i = 0;
    //var fontSize = 12;/*文字大小*/
    var fontWeight = 'normal';/*normal正常;bold粗*/
    var txt = val;
    var canvas = document.createElement("canvas");
    if (txt == '') {
        return false;
    }
    if (len > txt.length) {
        len = txt.length;
    }
    canvas.width = fontSize * len;
    canvas.height = fontSize * (3 / 2)
            * (Math.ceil(txt.length / len) + txt.split('\n').length - 1);
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = fontColor;/*颜色*/
    context.font = fontWeight + ' ' + fontSize + 'px 微软雅黑';
    context.textBaseline = 'top';
    canvas.style.display = 'none';
    //console.log(txt.length);
    function fillTxt(text) {
        while (text.length > len) {
            var txtLine = text.substring(0, len);
            text = text.substring(len);
            context.fillText(txtLine, 0, fontSize * (3 / 2) * i++,
                    canvas.width);
        }
        context.fillText(text, 0, fontSize * (3 / 2) * i, canvas.width);
    }
    var txtArray = txt.split('\n');
    for (var j = 0; j < txtArray.length; j++) {
        fillTxt(txtArray[j]);
        context.fillText('\n', 0, fontSize * (3 / 2) * i++, canvas.width);
    }
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    //var img = $("img");
    //img.src = canvas.toDataURL("image/png");
    return canvas.toDataURL("image/png");
}
