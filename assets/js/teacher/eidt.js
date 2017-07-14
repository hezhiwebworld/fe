define([
    'jquery',
    'template',
    'validate',
    'form',
    'datepicker',
    'zh'
], function($) {
    //渲染老师的信息
    render();
    function render(){
        var data =  queryString()
        $.ajax({
            url:'/api/teacher/edit',
            type:'get',
            data:data,
            success: function(res){
                if(res.code == 200){
                    console.log(res)
                     var html =`
                        <form  class="form-horizontal col-xs-offset-2">
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">姓名</label>
                            <div class="col-xs-4">
                                <input type="text" name="tc_name"  class="form-control input-sm" placeholder="讲师名称" value=${res.result.tc_name}>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">入职时间</label>
                            <div class="col-xs-4">
                                <input type="text"  name="tc_join_date" id="timer" class="form-control input-sm" value=${res.result.tc_join_date}>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">类型</label>
                            <div class="col-xs-2">
                                <select name="tc_type" class="form-control input-sm">
                                    <option value="1">讲师</option>
                                    <option value="0">管理员</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">性别</label>
                            <div class="col-xs-4">
                                <label class="radio-inline">
                                    <input type="radio"  name="tc_gender" value="1"> 男
                                </label>
                                <label class="radio-inline">
                                    <input type="radio"  name="tc_gender" value="0"> 女
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-7">
                                <button class="btn btn-success btn-sm pull-right"> 编 辑 </button>
                            </div>
                        </div>
                    </form>
                    `
                    $('.teacher-add').html(html)
                    //tc_type类型是讲师
                    //tc_gender是性别
                   var $type = $('select[name="tc_type"]')
                   var $gender = $('input[name="tc_gender"]')
                   var num = res.result.tc_type ==1 ?0 :1
                   $type.find('option').eq(num).attr('selected',true);
                   var num = res.result.tc_gender === 0 ? 1 : 0
                   console.log( $('input[name="tc_gender"]'))
                   $('input[name="tc_gender"]').eq(num).attr('checked', true)
                     //进行表单验证
                        valiform()
                    //日期插件
                    date()
                    
                }
            }
        })
    }

    //解析url---键值对
    function queryString(){
        var str = window.location.search.slice(1)
        console.log(str)
        var arr = str.split('&');
        var obj = {}
        for(var i = 0 ; i < arr.length ; i++ ){
            var temp = arr[i].split('=');
            obj[temp[0]]  = temp[1]
        }
        return obj
    }

    //进行表单验证
    // valiform()
    function valiform(){
        var obj = queryString();
        var tc_id = obj['tc_id']
        $('form').validate({
        
            //当所有表单的验证通过执行的函数
         submitHandler : function(){
            console.log('验证通过了');
           
            $('form').ajaxSubmit({
                url : '/api/teacher/update',
                type : 'post',
                data : {
                    tc_id: tc_id
                },
                success : function(res){
                    if(res.code ==200){
                    alert('添加成功')
                   // $('form').find('input').val('');
                    }
                }
            })
           
        },
            //  submitHandler : function(ev){
            //     console.log('ddd')
            //     ev.preventdefault();
            //     var obj = queryString();
            // //    $('form').ajaxSubmit({
            // //        url: '/api/teacher/update',
            // //        type : 'post',
            // //        data : {
            // //           tc_name: obj[c_name]
            // //        },
            // //        success : function(res){
            // //            alert('编辑成功')
            // //        }
                   
            // //    })
            // },
            //验证规则
            rules:{
                tc_name: {
                    required : true,
                    rangelength: [2,3]
                },
                
            },
            messages:{
                 tc_name: {
                    required : '消息不能为空',
                    rangelength: '长度为2-10'
                },
               
            }
        })
        
    }
   //日期插件
  function date(){
       $('#timer').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd'
    })
  }

});