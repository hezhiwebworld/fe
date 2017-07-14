
define([
    'jquery',
    'datepicker',
    'zh',
    'form',
    'validate'

], function($,datepicker,zh,form,validate) {
    //日期控件
    $('input[name="tc_join_date"]').datepicker({
        language:'zh-CN',
        format: 'yyyy/mm/dd'
    })
    //表单验证
    $('form').validate({
        //所有验证通过之后执行
        submitHandler : function(){
            console.log('验证通过了')
            $('form').ajaxSubmit({
                url : '/api/teacher/add',
                type : 'post',
                success : function(res){
                    if(res.code ==200){
                    alert('添加成功')
                    $('form').find('input').val('');
                    }
                }
            })
        },
        rules:{
            tc_name :{
                required :true,
                rangelength: [6,10]
            },
            tc_pass: {
                required: true,
                rangelength: [6,7]
            }
        },
        messages:{
            tc_name: {
                required: '用户名不能为空',
                rangelength : '长度为6到10'
            },
             tc_pass: {
                required: '密码不能为空',
                rangelength: '密码长度为6到7'
            }
        }
    })
});