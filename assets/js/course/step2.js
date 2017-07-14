
require(['/assets/js/config.js','/assets/js/common-my.js'],function(){
    require(['jquery',
        'webuploader',
        '/jcrop/js/jquery.Jcrop.js'],function($,webuploader,Jcrop){
            var data = queryString();
            upavatar()  
            function upavatar(){
        
            //这对象需要在上面define回调函数的参数接收一下
            var uploader = webuploader.create({
            auto: true,
            swf: '/node_modules/webuploader/dist/Uploader.swf',
            server: '/api/uploader/cover',
            pick: '#filePicker',
            formData:data,
            fileVal:'cs_cover_original',
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
                $('.preview img').attr('src',src);
                 $('.preview img').Jcrop({
                      boxWidth: 500,  // 设置图片的宽度
                      aspectRatio: 1.618, // 长宽的比例 //  长/宽
                      onSelect: function (coords) {
                        console.log('select', coords)
                      }
                 })
            });
            uploader.on('uploadError',function( a , b , c ){
                alert('上传失败')
            })
        }

      

        //键值对
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