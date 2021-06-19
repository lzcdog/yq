<template>
  <div id="china_map_box">
  <div class="title">
    中国疫情
  </div>
  <div class="xoaptitle">
    <div class="first">
      中国疫情图
    </div>
    <div class="second">
      单击省份可查看病例数
    </div>
  </div>
    <div id="china_map" ref="myChart" ></div>
  </div>
</template>

<script>
const e = document.documentElement.clientWidth;
import * as echarts from "echarts";
import "echarts/map/js/china.js";
export default {
  props: {
    dataList: Array
  },
  data() {
    return {
      myChart: {},
      //echart 配制option
      options: {
        tooltip: {
          triggerOn: "mousemove", //mousemove、click
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff",
            fontSize: 9,
          },
          formatter: function (e, t, n) {
            let data = e.data;
            let context = `
               <div>
                   <p style="font-size:20px;padding:10px;">现有确诊病例</p>
                   <p style="padding:5px 10px;"><span style="font-size:20px;" class="tooltip_left">${data.name}: ${data.value}</p>
                  <div style="border-radius: 15px;font-size:18px;text-align: center;margin:10px auto 0; width:100%;line-height:30px;height:30px;background-color:rgb(0, 179, 242)">点击查看详情</div>
               </div>
            `;
            return context;
          },
        },
        visualMap: {
          show: true,
          showLabel: true,
          left: 20/75 * (e/10), //组件离容器左侧的距离,'left', 'center', 'right','20%'
          bottom: "0",
          itemGap: 5,
          hoverLink: true,
          textStyle: {
            fontSize: 15 * (e / 750),
            // fontWeight : 'bold'
          },
          text: ["高", "低"],
          pieces: [
            {
              gte: 10000,
              label: ">= 10000",
              color: "rgb(127, 17, 0)",
            },
            {
              gt: 1000,
              lt: 9999,
              label: "1000 - 9999",
              color: "rgb(189, 19, 22)",
            },
            {
              gt: 500,
              lt: 999,
              label: "500 - 999",
              color: "rgb(230, 75, 69)",
            },
            {
              gt: 100,
              lt: 499,
              label: "100 - 499",
              color: "rgb(255, 140, 113)",
            },
            {
              gt: 10,
              lt: 99,
              label: "10 - 99",
              color: "rgb(253, 210, 160)",
            },
            {
              gt: 1,
              lt: 9,
              label: "1 - 9",
              color: "rgb(255, 242, 207)",
            },
            {
              lt: 1,
              gte: 0,
              label: "1",
              color: "rgb(255, 255, 255)",
            },
          ],
        },
        geo: {
          map: "china",
          scaleLimit: {
            min: 1,
            max: 2,
          },
          zoom: 1.18,
          top: 150/75 * (e/10),
          label: {
            normal: {
              show: true,
              fontSize:  15/75 * (e/10),
              color: "rgba(0,0,0,0.7)",
            },
          },
          itemStyle: {
            emphasis: {
              areaColor: "rgb(69, 207, 255)",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0,
            },
          },
        },
        series: [
          {
            name: "突发事件",
            type: "map",
            geoIndex: 0,
            data: [],
          },
        ],
      },
      //echart data
      
    };
  },
  methods: {
    //初始化中国地图
    initEchartMap() {
      let mapDiv = document.getElementById("china_map");
      this.myChart = echarts.init(mapDiv);
      this.myChart.setOption(this.options);
      mapDiv.style.height = 788/75 * (e/10)+10 +'px'
    },
    resize() {
      this.myChart.resize();
    },
    
    //修改echart配制
    setEchartOption(v) {
      this.options.series[0]["data"] = v;
    },
  },

  watch: {
    dataList:{
      handler: function(nVal, oVal){
        this.bian = true
        this.setEchartOption(nVal)
        this.$nextTick(() => {
        this.initEchartMap();
        });
        }
      },
      deep: true
    
  },
  mounted() {
    setTimeout(() => {
      this.setEchartOption(this.dataList);
      this.$nextTick(() => {
      this.initEchartMap();
    });
    }, 1000);
    
    let that = this
    setTimeout(function () {
      window.onresize = function () {
        that.resize();
      };
    }, 200);
  },
};
</script>
 
<style scoped>
#china_map {
  width: 100%;
  height: 800px;
  background-color: rgb(243, 243, 243);
  border: 1px solid rgb(221, 221, 221);
}
* {
  padding: 0;
  margin: 0;
}
.title {
  position: relative;
  font-size: 35px !important;
  padding: 15px 0  15px 15px;
}
.title::after {
  content: '';
  position: absolute;
  left: 0;
  top: 25px;
  width: 8px;
  height: 30px;
  background-color: rgb(225, 0, 0);
  font-size: 35px !important;
}
#china_map_box {
  position: relative;
}
.xoaptitle {
  position: absolute;
  width: 710px;
  padding: 40px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 5;
  z-index: 9999;
}
.first {
  position: relative;
  font-size: 24px;
}
.first::after {
  position: absolute;
  content: '';
  left: -30px;
  top: 10px;
  width: 15px;
  height: 15px;
  background-color: rgb(225, 0, 0);
}
.second{
  
  font-size: 18px;
  color: rgb(153, 153, 153);
}
</style>