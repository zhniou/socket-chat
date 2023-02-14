<template>
  <div class='main-container'>
    <!-- <div class="header">
      🍣寿司聊天室
    </div> -->
    <!-- <img class="bg-img" src="../assets/bg.jpeg" alt=""> -->
    <div class="chat">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
export default {
  name: '',
  setup() {
    return {};
  },
};
</script>
<style scoped lang="css">
.main-container{
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: pink;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chat{
  width: 80%;
  height: 80%;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
}
/* .header{
  position: fixed;
  z-index: 999;
  top: 0;
  text-align: center;
}
.bg-img{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    object-fit: cover;
  } */
</style>
