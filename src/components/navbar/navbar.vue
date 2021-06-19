<template>
  <div>
    <div class="navbar">
      
      <div v-for="(item,index) in title" :key="index" >
        <a @click="changnum(index)" href="#" :class="index == num? 'active': '' " >{{item}}</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      title: ['中国疫情','世界疫情','实时播报'],
      num: 0
    }
  },
  methods: {
    changnum(index) {
      this.num = index
    }
  }
}
</script>

<style scoped>
  .navbar {
    max-width: 750px;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 2px solid rgb(247, 247, 247);
    background-color: #fff;
  }
  
  a {
    position: relative;
    color: #000;
    font-size: 30px;
    padding-bottom: 20px;
  }
  .active {
    font-weight: 550;
    color: #e10000;
  }
  .active::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 10px;
    width: 100px;
    height: 5px;
    background-color: #e10000;
  }
</style>