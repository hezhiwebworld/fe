
define(['jquery','cookie'],function($) {
    //引入的方式和主模块没什么区别
    var $signin  =  $('.signin');
    
    //给提交按钮注册点击事件
    $signin.on( 'click' , clickHandle )

    function clickHandle(){
      //表单序列化
      var tc_name = $('#name').val();
      var tc_pass = $('#pass').val();
      var formData = $('form').serialize();
      //console.log( formData )
      //这里做个简易判断
        //  if( tc_name == '' || tc_pass == '' ){
        //      alert('用户名和密码不能为空')
        //      return false;
        //  }
      //向服务器提交数据
      $.ajax({
         type :'post',
         url : '/api/login',
         data: formData,
         success : function(res){
             console.log( res );
             if( res.code == 200 && res.msg == "登录成功!"){
             	 $.cookie( 'userinfo' , JSON.stringify(res.result) , {expires: 7, path: '/'})
                window.location.href = '/views/index/dashboard.html'
             }
            //设置cookie的语法
            
         },
         error : function(error){
            alert('用户名或密码错误')
         }
      })
      //组织浏览器的默认事件
      return false;
    }
});

