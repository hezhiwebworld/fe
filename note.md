## jquery-validate验证插件注意事项

```js
    ------这好像会自动验证，比较坑爹的会影响用户体现，提示信息会改变页面的布局
```

## jquery-form表单提交差价注意事项

```js
    //参数，一定需要保证完全正确
    --参数不正确，会导致点击按钮，页面跳转
    //书写格式
    $('form').validate({
        //当所有的验证通过，执行该函数
        submitHandler : function(){
            //这个是表单提交
            $('form').ajaxSubmit({

            })
        }
        //验证规则
        rules：{

        }
        messages: {

        }
    })
```

## webuploader---这个文件上传的插件

```js
    //巨坑无比--demo结构还必须按照文档写，选择器的名字还不能更换
    ---参数查看api--options 

    var web = webuploader.create({
        //options---其中有几项是必须，多看文档
    })
```

- 文件上传只能用post方式，设置文件格式---用form表单提交时，
- 异步上传文件，不需要设置请求头formData()


## ajax 上传文件的需要注意几点

- 不能设置请求头--contentType: false

- jq不能处理formData对象，processData:false

```js
    formData对象 自身就是一个键值对得形式，不需要处理jq处理，
    设置processData:false
```


## ajax------------的全局事件滚动条


## 图片裁剪插件---jcrop