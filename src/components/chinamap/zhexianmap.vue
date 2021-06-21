<template>
  <div id="china_map_box1">
    <div class="title">
      <h2>全国疫情新增趋势</h2>
      <p>数据说明</p>
    </div>
    <div id="box">
      <div class="p">
        <p>点击图例可切换展示</p>
      </div>
      <div id="china_mapp"></div>
    </div>
  </div>
</template>

<script>
const e = document.documentElement.clientWidth;
import * as echarts from "echarts";
export default {
  props: {
    datelist: Array,
    diertiaodata: Object,
    diyitiaodata: Object,
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
          itemWidth: 40 * (e / 750),
          itemHeight: 20 * (e / 750),
          icon: "roundRect",
          left: "left",
          data: [],
          top: "5%",
          textStyle: {
            color: "rgb(102, 102, 102)",
            fontSize: 28 * (e / 750),
          },
        },
        grid: {
          left: "0%",
          right: "4%",
          top: "20%",
          containLabel: true,
        },
        toolbox: {},
        xAxis: [
          {
            axisTick: {
              //x轴刻度线
              show: false,
            },
            // max : 60,
            // min : 0,
            // splitNumber : 3,
            axisLabel: {
              show: true,
              interval: 2,
              rotate: 40,
              textStyle: {
                color: "#000", //更改坐标轴文字颜色
                fontSize: (10 / 75) * (e / 10), //更改坐标轴文字大小
              },
            },
            type: "category",
            data: [],
            // showAllSymbol: true,
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
                fontSize: (20 / 75) * (e / 10), //更改坐标轴文字大小
              },
            },
          },
        ],
        series: [
          {
            name: "确诊",
            type: "line",
            stack: "0",
            data: [],
            color: "rgb(163, 29, 19)",
            hover: "blue",
          },
          {
            name: "疑似",
            type: "line",
            stack: "1",
            data: [],
            color: "rgb(255, 214, 103)",
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
      mapDiv.style.height = (750 / 75) * (e / 10) + 10 + "px";
      mapDiv1.style.height = (750 / 75) * (e / 10) + 10 + "px";
    },
    //修改echart配制
    setEchartOption() {
      console.log(this.option);
      //加载时间确诊疑似数据
      this.option.xAxis[0]["data"] = this.datelist;
      //lengend
      this.option.legend["data"] = [this.diertiaodata.name,this.diyitiaodata.name];
      //两个新增数据加载
      this.option.series[0]["name"] = this.diertiaodata.name;
      this.option.series[0]["color"] = this.diertiaodata.color;
      this.option.series[0]["data"] = this.diertiaodata.data;

      this.option.series[1]["name"] = this.diyitiaodata.name;
      this.option.series[1]["color"] = this.diyitiaodata.color;
      this.option.series[1]["data"] = this.diyitiaodata.data;
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
  watch: {
    diertiaodata: {
      handler: function (nVal, oVal) {
        this.setEchartOption(nVal);
        this.$nextTick(() => {
          this.initEchartMap();
        });
      },
    },
    diyitiaodata: {
      handler: function (nVal, oVal) {
        this.setEchartOption(nVal);
        this.$nextTick(() => {
          this.initEchartMap();
        });
      },
    },
    deep: true,
  },
};
</script>
 
<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
}
.title h2 {
  font-weight: 400;
  font-size: 35px;
}
.title p {
  font-size: 16px;
  color: rgb(177, 177, 177);
}
.p {
  position: absolute;
  font-size: 16px;
  top: 78px;
  right: 20px;
  color: rgb(177, 177, 177);
}
#box {
  position: relative;
  width: 100%;
  border: 1px solid rgb(221, 221, 221);
}
#china_mapp {
  padding: 30px 20px 0;
  width: 100%;
  height: 750px;
}
</style>