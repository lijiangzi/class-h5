(function () {
    var obj = {
        init: function () {
            this.getData();
            this.option = {
                title: {
                    // text: '某站点用户访问来源',
                    text: '',
                    subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: []
                    // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                    {
                        // name: '访问来源',
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [],
                        // data: [
                        //     { value: 335, name: '直接访问' },
                        //     { value: 310, name: '邮件营销' },
                        //     { value: 234, name: '联盟广告' },
                        //     { value: 135, name: '视频广告' },
                        //     { value: 1548, name: '搜索引擎' }
                        // ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

        },
        getData: function () {
            var self = this;
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/findAll?appkey=dongmeiqi_1547441744650',
                success: function (data) {
                    var data = JSON.parse(data);
                    // console.log(data);

                    self.areaChart(data.data);
                    self.sexChart(data.data);
                }
            });
        },
        areaChart: function (data) {
            var myAreaChart = echarts.init($('.area')[0]);
            var legendArr = [], serierArr = [];
            var numObj = {};
            data.forEach(function (ele, i) {
                if (!numObj[ele.address]) {
                    numObj[ele.address] = 1;
                    legendArr.push(ele.address);
                } else {
                    numObj[ele.address]++;
                }
            });
            for (var prop in numObj) {
                var obj = {};
                obj.name = prop;
                obj.value = numObj[prop];
                serierArr.push(obj);
            }
            // console.log(legendArr, numObj, serierArr);

            this.option.title.text = '苏州大学学生地区分布统计';
            this.option.legend.data = legendArr;
            this.option.series[0].name = '地区分布';
            this.option.series[0].data = serierArr;
            var option = this.option;
            myAreaChart.setOption(option);
        },
        sexChart: function (data) {
            var mySexChart = echarts.init($('.sex')[0]);
            var legendArr = ['男', '女'], seriesArr = [{ '男': '' }, { '女': '' }];
            var numObj = {};
            data.forEach(function (ele, i) {
                if (!numObj[ele.sex]) {
                    numObj[ele.sex] = 1;
                } else {
                    numObj[ele.sex]++;
                }
            });
            // console.log(numObj)
            seriesArr = [{ value: numObj[0], name: '男' }, { value: numObj[1], name: '女' }];
            this.option.legend.data = legendArr;
            this.option.series[0].data = seriesArr;
            this.option.title.text = '苏州大学学生性别统计';
            this.option.series[0].name = '性别分布';
            mySexChart.setOption(this.option);
        }
    }
    obj.init();
})();
