require([
    '/assets/js/config.js',
    '/assets/js/common-my.js'
    ],function(){
    //配置依赖
    require( ['jquery','validate','form'] , function ($,) {
        //表单验证
        $('form').validate({
            submitHandler: function(){
                $('form').ajaxSubmit({
                    url: '/api/course/create',
                    type: 'post',
                    success: function( res ){
                       if(res.code == 200 ){
                           window.location.href = "./step1.html?cs_id="+res.result.cs_id
                       }
                    }
                 })
            },
            rules: {
                cs_name: {
                    required: true,
                    rangelength: [2,8]
                }
            },
            messages: {
                cs_name:{
                    required: '课程名不能为空',
                    rangelength: '长度为2到8'
                }
            }
        })
    })
})