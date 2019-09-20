var areaChart = echarts.init($('.area')[0]);
        var sexChart = echarts.init($('.sex')[0]);

        var areaOption;
        function setOption (data, dataObj) {
            return {
                    title: { //主标题
                        text: '苏大学子来源',
                        subtext: '纯属虚构', //副标题
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: data,
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: dataObj,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                }
        }

        $.ajax({
            type: 'GET',
            data: {
                'appkey': 'dongmeiqi_1547441744650'
            },
            dataType: 'json',
            url: 'http://api.duyiedu.com/api/student/findAll',
            success(res) {
                var dataList = res.data;
                console.log(dataList);
                var dataObj = {};
                dataList.forEach((ele) => {


                    if (!dataObj[ele.address]) {
                        dataObj[ele.address] = 1;
                    } else {
                        dataObj[ele.address]++
                    }

                })

                console.log(dataObj);
                var areaData = [];
                for(prop in dataObj) {
                    areaData.push(prop)
                }
                console.log(areaData);

                var areaDataObj = [];
                for(prop in dataObj) {
                    var obj = {};
                    obj.name = prop;
                    obj.value = dataObj[prop];
                    areaDataObj.push(obj)
                }
                console.log(areaDataObj);
                areaOption = setOption(areaData, areaDataObj)
                areaChart.setOption(areaOption)

            }
        })

        