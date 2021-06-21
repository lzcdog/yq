<template>
  <div>
    <div class="contenbox" id="contenbox">

      <div class="boxtitle">
        <div @click="dianji" :class="num == 0 ? 'active': ''">全国疫情数据(含港澳台)</div>
        <div class="boxtitle1" @click="dianji1" :class="num == 1 ? 'active1': ''">
          <div>{{'广州'}}疫情数据</div>
        </div>

      </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "worldheader",
  data() {
    return {
      num: 0
    }
  }
};
</script>

<style scoped>
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
  .boxtitle1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .boxcontent1 {
    display: flex;
    height: 200px;
    justify-content: space-around;
    padding-top: 20px;
    margin-bottom: 20px;
  }
</style>