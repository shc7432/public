/********
DATE=2020-02-26
LASTDATE=2020-02-26
********/

/****
You can also use this link:
<script src="https://shc7432.github.io/public/getLinkInput/getLinkInput.js"></script>
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
(function(){
var i
var testscript=document.querySelectorAll('script[type="test/js"]')
for(i=0;i<testscript.length;i++){
try{
eval(testscript[i].innerHTML)
}
catch(err){document.body.innerHTML+="<br>"+err;console.log(err)}
}
})()
