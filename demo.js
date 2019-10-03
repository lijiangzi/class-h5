(function () {
    var obj = {
        init: function () {
            location.hash = 'student-echarts';
            this.bindEvent();
        },
        bindEvent: function () {
            var list = $('header .drop-list');
            $('header .btn').on('click', function () {
                list.slideToggle();
            });
            $(window).resize(function () {
                if ($(window).innerWidth() >= 768) {
                    list.css('display', 'none');
                }
            });
            $('.list-item').on('click', function () {
                $('.list-item.active').removeClass('active');
                $(this).addClass('active');
                $('.drop-list').slideUp();
                location.hash = $(this).attr('data-id');
                return false;
            });

            // 点击消失操作  除了
            $('.modal').add('.del-modal').on('click',function(){
                $(this).hide();
            });
            $('.modal-content').add('.del-modal .con').on('click',function(e){
                e.stopPropagation();
            });
            // 删除框的取消按钮
            $('.reset-btn').on('click', function () {
                $('.del-modal').hide();
            });

        }
    }
    obj.init();
})();