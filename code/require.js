
function require(deps,callback){
    require.callback = callback;
    require.loaddeps(deps)  //加载require的依赖项
    
}


function define( deps,callback ){
    define.callback = callback  //借用这个东西将依赖项的回调函数返回值拿到
    define.loaddeps(deps)

}

//加载require的依赖项
require.loaddeps = function(deps = [],callback){
    var num = 0 ;   //标记有几个js要执行
    deps.forEach(function(element) {
        var script = document.createElement('script');
            script.src= element;
            document.body.appendChild(script)
    }, this);
}

//加载define的依赖项

define.loaddeps = function( deps = [],callback ){
    
    deps.forEach(function(ele){
         getcall(ele);
         //console.log(obj)
      
        
    })
   
    function getcall(ele,callback){
        var script = document.createElement('script');
        script.src = ele;
        document.body.appendChild(script);
        script.onload = function (callback) {
            //console.log(define.callback())
            
            var obj = define.callback()
           // console.log(obj)
           
             require.callback(obj)
      }
    }
    
}

require(['./a.js','./b.js'],function(obj){
    console.log(obj)
})