<template>
  <div>
    <div class="fenmian">
      <h1>科学防护 共渡难关</h1>
      <h2>肺炎疫情实时动态播报</h2>
      <img src="../../../assets/img/favicon.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'yqheard',
  
}
</script>

<style scoped>
  h1,h2 {
    font-size: 42px;
  }
  h2 {
    font-size: 32px;
    font-weight: 400;
  }
  .fenmian{
    position: relative;
    height: 440px;
    padding: 100px 50px 0;
    color: #fff;
    background: url('../../../assets/img/bg.png') no-repeat;
    background-size: 100% 100%;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: 50px;
    right: 30px;
  }
</style>