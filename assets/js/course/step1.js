require(['/assets/js/config.js','/assets/js/common-my.js'],function(){
    require(['jquery','validate','form','template'],function($,validate,form,template){
        //根据url传递过来的id获取出来
       
        var data = queryString()
        console.log(data)
        //根据id取数据
         getCourseInfo ()
        function getCourseInfo () {

            $.ajax({
                url: '/api/course/basic',
                type: 'get',
                data : data,
                success: function(res){
                    console.log(res)
                    var html = template('temp',{ list : res.result });
                    $('.content').html( html );
                    //验证表单
                    valiForm()
                }
            })
        }

        function valiForm(){
            $('form').validate({
                submitHandler: function(){
                    var id =  data.cs_id;
                  
                    $('form').ajaxSubmit({
                        url: '/api/course/update/basic',
                        type: 'post',
                        data:{
                            cs_id : id
                        },
                        success: function( res ){
                        if(res.code == 200 ){
                            window.location.href = "./step2.html?cs_id="+id
                        }
                        }
                    })
                },
                rules: {
                   
                },
                messages: {
                   
                }
            })
        }





        //解析url---键值对
        function queryString(){
            var str = window.location.search.slice(1)
           // console.log(str)
            var arr = str.split('&');
            var obj = {}
            for(var i = 0 ; i < arr.length ; i++ ){
                var temp = arr[i].split('=');
                obj[temp[0]]  = temp[1]
            }
            return obj
        }
    })
})