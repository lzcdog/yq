<template>
  <div>
    <h2>中国病例</h2>
    <div class="title" :class="fixed ? 'fixed':''">
      <div v-for="(item, index) in title" :key="index" >
        {{ item }}
      </div>
    </div>
    <ul  :class="fixed ? 'aaa' : '' ">
      <div v-for="(item,index) in shunxu" :key="index" class="a">
        <li ref="li" >
          <span @click="yicangboxclick(index)">{{item.name}}</span>
          <span>{{item.total.confirm-item.total.heal-item.total.dead}}</span>
          <span
            >{{item.total.confirm}}
            <p>较昨日+{{item.today.confirm}}</p>
          </span>
          <span>{{item.total.dead}}</span>
          <span>{{item.total.heal}}</span>
          <a>详情</a>
        </li>

        <div ref="yicangbox1" class="none">
          <div ref="yicangbox" class="yicangbox" v-for="(items,index) in item.children" :key="index">
          <div>{{items.name}}</div>
          <div>{{(items.total.confirm - items.total.heal)>0 ? items.total.confirm - items.total.heal : '0' }}</div>
          <div
            >{{items.total.confirm}}
            <p>较昨日+{{items.today.confirm}}</p>
          </div>
          <div>{{items.total.dead}}</div>
          <div>{{items.total.heal}}</div>
          <div></div>
        </div>
        </div>
        
        
      </div>
    </ul>
    <p class="end">以上数据均来自官方通报</p>
  </div>
</template>

<script>
export default {
  name: "quanguoyq",
  
  props: {
    quanguodata: Array
  },
  computed: {
    shunxu() {
      this.quanguodata.sort((a,b)=>{
        return (b.total.confirm-b.total.heal-b.total.dead) - (a.total.confirm-a.total.heal-a.total.dead)
      })
      return this.quanguodata
    }
  },
  mounted(){
    this.$bus.$on('fixed',(e)=>{
      if(e){
        this.fixed = true
      }else {
        this.fixed = false
      }
    })
  },
  data() {
    return {
      title: ["地区", "现有确诊", "确诊", "死亡", "治愈", "疫情"],
      fixed: false
    };
  },
  methods: {
    yicangboxclick(index) {
      let _el1 = this.$refs.yicangbox1[index]
      let li = this.$refs.li[index]

      if (_el1.getAttribute('class') === 'none') {
        _el1.setAttribute('class', '')
        li.setAttribute('class','li') 
      } else {
        _el1.setAttribute('class', 'none')
        li.setAttribute('class','') 
      }
    }
  }
};
</script>

<style scoped>

h2 {
  font-size: 34px;
  font-weight: 400;
  padding: 20px 0;
}
.title {
  display: flex;
  padding-left: 30px;
  height: 80px;
  font-size: 24px;
  line-height: 80px;
  text-align: center;
  background-color: rgb(238, 238, 238);
  border-bottom: 2px solid rgb(233, 233, 233);
}
.title div:nth-child(1) {
  text-align: left;
  flex: 1;
}
.title div:nth-child(2) {
  color: #e44a3d;
}
.title div {
  flex: 1;
}
ul {
  font-size: 24px;
  list-style: none;
}
li {
  position: relative;
  display: flex;
  height: 90px;
  line-height: 90px;
  padding-left: 30px;
  text-align: center;
  border-left: 2px solid rgb(233, 233, 233);
  border-right: 2px solid rgb(233, 233, 233);
  border-bottom: 2px solid rgb(233, 233, 233);
}
li span,
li a {
  flex: 1;
}
li a {
  color: #3e8ce7;
}

li span:nth-child(1) {
  text-align: left;
  font-weight: 700;
}
li span:nth-child(2) {
  color: #e44a3d;
}
li span:nth-child(3) {
  line-height: normal;
  margin-top: 28px;
}
li p {
  font-size: 20px;
  color: #888;
  white-space:nowrap;

}
  .a:nth-child(odd) {
    background-color: rgb(246, 246, 246);
  }
  .a:nth-child(even) {
    background-color: rgb(255, 255, 255);
  }
.li::after {
  position: absolute;
  content: "";
  top: 40px;
  left: 7px;
  width: 16px;
  height: 10px;
  background-size: 100%;

  background-image: url("../../../assets/img/下载.png");
  transform: rotate(180deg);
  transition: all .5s;
}
li::after {
  position: absolute;
  content: "";
  top: 40px;
  left: 7px;
  width: 16px;
  height: 10px;
  background-size: 100%;
  background-image: url("../../../assets/img/下载.png");
  transition: all .5s;

}

.yicangbox {
  display: flex;
  height: 90px;
  line-height: 90px;
  padding-left: 30px;
  text-align: center;
  border-left: 2px solid rgb(233, 233, 233);
  border-right: 2px solid rgb(233, 233, 233);
  border-bottom: 2px solid rgb(233, 233, 233);
  background-color: rgb(255,255,255);
}
.yicangbox div{
  flex: 1;
}
.yicangbox div:nth-child(3) {
  line-height: normal;
  margin-top: 28px;
}
.yicangbox div:nth-child(2) {
  color: #e44a3d;
}
.yicangbox div:nth-child(1) {
  text-align-last: left;
}
.yicangbox div:nth-child(1),.yicangbox p {
  color: #707070;
}
.yicangbox div:nth-child(1),ul li span:nth-child(1),.title div:nth-child(1) {
  min-width: 144px;
  /* color: #707070; */
}
.yicangbox p {
  font-size: 20px;
  white-space:nowrap;
}
.none {
  display: none;
}
.fixed {
  width: 710px;
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}
.aaa {
  margin-top: 60px;
}
.end {
  padding: 20px 0 40px;
  color: #aaa;
  font-size: 28px;
  text-align: right;
}
</style>