
define(['jquery','cookie'], function($) {
  //1-> 判断用户是否登陆每个页面需要使用
  validLogin()
  // console.log($ID)
  function validLogin () {
      var $ID = $.cookie( 'PHPSESSID' );
      if( !$ID ){
        window.location.href = "/views/index/login.html"
      }
  }
  //2-> 从cookie 获取用户信息
  setUserinfo()
  function setUserinfo () {
     var userinfo =  $.cookie('userinfo');
     console.log(userinfo)
     var userinfo = JSON.parse(userinfo)
     
     console.log( userinfo )
     $('.profile .avatar img').attr( 'src', userinfo.tc_avatar );
     $('.profile h4').text(userinfo.tc_name)
  }
  //功能三控制元素列表的显示隐藏
  slide()
  function slide(){
     $('.fa-cog').parent().on( 'click' , function(){
         console.log(this)
         $(this).next().slideToggle();
     })
  }
  //退出功能---每个页面都有 ---由于每个页面都检测用户是否登陆，
  LoginOut()
  function LoginOut(){
    $('.fa-sign-out').parent().on( 'click' , function (){
        $.cookie('PHPSESSID' ,'', {expires: Date.now(), path: '/'});
        window.location.reload();
    })
  }

});