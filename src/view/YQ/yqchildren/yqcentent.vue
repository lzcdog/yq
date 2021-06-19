<template>
  <div>
    <div class="contenbox" id="contenbox">

      <div class="boxtitle">
        <div @click="dianji" :class="num == 0 ? 'active': ''">全国疫情数据(含港澳台)</div>
        <div class="boxtitle1" @click="dianji1" :class="num == 1 ? 'active1': ''">
          <img src="../../../assets/img/dw.png" alt="">
          <div>{{city}}疫情数据</div>
        </div>
      </div>

      <div class="boxcontent" v-show="num == 1">
        <div class="contentitem">
          <div class="first">境外输入</div>
          <div style="color:rgb(255, 172, 82)">{{findata.input}}</div>
          <div>
            <div >较昨日</div><span :style="{color: findata.addinput == null ? '' : 'rgb(255, 172, 82)' }">{{findata.addinput != null ? `+${findata.addinput}` : '待公布'}}</span>
          </div>
        </div>
        <div class="contentitem">
          <div class="first">无症状感染者</div>
          <div style="color:rgb(121, 22, 24)">{{findata.noSymptom}}</div>
          <div>
            <div >较昨日</div><span :style="{color: findata.addnowhave == null ? '' : 'rgb(121, 22, 24)' }" >{{findata.addnoSymptom != null ? `+${findata.addnoSymptom}` : '待公布'}}</span>
          </div>
        </div>
        <div class="contentitem">
          <div class="first">现有确诊</div>
          <div style="color:rgb(228, 74, 67)">{{findata.nowhave}}</div>
          <div>
            <div >较昨日</div><span :style="{color: findata.addnowhave == null ? '' : 'rgb(228,74,67)' }" >{{findata.addnowhave != null ? `+${findata.addnowhave}` : '待公布'}}</span>
          </div>
        </div>
        <div class="contentitem">
          <div class="first">累计确诊</div>
          <div style="color:rgb(163, 29, 19)">{{findata.total}}</div>
          <div>
            <div>较昨日</div><span :style="{color: findata.addtotal == null ? '' : 'rgb(163, 29, 19)' }" >{{findata.addtotal != null ? `+${findata.addtotal}` : '待公布'}}</span>
          </div>
        </div>
        <div class="contentitem">
          <div class="first">累计死亡</div>
          <div style="color:rgb(51, 67, 117)">{{findata.deadtotal}}</div>
          <div>
            <div>较昨日</div><span  :style="{color: findata.adddeadtotal == null ? '' : 'rgb(51, 67, 117)' }">{{findata.adddeadtotal != null ? `+${findata.adddeadtotal}` : '待公布'}}</span>
          </div>
        </div>
        <div class="contentitem">
          <div class="first">累计治愈</div>
          <div style="color:#34aa70">{{findata.health}}</div>
          <div>
            <div >较昨日</div><span :style="{color: findata.addhealth == null ? '' : '#34aa70' }">{{findata.addhealth != null ? `+${findata.addhealth}` : '待公布'}}</span>
          </div>
        </div>
      </div>

      <div class="boxcontent1" v-show="num == 0">

        <div class="boxcontent1item">
          <div class="first">累计确诊</div>
          <div class="second" style="color:rgb(163, 29, 19)">{{citydata.totalconfirm}}</div>
          <div class="third">
            <div>较昨日</div><span :style="{color: citydata.todayconfirm == null ? '' : 'rgb(163, 29, 19)' }">{{citydata.todayconfirm != null ? `+${citydata.todayconfirm}` : '待公布'}}</span>
          </div>
        </div>

        <div class="boxcontent1item">
          <div class="first">累计死亡</div>
          <div class="second">{{citydata.totaldead}}</div>
          <div class="third">
            <div>较昨日</div><span>{{citydata.todaydead != null ? `+${citydata.todaydead}` : '待公布'}}</span>
          </div>
        </div>

        <div class="boxcontent1item">
          <div  class="first">累计治愈</div>
          <div class="second" style="color:#34aa70">{{citydata.totalheal}}</div>
          <div class="third">
            <div>较昨日</div><span :style="{color: citydata.todayconfirm == null ? '' : '#34aa70' }" >{{citydata.todayheal != null ? `+${citydata.todayheal}` : '待公布'}}</span>
            
          </div>
        </div>

      </div>
      
      <div class="boxbottom">
        <div>截至{{findata.fintime}}</div>
        <div>数据说明</div>
      </div>

      <div v-show="num == 0" class="anliubox">

        <div class="anliubox1 se">
          <img src="../../../assets/img/dw.png" alt="">
          <div>{{city}}</div>
          <img src="../../../assets/img/xx.png" alt="">
          <select  @change="chooseCore($event)">
            <option  :selected="item == '广东' ? 'selected' : ''" :value="index" v-for="(item,index) in shengname" :key="index">{{item}}</option>
          </select>
        </div>
        
        <div class="anliubox1" style="margin-left:30px">
          <div>了解更多</div>
          <img  class="d" src="../../../assets/img/xy.png" alt="">
        </div>

      </div>

    </div>
    <div class="classifybox ">

      <a href="https://wp.m.163.com/163/html/newsapp/isolate-rule/index.html?_nw_=1&_anw_=1&spss=epidemic" class="classifyitem">
        <img src="../../../assets/img/1.png" alt="">
        <div>隔离政策</div>
      </a>

      <a href="https://wp.m.163.com/163/html/newsapp/activity/20200615/index.html?_nw_=1&_anw_=1&spss=epidemic#/home" class="classifyitem">
        <img src="../../../assets/img/2.png" alt="">
        <div>病患轨迹</div>
      </a>

      <a href="https://c.m.163.com/news/s/S1609858985299.html?spss=epidemic" class="classifyitem">
        <img src="../../../assets/img/3.png" alt="">
        <div>河北疫情</div>
      </a>

      <a href="https://wp.m.163.com/163/page/news/virus_input/index.html?_nw_=1&_anw_=1&spss=epidemic" class="classifyitem">
        <img src="../../../assets/img/4.png" alt="">
        <div>境外输入</div>
      </a>

      <a href="https://wp.m.163.com/163/html/newsapp/activity/20200311/index.html?spss=epidemic#/home" class="classifyitem">
        <img src="../../../assets/img/5.png" alt="">
        <div>辟谣一线</div>
      </a>

    </div>
    
  </div>
</template>

<script>

export default {
  name: 'yqcentent',
  props: {
    findata: Object,
    citydata: Object,
    shengname: Array
  },

  data() {
    return {
      num: 0,
      city: '广东'
    }
  },
  
  methods: {
    //点击title
    dianji() {
      this.num = 1
      this.$emit('changeclass') //传父组件变样式
    },
    dianji1() {
      this.num = 0
      this.$emit('changeclass') //传父组件变样式
    },
    //options选择
    chooseCore(event) {
      let index = event.target.value
      this.city = this.shengname[index]
      this.$emit('chuancity',this.shengname[index]) //获取点击的城市数据传父组件
    }
  }
}
</script>

<style scoped>
  .classifybox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 162px;
    text-align: center;
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 15px solid rgb(244, 244, 244);
    padding: 0 30px;
    
  }
  .classifyitem img {
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
  }
  .classifyitem {
    color: #000;
  }
  .contenbox {
    /* color: #fff; */
    height: 100%;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 2px 20px rgb(0, 0, 0,0.3 );
    margin: 0 30px;
  }
  .boxtitle {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
  }
  .boxtitle div{
    width: 50%;
    text-align: center;
  }
  .boxcontent {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    height: 340px;
  }
  .contentitem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 33.3%;
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
  }
  
  .boxbottom {
    display: flex;
    justify-content: space-between;
    height: 50px;
    padding: 10px 20px ;
    font-size: 16px;
    color: #a9a9a9;
  }
  .active {
    border-radius: 15px 0 0 0;
    background-color: rgb(241, 241, 241);
  }
  .active1 {
    border-radius: 0 15px 0 0;
    background-color: rgb(241, 241, 241);
  }
  
  .contentitem div:nth-of-type(2) {
    font-weight: 700;
    font-size: 38px;
    padding: 10px 0;
  }
  .contentitem div:nth-of-type(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(153, 153, 153);
    font-size: 12px;
  }
  .boxtitle1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .boxtitle1 img{
    width: 35px;
    height: 35px;
  }
  .boxcontent1 {
    display: flex;
    height: 200px;
    justify-content: space-around;
    padding-top: 20px;
    margin-bottom: 20px;
  }
  .boxcontent1item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    width: 33.3%;
    align-items: center;
  }
  .first {
    font-weight: 700;
    font-size: 1em;
  }
  .second {
    font-weight: 700;
    font-size: 38px;
    padding: 10px 0;
  }
  .third {
    display: flex;
    font-size: 12px;
    color: rgb(153, 153, 153);
  }
  .anliubox {
    display: flex;
    padding: 0 20px;
    margin-top: 20px;
    padding-bottom: 30px;
  }
  .anliubox img:nth-of-type(1){
    width: 30px;
    height: 30px;
  }
  .anliubox img:nth-of-type(2){
    width: 20px;
    height: 20px;
  }
  .anliubox1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 80px;
    font-size: 25px;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 50px;
  }
  .anliubox1:nth-of-type(2) {
    color: rgb(198, 0, 0);
    border: 1px solid red;
    background-color: rgb(255, 247, 247);
  }
  .anliubox1 img{
    margin: 0 10px;
  }
  .anliubox1 div{
    vertical-align: middle;
  }
  .d {
    width: 20px !important;
    height: 20px !important;
  }
  .se {
    position: relative;
  }
  .se select {
    position: absolute;
    border: none;
    outline: none;
    top: 0px;
    width: 100%;
    height: 80px;
    opacity: 0;
  }
</style>

