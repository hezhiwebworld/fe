

require(['/assets/js/config.js','/assets/js/common-my.js'],function(){

    require([
   'jquery',
   'webuploader',
   'validate',
   'form',
   'template',
   'datepicker'
], function($,webuploader,validate,form,template,datepicker) {
    var res;
    var $p;
    var $c;
    var $d;
    //首先是加载数据
    $.ajax({
        type:'get',
        url: '/api/teacher/profile',
        success: function(res){
            var html = template('tmpl',res)
            $('.settings').html(html)
            console.log(res)
            //三级联动
             $p = $('#province');
             $c = $('#city');
             $d = $('#district')
             threeoptions()
             upavatar();
             nativeuppic();
             dateplugin();
             formplugin()
        }
    })

    //三级联动菜单
    
    function threeoptions(){
        console.log( 111 )
        $.ajax({
            url: '/assets/region.json',
            success: function(res){
               res =res
               console.log( res )
               //调用渲染数据的函数--初始化数据
               optsvalue( $p , res.p['000000']);
               optsvalue( $c , res.c['110000']);
               optsvalue( $d , res.d['110100']);
               changehandler(res)
            }
        })
    }
    
    function changehandler(res){
      $('#province').on('change',function(){
           // console.log( $(this).val() )
           optsvalue( $c , res.c[$(this).val()])
           //这里还需要主动触发一下city的change事件
           var cityvalue = $c.val()
           optsvalue( $d , res.d[cityvalue] )  //这里需要主动触发一下
        })
        $('#city').on('change', cityhandle)

        function cityhandle(){
           optsvalue( $d , res.d[$(this).val()])
        }
    }

//     //渲染数据
   function optsvalue(target,objData){
       //console.log(objData)
        var html =""
        for(var key in objData ){
            html +="<option value="+ key +">"+ objData[key] +"</option>"
        }
        //console.log(html)
        target.html(html)
    }

    //日期插件
    function dateplugin(){
        $('#my-birth,#job_date').datepicker({
            format : 'yyyy-mm-dd'
        })
    }

    //表单提交插件
    function formplugin(){
        $('form').validate({
            //验证完全通过验证
            submitHandler: function(){
                console.log(1)
                $('form').ajaxSubmit({
                    url : '/api/teacher/modify',
                    type : 'post',
                    data : {
                        tc_id : 872
                    },
                    success : function( res ){
                        console.log( res )
                    }
                })
            }
            
        })
    }
   
   
  

   
    function upavatar(){
       
         //这对象需要在上面define回调函数的参数接收一下
        var uploader = webuploader.create({
        auto: true,
        swf: '/node_modules/webuploader/dist/Uploader.swf',
        server: '/api/uploader/avatar',
        pick: '#filePicker',
        fileVal: 'tc_avatar',
        // 只允许选择图片文件。
        accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        })
        
        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on( 'uploadSuccess', function( a,b,c ) {
            //console.log(1)
            var src = b.result.path
//console.log(b)
             $('.preview img').attr('src',src)
        });
        uploader.on('uploadError',function( a , b , c ){
            alert('上传失败')
        })
    }

    //原声的
    function nativeuppic() {
        $('#upfile').on('change',function(){
          // console.log(this.files[0])
           //var fd = new FileReader()
        //    fd.readAsDataURL(this.files[0],'gbk')
           var xhr = new  XMLHttpRequest();
           xhr.open('post','/api/uploader/avatar')

           //传递数据
           var fd = new FormData()
           fd.append('tc_avatar',this.files[0])
           xhr.send(fd)

           xhr.onreadystatechange = function(){
               if(xhr.readyState ==4 && xhr.status==200 ){
                   console.log(xhr.responseText)
                   var res = JSON.parse(xhr.responseText)
                   var src = res.result.path
                    $('.preview img').attr('src',src)
               }
           }
        })

    }


    

   });


})


