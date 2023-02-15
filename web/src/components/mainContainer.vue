<template>
  <div class='main-container'>
    <img class="img" src="../assets/bg.jpeg" alt="">
    <div class="content">
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
}
.img{
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
}
.content{
  width: 66%;
  height: 80%;
  border-radius: 20px;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
}
</style>
