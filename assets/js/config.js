 
 //配置文件


//配置别名----主要由于下面的名字太长了
require.config({
	baseUrl:'/node_modules',
    //设置基础路径，方便编写
   paths: {
        //这个别名是固定的 ---amd 规范编写的模块
       //文件后缀名不需要编写，requirejs 会自动编写
        cookie: 'jquery.cookie/jquery.cookie',
        nprogress: 'nprogress/nprogress',
        jquery: 'jquery/dist/jquery',
        template: 'art-template/lib/template-web',
        bootstrap: 'bootstrap/dist/js/bootstrap',
        datepicker: 'bootstrap-datepicker/dist/js/bootstrap-datepicker',
        zh: 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
        validate: 'jquery-validation/dist/jquery.validate',
        form: 'jquery-form/dist/jquery.form.min',
        webuploader: 'webuploader/dist/webuploader'
    },
    shim:{
    	
       bootstrap:{
       	deps:['jquery']
       },
       zh: {
           deps:['jquery','datepicker']
       }
    }
})

