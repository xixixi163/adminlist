<template>
  <div class="back">
    <div class="banner">
      <div class="topview">
        <div class="left">
          <div
            id="varietyMount"
            class="varisales"
          ></div>
        </div>
        <div
          id="orderMount"
          class="center"
        ></div>
        <div class="right">
          <div class="sales">
            <div class="fontstyle">
              <img
                src="../../images/home/shoping.png"
                alt=""
              >
              {{`总销量`}}
            </div>
            <div class="fontstyle">
              {{`${totalSales} 件`}}
            </div>
          </div>
          <div class="mount">
            <div class="fontstyle">
              <img
                src="../../images/home/money.png"
                alt=""
              />
              {{`总销售金额`}}
            </div>

            <div class="fontstyle">{{`${totalMoney} 元`}}</div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div
          id="sale"
          class="leftbo"
        >
        </div>
        <div class="rightbo">
          <div
            id="dayMount"
            class="ordermount"
          ></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { home } from '../../api/api.js'
// 请求地址
import { getechartdataurl } from '../../api/request.js'
const echarts = require('echarts');
export default {
  data () {
    return {
      // 总
      totalSales: '',
      totalMoney: '',
      // 日销售金额
      dayMoney: [],
      dayMX: [],
      // 日销量分析
      daySales: [],
      daySX: [],
      // 菜品销量
      dishSales: [],
      dishSX: [],
      // 菜品销售金额
      dishMoney: [],
      dishMX: []
    }
  },
  methods: {
    getDatas () {
      home(1, getechartdataurl)
        .then((res) => {
          console.log(res)
          if (res.data.msg == 'SUCCESS') {
            let echartdata = res.data.data;
            this.totalSales = echartdata.totalSales
            this.totalMoney = echartdata.totalMoney
            this.daySales = echartdata.daySales
            this.daySX = echartdata.days
            this.dayMX = echartdata.days
            this.dayMoney = echartdata.dayMoney

            this.dishSales = echartdata.dishSales
            this.dishSX = echartdata.dishSX
            this.dishMX = echartdata.dishMX
            this.dishMoney = echartdata.dishMoney
            this.drawEchart()
            console.log(this.dishSX);
          } else {
            console.log(res.data.data);
          }

        })
        .catch((err) => {
          console.log(err)
        })

    },
    drawEchart () {
      this.drawBar(1, this.daySX, this.daySales, '单位：件', '日销量分析', 'varietyMount')
      this.drawBar(0, this.dishSX, this.dishSales, '单位：件', '菜品销量分析', 'orderMount')
      this.drawPie()
      this.drawLine()
    },
    // 菜品金额分析 柱状图
    drawBar (flag, datax, datay, sub, title, name) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(name));
      let option = {
        title: {
          text: title,
          subtext: sub,
          padding: [15, 0, 0, 0],
          textStyle: {
            fontSize: 20,
            color: 'rgba(41, 111, 119, 1)',
            fontFamily: 'PingFang SC',
          },
          left: 'center'
        },
        dataZoom: [{
          type: 'inside',
          // disabled: true, 停止了组件功能
          // throttle: '50',
          minValueSpan: 4,
          maxValueSpan: 4,
          // startValue: 0,
          startValue: flag === 1 ? this.getStart(new Date(), 2) : 0,
          end: 100,
          zoomLock: true,
          filterMode: 'filter',
        }, {
          minValueSpan: 4,
          start: 50,
          end: 100,
          moveOnMouseMove: true,
          showDetail: false,
          show: false,
        }],
        tooltip: {
          show: true
        },
        grid: {
          top: '26%',
          left: '5%',
          right: '5%',
          bottom: '15%'
        },
        xAxis: {
          show: true,
          axisLine: {
            show: true,
            lineStyle: {
              // x轴线
              color: 'rgb(115, 192, 222)',
              // color: '#fff',
              width: 2,
            },
            axisTick: {
              inside: true,
              lignWithLabel: true //这两行代码可以让刻度正对刻度名
            },
          },
          axisLabel: {
            textStyle: {
              // color: (value) => {
              //   if ((value == '') || (value == '12')) {
              //     return '';
              //   } else {
              //     return 'rgba(255,255,255,0.7)';
              //   }
              // },
              color: (value) => {
                return 'rgb(41, 111, 119)';
              },
            },
            formatter: function (params) {
              var val = "";
              if (params.length > 6 && flag === 0) {
                val = params.substr(0, 5) + '...';
                return val;
              } else {
                return params;
              }
            },
            fontSize: 14,
            fontWeight: 400,
            fontFamily: 'PingFang SC',
            interval: 0
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: 'rgba(255,255,255,0.7)',
          },
          splitNumber: 7, //拆分成几段
          data: datax
        },
        yAxis: {
          show: false,
        },
        series: [{
          name: '金额',
          type: 'bar',
          legendHoverLink: true,
          barWidth: 40,
          data: datay,
          label: {
            normal: {
              show: true,
              position: 'top',
              // formatter: function (params) {
              //   let value = that.formatMoney(params.value);
              //   if ((params.dataIndex == index) || (params.dataIndex == select)) {
              //     return '{a|' + value + '}';
              //   } else {
              //     return '{b|' + value + '}';
              //   }
              // },
              rich: {
                a: {
                  color: '#31B870',
                  fontWeight: 800,
                  fontSize: 16,
                  fontFamily: 'PingFang SC',
                },
                b: {
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 800,
                  fontSize: 16,
                  fontFamily: 'PingFang SC',
                }
              },
              color: 'rgb(41, 111, 119)',
              fontSize: 14,
            },
          },
          itemStyle: {
            // color: function (params) {
            //   return (params.dataIndex == index) || (params.dataIndex == select) ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)';
            // },
            // 柱体
            color: 'rgba(115, 192, 222, 1)',
            barBorderRadius: [4, 4, 0, 0],
            barCategoryGap: '60%'
          }
        }]
      }
      // 绘制图表
      myChart.setOption(option);
      // 页面监控宽度的变化
      window.addEventListener("resize", function () {
        myChart.resize();
      });

    },
    // 菜品销量分析 南丁玫瑰图
    drawPie () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('sale'));
      let option = {
        title: {
          text: '菜品销售金额分析',
          subtext: '单位：元',
          left: 'center',
          textStyle: {
            fontSize: 20,
            color: 'rgba(41, 111, 119, 1)',
            fontFamily: 'PingFang SC',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: this.dishMX
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            data: this.dishMoney
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // 日销售金额
    drawLine () {
      let myChart = echarts.init(document.getElementById('dayMount'));
      let option = {
        title: {
          text: '日销售金额分析',
          subtext: '单位：元',
          padding: [15, 0, 0, 0],
          textStyle: {
            fontSize: 20,
            color: 'rgba(41, 111, 119, 1)',
            fontFamily: 'PingFang SC',
          },
          left: 'center'
        },
        tooltip: {
          show: true
        },
        grid: {
          left: '6%',
          right: '6%',
          bottom: '10%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(41, 111, 119, 1)',
              width: 2,
            },
            axisTick: {
              inside: true,
              lignWithLabel: true //这两行代码可以让刻度正对刻度名
            },
          },
          axisLabel: {
            fontSize: 15,
            fontWeight: 500,
            fontFamily: 'PingFang SC',
            interval: 0
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: 'rgba(41, 111, 119, 1)',
          },
          data: this.dayMX
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        dataZoom: [{
          type: 'inside',
          // disabled: true, 停止了组件功能
          // throttle: '50',
          minValueSpan: 6,
          maxValueSpan: 6,
          startValue: this.getStart(new Date(), 3),
          // startValue: that.getStart(that.date),
          end: 100,
          zoomLock: true,
          filterMode: 'filter',
        }, {
          minValueSpan: 6,
          start: 50,
          end: 100,
          moveOnMouseMove: true,
          showDetail: false,
          show: false,
        }],
        series: [{
          data: this.dayMoney,
          type: 'line',
          showSymbol: true,//是否默认展示圆点
          itemStyle: {
            normal: {
              color: "rgba(48, 155, 159, 1)", //改变折线点的颜色
            },
          },
          label: {
            // 折线文字颜色
            show: true,
            color: "rgba(41, 111, 119, 1)",
            shadowColor: "rgba(25, 219, 239, 1)"
          },
          lineStyle: {
            color: "rgba(48, 155, 159, 1)",
            width: 3
          },
          areaStyle: {
            color: "rgba(161, 242, 255, 1)"
          },
          connectNulls: true
        }]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // 图标开始位置
    getStart (value, k) {
      value = this.formatDate(value)
      let startValue = 0;
      this.daySX.forEach((v, i) => {
        if (v == value) {
          startValue = i - k;
        }
      });

      // if(startValue == 0){
      //   this.type = 1;
      // }else if(startValue >= this.dayInfo.length-7){
      //   this.type = 2;
      // }
      // console.log(this.type);
      return startValue;
    },
    // 日期格式化
    formatDate (value) {
      const year = value.getFullYear();
      const month = (value.getMonth() + 1) <= 9 ? `0${value.getMonth() + 1}` : (value.getMonth() + 1);
      const date = (value.getDate()) <= 9 ? `0${value.getDate()}` : (value.getDate());
      return `${year}-${month}-${date}`;
    }
  },
  mounted () {
    this.getDatas()
  }
}
</script>

<style scoped="scoped">
.back {
  background-color: #f5f5f5;
  width: 100%;
  height: 800px;
}
.banner {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding-top: 80px;
  margin-right: 10px;
  margin-left: 220px;
}
.banner div {
  border-radius: 5px;
}
.topview {
  display: flex;
  margin-bottom: 20px;
}
.topview > div {
  /* flex: 1; */
  height: 310px;
}
.topview .left,
.center {
  flex: 0.38;
  margin-right: 20px;
  background-color: #fff;
}
.topview .right {
  flex: 0.22;
  display: flex;
  flex-direction: column;
  /* color: rgb(41, 111, 119); */
}

.right .sales {
  box-sizing: border-box;
  padding: 15px;
  height: 145px;
  background-color: rgb(175, 217, 115);
  margin-bottom: 20px;
}
.right .mount {
  box-sizing: border-box;
  padding: 15px;
  height: 145px;
  background-color: rgb(1, 217, 240);
}
.fontstyle {
  padding: 10px;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  /* line-height: 150px; */
  text-align: center;
}
/* 图片 */
.fontstyle > img {
  width: 45px;
  height: 50px;
}
.bottom {
  display: flex;
}
.bottom div {
  flex: 1;
  height: 360px;

  background-color: #fff;
}
.bottom .leftbo {
  margin-right: 30px;
}
.bottom .rightbo {
  margin-right: 28px;
}
.varisales {
  width: 100%;
  height: 100%;
  /* background: linear-gradient(
    180deg,
    rgba(170, 240, 156, 1) 0%,
    rgba(76, 205, 137, 1) 100%
  ); */
  box-shadow: 0 2px 14px 2px rgba(243, 144, 56, 0.09);
}
/* 订单销售金额 */
.ordermount {
  height: 100%;
  width: 100%;
}
</style>
