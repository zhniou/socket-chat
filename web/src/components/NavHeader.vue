<template>
  <div class='header'>
    <div class="my-name">{{ curUser.name }}</div>
      <n-avatar
      :size="40"
      round
      :src="curUser.avatar"
    />
    </div>
</template>

<script lang='ts'>
export default {
  name: 'NavHeader',
  props:{
    curUser:{
      type:Object,
      default:{}
    }
  },
  setup(props) {
    return {};
  },
};
</script>
<style scoped lang='css'>
.header{
  min-height: 60px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0 50px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
}
.my-name{
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  margin-right: 10px;
}
</style>
