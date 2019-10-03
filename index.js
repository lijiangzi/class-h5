(function ($) {
    var obj = {
        init: function () {
            this.bindEvent();
            $(window).trigger('hashchange');
            this.dataList = [];
            this.size;
        },
        bindEvent: function () {
            var self = this;
            // 当页面hash值改变时 右侧内容显示变化
            $(window).on('hashchange', function () {
                var hash = location.hash;
               
                //当我们点击的是网页的前进和后退按钮时，要进行相应的样式的修改。
                var nowClass = hash.replace('#', '.');
                $('.list-item.active').removeClass('active');
                $(nowClass).addClass('active');

                $('.show-list').removeClass('show-list');
                $(hash).addClass('show-list');
                

            });
            $('.student-list').on('click', function () {
                self.getAllData();
            });

            $('#submit-add').on('click', function () {
                var data = self.getFormData($('#student-form'));
                self.newAddStudent(data);

            });
            // 点击搜索按钮
            $('.search-btn').on('click', function () {
                self.getSearchData();
            });
        },
        getSearchData: function () {
            var self = this;
            var val = $('.inp').val();
            var sex = $('.search-wrap input:radio:checked').val();
            // if (!val) {
            //     alert('请填入搜索内容');
            //     return;
            // }
            sex = sex || -1;
            var page = 1;
            var size = this.size;
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/searchStudent?appkey=haizeiwang_1554459899292',
                data: { sex: sex , search: val, page: page, size: size },
                success: function (data) {
                    var list = JSON.parse(data)
                    // console.log(list);
                    if(!list.data.searchList[0]){
                        alert('查无此人，请检查你的学号')
                        return 
                    }
                    self.renderDom(list.data.searchList);

                },
                error: function () {
                    console.log('error');
                }
            });
        },
        newAddStudent: function (data) {
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/addStudent?appkey=haizeiwang_1554459899292',
                data: data,
                success: function () {
                    alert('新增成功');
                    $('.student-list').trigger('click');
                },
                error: function () {
                    alert('error');
                }
            })
        },
        getAllData: function () {
            var self = this;
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/findAll?appkey=haizeiwang_1554459899292',
                beforeSend: function () {
                    $('tbody').html('<p>正在加载中...</p>');
                },
                success: function (data) {
                    var list = JSON.parse(data);
                    self.dataList = JSON.parse(data);
                    self.renderDom(list.data);
                    self.size = self.dataList.data.length;
                },
                error: function () {
                    console.log('error');
                    alert('获取数据信息失败~');
                }
            })
        },
        renderDom: function (data) {
            var self = this;
            var str = '';
            var len = data.length;
            if (len > 0) {
                data.forEach(function (ele, i) {
                    str += '<tr><td>' + ele.sNo + '</td>\
                    <td>'+ ele.name + '</td>\
                    <td>'+ (ele.sex ? '女' : '男') + '</td>\
                    <td>'+ ele.email + '</td>\
                    <td>'+ (new Date().getFullYear() - ele.birth) + '</td>\
                    <td>'+ ele.phone + '</td>\
                    <td>'+ ele.address + '</td>\
                    <td><button class="success edit" data-index="'+ i + '">编辑</button>\
                    <button class="del" data-index="'+ i + '">删除</button></td></tr>';
                });
            };

            var tbody = $('#student-list').find('tbody');
            tbody.html(str);
            this.pop();
        },
        pop: function () {
            var self = this;
            $('.edit').on('click', function () {
                // 显示弹框
                $('.modal').show();
                // 当前这条信息回填
                var i = $(this).attr('data-index');
                var data = self.dataList.data[i];
                var form = $('#modal-form')[0];
                for (var prop in data) {
                    form[prop] ? form[prop].value = data[prop] : "";
                };
                $('.submit').on('click', function () {
                    // 将修改后的表单中的数据取出
                    var data = self.getFormData($('#modal-form'));
                    // console.log(data);
                    // 发送修改后的数据到后端
                    $.ajax({
                        url: 'http://api.duyiedu.com/api/student/updateStudent?appkey=haizeiwang_1554459899292',
                        data: data,
                        success: function (data) {
                            $('.modal').hide();
                            alert('修改成功~');
                            $('.student-list').trigger('click');
                        },
                        error: function () {
                            alert('error');
                        }
                    });
                    return false;
                });

            });
            $('.del').on('click', function () {
                $('.del-modal').show();
                // console.log(11)
                var i = $(this).attr('data-index');
                var num = self.dataList.data[i].sNo;
                $('.sure-btn').on('click', function () {
                    $.ajax({
                        url: 'http://api.duyiedu.com/api/student/delBySno?appkey=haizeiwang_1554459899292',
                        data: { sNo: num },
                        success: function (data) {
                            $('.del-modal').hide();
                            $('.student-list').trigger('click');
                        },
                        error: function () {
                            alert('error,删除失败');
                        }
                    })
                })
            });
        },
        // 取出form表单中的数据
        getFormData: function (form) {
            var list = form.serializeArray();
            // 返回[{key value}]形式组成的数组
            // console.log(list);
            var student = {};
            list.forEach(function (ele, i) {
                student[ele.name] = ele.value;
            })
            // 返回一个拼接在url后的对象
            return student;
        },
    };
    obj.init();
})(window.jQuery);