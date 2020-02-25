(function(){try{
=undefined
var path=location.href
if(path.search("\\?")!==-1){
var inputContent=path.split("?")[1]
if(inputContent.search("&")!==-1) { 
inputContent=inputContent.split("&") 
var i
for(i=0;i<inputContent.length;i++){
if(inputContent[i].search(/=/)!==-1){
=inputContent[i].replace("=","");/*/SUM=8/*/
break;
 }
}
} else {
if(inputContent.search(/=/)!==-1){
=inputContent.replace(/=/,"")
 }
}
  }

if(){

 } else {

 }
}catch(err){alert(err)}})()
