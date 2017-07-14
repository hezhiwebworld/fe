

require(['/assets/js/config.js','/assets/js/common-my.js'],function(){


    require([
    'jquery',
    'template',
    'bootstrap'
    ], function($,template,bootstrap) {
        //当页面开始加载，请求数据并渲染
        console.log(1)
        renderList();
        function renderList() {
            $.ajax({
                url : '/api/teacher',
                success : function(res){
                    console.log(res)
                if(res.code === 200){
                        console.log(res)
                        var html = template('tmpl-list',{ list : res.result })
                        $('#tec-list').html(html)
                }
                }
            })
        }
        //显示模态框
        showModal();
        function showModal(){
            $('#tec-list').on('click','.showmodal',function(){

                var id = $(this).parent().data('id')
                $.ajax({
                    url: '/api/teacher/view',
                    type: 'GET',
                    data:{
                        tc_id : id
                    },
                    success: function(res){
                        console.log(res)
                        var html = `
                        <tr>
                            <th>${res.result.tc_name}</th>
                            <td>${res.result.tc_roster}</td>
                            <th>${res.result.tc_roster}</th>
                            <td colspan="3">${res.result.tc_roster}</td>
                            <td rowspan="4" width="128">
                                <div class="avatar">
                                    <img src="../../assets/img/default.png" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>花名:</th>
                            <td>${res.result.tc_roster}</td>
                            <th>出生日期:</th>
                            <td colspan="3">${res.result.tc_roster}</td>
                        </tr>
                        <tr>
                            <th>性别:</th>
                            <td>${res.result.tc_gender}</td>
                            <th>出生日期:</th>
                            <td colspan="3">${res.result.tc_birthday}</td>
                        </tr>
                        <tr>
                            <th>手机号码:</th>
                            <td colspan="2">${res.result.tc_email}</td>
                            <th>邮箱:</th>
                            <td colspan="2">${res.result.tc_cellphone}</td>
                        </tr>
                        <tr>
                            <th>籍贯:</th>
                            <td colspan="6">${res.result.tc_hometown}</td>
                        </tr>
                        <tr>
                            <td colspan="7">
                                <div class="introduce">
                                    ${res.result.tc_introduce}
                                </div>
                            </td>
                        </tr>
                        `
                        $('#modal-list').html(html)
                    }
                })

                //弹出模态框需要bootstrapjs，需要引入
                $('#teacherModal').modal();
            })
        }
        //切换讲师的状态
        toggleStatus()
        function toggleStatus(){
            $('#tec-list').on('click','.start-stop',function(){
                //console.log(this)
                var that = this;
                var tr = $(this).parent();
                var tc_id = tr.attr('data-id')
                var tc_status = tr.attr('data-status');
                console.log(tc_id,tc_status)
                $.ajax({
                    type:'post',
                    url: '/api/teacher/handle',
                    data:{
                        tc_id :tc_id ,
                        tc_status:tc_status
                    },
                    success : function(res){
                    if(res.code ==200){
                        var str = res.result.tc_status == 0 ? '注销'  : '启用'
                        //更新tr那里的值
                        tr.attr('data-status', res.result.tc_status)
                        $(that).text(str)
                    }
                    }
                })
            })
        }

    

    });

})



