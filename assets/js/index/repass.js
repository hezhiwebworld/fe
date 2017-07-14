
require(['/assets/js/config.js','/assets/js/common-my.js'],function(){

    require(['jquery','datepicker','form','validate'],function($,datepicker,form,validate){
       
        $('form').validate({
            submitHandler: function(){
                console.log(1)
                $('form').ajaxSubmit({
                    url:'/api/teacher/repass',
                    type: 'post',
                    success:function(res){
                        console.log(res)
                    }
                })
            },
            rules: {
                tc_pass :{
                    required : true
                }
               
            },
            messages: {
                tc_pass :{
                    required : '密不能为空'
                },
               
            }
        })
    })
})