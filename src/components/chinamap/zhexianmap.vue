<template>
  <div id="china_map_box1">
    <div id="box">
      <div id="china_mapp"></div>
    </div>
  </div>
</template>

<script>
const e = document.documentElement.clientWidth;
import * as echarts from "echarts";
export default {
  props: {
    datelist: Array
  },
  data() {
    return {
      myChart: {},
      //echart 配制option
      option: {
        // title: {
        //     text: '折线图堆叠'
        // },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          icon: "rect",
          data: [],
        },
        grid: {
          left: "0%",
          right: "4%",
          bottom: "30%",
          containLabel: true,
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: [
          {
            axisTick: {
              //x轴刻度线
              show: false,
            },
            // max : 60,
			      // min : 0,
			      splitNumber : 3,
			      // boundaryGap : [ 0.2, 0.2 ],
            axisLabel: {
              // show: true,
              // interval: 3,
              rotate:40,
              textStyle: {
                color: "#000", //更改坐标轴文字颜色
                fontSize: 10/75 * (e/10), //更改坐标轴文字大小
              },
            },
            type: "category",
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              //y轴
              show: false,
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000", //更改坐标轴文字颜色
                fontSize: 20/75 * (e/10), //更改坐标轴文字大小
              },
            },
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            color: "pink",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
    };
  },
  methods: {
    //初始化中国地图
    initEchartMap() {
      let mapDiv = document.getElementById("china_mapp");
      let mapDiv1 = document.getElementById("box");
      this.myChart = echarts.init(mapDiv);
      this.myChart.setOption(this.option);
      mapDiv.style.height = (800 / 75) * (e / 10) + 10 + "px";
      mapDiv1.style.height = (600 / 75) * (e / 10) + 10 + "px";
    },
    //修改echart配制
    setEchartOption() {
      console.log(this.option)
      this.option.xAxis[0]["data"] = this.datelist;
    },
    resize() {
      this.myChart.resize();
    },
  },

  mounted() {
    setTimeout(() => {
      this.setEchartOption(this.datelist);
      this.$nextTick(() => {
      this.initEchartMap();
    });
    }, 1000);
    let that = this;
    setTimeout(function () {
      window.onresize = function () {
        that.resize();
      };
    }, 200);
  },
};
</script>
 
<style scoped>
#box {
  width: 100%;
  margin-top: 20px;
  border: 1px solid rgb(221, 221, 221);
}
#china_mapp {
  padding: 40px 20px;
  width: 100%;
  height: 800px;
}
* {
  padding: 0;
  margin: 0;
}
</style>