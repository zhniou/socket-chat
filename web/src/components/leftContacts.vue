<template>
  <div class='contacts'>
    <div class="contacts-item">
      <div class="user"> {{ `甜粥铺 (${userList.size})` }}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed } from 'vue'
export default {
  name: 'LeftContacts',
  props: {
    userList: {
      type: Object,
      default: {}
    },
    curUserId: {}
  },
  setup(props) {
    console.log(props.userList, 'userList');
    return {};
  },
};
</script>
<style scoped lang='css'>
.contacts {
  width: 30%;
  height: 100%;
  border-radius: 0 0 0 20px;
  overflow: hidden;
  background-color: transparent;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
}

.contacts-item {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 18px;
  font-weight: 500;
}
</style>
