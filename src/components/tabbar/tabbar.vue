<template>
  <div>
    <div class="tabbarbox">
      <div class="yiqi">
      <div class="tabbarItem"  @click="yqanliu">
        <img v-show="num == 0 " src="../../assets/img/dongtaia.png" alt="">
        <img v-show="num != 0 " src="../../assets/img/dongtaib.png" alt="">
        <a href="#" :class="num == 0 ? 'active' : '' ">疫情</a>
      </div>
      <div class="tabbarItem"  @click="tqanliu">
        <img v-show="num == 1 " src="../../assets/img/tianqia.png" alt="">
        <img v-show="num != 1 " src="../../assets/img/tianqib.png" alt="">
        <a href="#" :class="num == 1 ? 'active' : '' " >天气</a>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {
      num: 0
    }
  },
  methods: {
    //点击疫情按钮
    yqanliu() {
      this.num = 0
    },
    //点击天气按钮
    tqanliu() {
      this.num = 1
    }
  }
};
</script>

<style scoped>
  .tabbarbox {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 750px;
    height: 100px;
    background-color: #fff;
    z-index: 99999;
  }
  .yiqi {
    box-shadow: 0 -7px 5px #f2f2f2;
    display: flex;
    justify-content: space-around;
  }
  .tabbarItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 0;
  }
  .tabbarItem img{
    width: 60px;
    height: 60px;
  }
  a {
    font-size: 26px;
    color: rgb(148, 148, 148);
  }
  .active {
    color: rgb(41, 161, 247);
  }
</style>