var  speedTest=require('../index');

console.dump=function(){
  var s=[],a=arguments;
  for(var n=0;n<a.length;n++) {
    if (typeof a[n]=="string"){
      s.push(a[n])
    } else {
      s.push(require('util').inspect(a[n],{colors:true,depth:null}));
    }
  }
  console.log(s.join(' '));
}

speedTest.visual({maxTime:10000,log:true,maxServers:4},function(err,data){
  console.dump(data);
});