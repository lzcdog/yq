<template>
  <div>

    <div :class="yqys ? 'yq': 'yq1'" >
      <yqheard name="fadeLeft" class="yqheard" ></yqheard>

      <yqcentent @changeclass="changeclass" name="fadeLeft" :citydata="citydata" :findata="findata" class="yqcentent" :shengname="shengname" @chuancity="chuancity"></yqcentent>
    </div>

    <navbar :class="fixedshow ? 'fixed' : '' "  id="navbar" class="navbar "></navbar>

    <div class="Chinamapbox">
      <chinamap  :class="fixedshow ? 'aaa' : '' "  :dataList= "dataList"></chinamap>

      <div class="dianbox">
        <div class="box1" :class="num == 0 ? 'active' : ''" @click="changbox">
          现有确诊
        </div>
        <div class="box1" :class="num == 1 ? 'active' : ''" @click="changbox1">
          累计确诊
        </div>
      </div>

      <zhexianmap 
      :diyitiaodata="diyitiaodata" 
      :diertiaodata="diertiaodata" 
      :datelist="datelist">
      </zhexianmap>

      <div class="dianbox1">
        <div class="box2" :class="num1 == 0 ? 'active' : ''" @click="changbox11">
          全国疫情<br/>
          新增趋势
        </div>
        <div class="box2" :class="num1 == 1 ? 'active' : ''" @click="changbox12">
          累计确诊<br/>
          现有确诊
        </div>
        <div class="box2" :class="num1 == 2 ? 'active' : ''" @click="changbox13">
          累计治愈<br/>
          累计死亡
        </div>
      </div>

    </div>
    
    <quanguoyq :quanguodata="quanguodata" class="quanguoyq" id="quanguoyq"></quanguoyq>
    <div class="worldtitle">
      <h3>世界疫情</h3>
      <a href="https://wp.m.163.com/163/page/news/virus_world/index.html?spss=epidemic">查看更多世界疫情</a>
    </div>
    <!-- <worldyqheader class="worldyqheader"></worldyqheader> -->
  </div>
  
</template>

<script>
  //头部
  import yqheard from '@/view/YQ/yqchildren/yqheard'
  //中部
  import yqcentent from '@/view/YQ/yqchildren/yqcentent'
  //引入navbar
  import navbar from '@/components/navbar/navbar'
  //引入现确诊中国地图
  import chinamap from '../../components/chinamap/map.vue'
  import zhexianmap from '@/components/chinamap/zhexianmap'
  //引入全国数据组件
  import quanguoyq from '@/view/YQ/yqchildren/quanguoyq'
  //引入世界疫情组件头部
  import worldyqheader from '@/view/YQ/yqchildren/worldyqheader'
  //引入请求
  import {request} from '../../network/request'
  export default {
    name: 'yq',
    components: {
      yqheard,
      yqcentent,
      navbar,
      chinamap,
      zhexianmap,
      quanguoyq,
      worldyqheader
    },

    data() {
      return {
        data: [],//请求回来的数据
        input: 0, //境外输出人数
        addinput: 0, //比较昨天境外人数
        noSymptom: 0, //无症状人数
        addnoSymptom: 0, //比较无症状人数
        nowhave: 0, //现有确诊
        addnowhave: 0, //比较现在确诊
        total: 0, //累计确诊
        addtotal: 0, //比较累计确诊
        deadtotal: 0, //死亡人数
        adddeadtotal: 0, //比较死亡人数
        health: 0, //治愈人数
        addhealth: 0, //比较治愈人数
        fintime: '', //截至时间
        findata: {}, //总数据
        shengname: [], //省名字
        citydata: {}, //广东数据
        quanguodata: [], //全国数据
        yqys: true, //yq样式,
        navbartop: 0, //navbar离顶部高度
        scrollTop: 0,  //滚动条距离
        fixedshow: false, //fixed样式显隐
        dataList: [], //第一张图数据
        num: 0, //点击地图切换
        num1: 0 ,//点击地图切换
        datelist: [] ,//时间数据
        diyitiaodata: {} ,//疑似数据新增
        diertiaodata: {}, //确诊数据新增
        quanguoyqtop: 0, //quanguoyq离顶部高度

      }
    },
    created() {
      //网络请求获取数据
      this.getyqsj()
    },
    mounted() {
      //监听滚动条和navbar高度
      this.getnavbartop() 
      window.addEventListener('scroll', this.handleScroll)
    },
    
    methods: {

      //滚动条滚动距离
      handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.scrollTop = scrollTop
        if(this.scrollTop >= this.navbartop) {
          this.fixedshow = true
        }else {
          this.fixedshow = false
        }
        if(this.scrollTop-10 >= this.quanguoyqtop) {
          this.$bus.$emit('fixed',true)
        }else {
          this.$bus.$emit('fixed',false)
        }
      },

      //获取navbar对顶部的高度
      getnavbartop(){
        this.$nextTick(()=>{
          window.addEventListener('scroll', this.handleScroll)
          let oDiv = document.getElementById('navbar').offsetTop;
          let oDiv1 = document.getElementById('quanguoyq').offsetTop;
          this.quanguoyqtop = oDiv1
          this.navbartop = oDiv
        })
      },
      

      //页面加载获取数据
      async getyqsj() {
        let {data} = await request()
        this.data = data
        let ddd = []
        let n = 0
        let n1 = 0

        data.areaTree.map((v)=>{
          ddd.push(v.total.confirm)
          if(v.name == '中国'){
            n = v.total.confirm
          }
        })
        n1 = ddd.reduce((prev, cur)=>{
          return prev+cur
        },0)
        console.log(n1-n)
        //获取省的名字
        let a = data.areaTree
        //时间数据
        let datearray = [] //时间

        let date = data.chinaDayList

        date.map(v=>{
          datearray.push(v.date) //时间
        })

        //疑似数据和确诊新增的
        this.d()

        this.datelist = datearray


        //省名字
        let aa = a.filter((v)=>{
          return v.name == '中国'
        })

        let b = []
        aa[0].children.map((v)=>{
          b.push(v.name)
        })
        this.shengname = b

        //全国数据
        this.quanguodata = aa[0].children
        

        //广东数据
        this.getshengdata('广东')
        this.getshengpeople()
        
        this.input = data.chinaTotal.total.input
        this.addinput = data.chinaTotal.today.input
        this.noSymptom = data.chinaTotal.extData.noSymptom
        this.addnoSymptom = data.chinaTotal.extData.incrNoSymptom
        this.addnowhave = data.chinaTotal.today.storeConfirm
        this.total = data.chinaTotal.total.confirm
        this.addtotal = data.chinaTotal.today.confirm
        this.deadtotal = data.chinaTotal.total.dead
        this.adddeadtotal = data.chinaTotal.today.dead
        this.health = data.chinaTotal.total.heal
        this.addhealth = data.chinaTotal.today.heal
        this.nowhave = this.total-this.health-this.deadtotal
        this.fintime = data.lastUpdateTime
        //变成一个对象
        this.findata = {
          input: this.input,
          addinput: this.addinput,
          noSymptom: this.noSymptom,
          addnoSymptom: this.addnoSymptom,
          addnowhave: this.addnowhave,
          total: this.total,
          addtotal: this.addtotal,
          deadtotal: this.deadtotal,
          adddeadtotal: this.adddeadtotal,
          health: this.health,
          addhealth: this.addhealth,
          nowhave: this.nowhave,
          fintime: this.fintime
        }
        // console.log(this.findata)
      },
      //接受省名字
      chuancity(item){
        this.getshengdata(item)
      },
      //获取省数据
      getshengdata(name) {
        //广东数据

        let d = []
        this.quanguodata.map(v=>{
          if(v.name == name){
            d.push(v)
          }
        })
        
        
        let dd = {
          todayconfirm: d[0].today.confirm,
          totalconfirm: d[0].total.confirm,
          todaydead: d[0].today.dead,
          totaldead: d[0].total.dead,
          todayheal: d[0].today.heal,
          totalheal: d[0].total.heal
        }
        this.citydata = dd
      },
      //获取各省现确诊人数
      getshengpeople() {
        let array = []
        let quanguodata = this.quanguodata
        
        if(this.num == 0){
          quanguodata.map(v=>{
            array.push({name:v.name,value:(v.total.confirm-v.total.dead-v.total.heal)})
          })
            
        }else {
          quanguodata.map(v=>{
            array.push({name:v.name,value:(v.total.confirm)})
          })
        }
            // console.log(array)

          this.dataList = array
      },
      //改变yq样式
      changeclass() {
        this.yqys = !this.yqys
        this.getnavbartop()
      },
      //点击换地图1
      changbox() {
        this.num = 0
        this.getshengpeople()
      },
      changbox1 () {
        this.num = 1
        this.getshengpeople()
      },
      d() {
        let gongjuarray1 = []
        let totalxyqzdata = []
        let totalqzdata = []
        let date = this.data.chinaDayList
        date.map(v=>{
          gongjuarray1.push(v.today) //新增
        })

        //现有确诊和总确诊总计的
        gongjuarray1.map(v=>{
          totalxyqzdata.push(v.suspect) //总计现有确诊
          totalqzdata.push(v.confirm) //总计现有确诊
        })

        this.diertiaodata = {data:totalxyqzdata,name:'确诊',color:"rgb(163, 29, 19)"} //最终的疑似数据
        this.diyitiaodata = {data:totalqzdata,name:'疑似',color:"rgb(255, 214, 103)"} //最终的确诊数据
      },
      //点击换地图2
      changbox11() {
        this.num1 = 0
        this.d()
      },
      changbox12 () {
        this.num1 = 1
        let gongjuarray1 = []
        let totalxyqzdata = []
        let totalqzdata = []
        let date = this.data.chinaDayList
        date.map(v=>{
          gongjuarray1.push(v.total) //新增
        })

        //现有确诊和总确诊总计的
        gongjuarray1.map(v=>{
          totalxyqzdata.push(v.storeConfirm) //总计现有确诊
          totalqzdata.push(v.confirm) //总计现有确诊
        })

        this.diertiaodata = {data:totalqzdata,name:'累计确诊',color:"rgb(163, 29, 19)"} 
        this.diyitiaodata = {data:totalxyqzdata,name:'现有确诊',color:"rgb(228, 74, 61)"}
              
      },
      changbox13 () {
        this.num1 = 2
        let gongjuarray1 = []
        let totalxyqzdata = []
        let totalqzdata = []
        let date = this.data.chinaDayList
        date.map(v=>{
          gongjuarray1.push(v.total) 
        })


        gongjuarray1.map(v=>{
          totalxyqzdata.push(v.dead) 
          totalqzdata.push(v.heal) 
        })

        this.diertiaodata = {data:totalqzdata,name:'累计治愈',color:"rgb(88, 169, 122)"} 
        this.diyitiaodata = {data:totalxyqzdata,name:'累计死亡',color:"rgb(130, 130, 130)"}
      }
    }
  }
</script>

<style scoped>
  .yq {
    position: relative;
    width: 100%;
    height: 905px;
  }

  .yq1 {
    position: relative;
    width: 100%;
    height: 905px;
  }
  .yqheard {
    height: 100%;
  }
  .yqcentent{
    /* height: 100%; */
    position: absolute;
    top: 250px;
    width: 100%;
    max-width: 750px;
    /* z-index: 999; */
  }
  
  .fixed {
    max-width: 750px;
    width: 100%;
    position: fixed;
    margin: 0 auto;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
    box-shadow:0 2px 20px rgb(0, 0, 0, 0.1);
    margin-bottom: 40px;
  }
  
  #navbar{
    height: 80px;
  }
  .aaa {
    margin-top: 80px;
  }
  .Chinamapbox {
    padding: 0 20px;
  }
  .dianbox {
    display: flex;
    margin-top: 20px;
  }
  .box1 {
    width: 50%;
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 22px;
    box-shadow: 0 5px 7px 1px rgb(0, 0, 0, 0.05);
    border: 1px solid #d2d2d2;
    border-radius: 5px;
  }
  .box1:nth-child(1) {
    margin-right: 20px;
  }
  
  .dianbox1 {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .box2 {
    width: 33.3%;
    height: 88px;
    padding: 12px 0;
    text-align: center;
    font-size: 22px;
    box-shadow: 0 5px 7px 1px rgb(0, 0, 0, 0.05);
    border: 1px solid #d2d2d2;
    border-radius: 5px;
    margin-right: 20px;
  }
  .box2:last-child {
    margin-right: 0;
  }
  .active {
    border: 1px solid rgb(206, 71, 51);
    color: rgb(206, 71, 51);
    background-color: rgb(254, 247, 247);
  }
  .quanguoyq {
    padding: 0 20px;
    border-bottom: 20px solid rgb(244, 244, 244);
  }
  .worldyqheader {
    padding: 0 20px;
  }
  .worldtitle {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-content: center;
    line-height: 94px;
    height: 94px;
    border-bottom: 2px solid rgb(238, 238, 238);
  }
  .worldtitle h3 {
    position: relative;
    font-size: 35px;
    font-weight: 400 ;
    padding-left: 17px;
  }
  .worldtitle h3::after {
    content: '';
    position: absolute;
    left: 0;
    top: 35px;
    width: 8px;
    height: 30px;
    background-color: rgb(225, 0, 0);
    font-size: 35px !important;
  }
  .worldtitle a {
    position: relative;
    font-size: 24px;
    color: #666;
    margin-right: 20px;
  }
  .worldtitle a::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 16px;
    top: 41px;
    right: -20px;
    background-size: 100%  100%;
    background-image: url('../../assets/img/下载 (1).png');
  }
</style>