<template>
  <div class='contacts'>
    <div class="my-info">
      <div class="my-name">{{ curUser.name }}</div>
      <n-avatar :size="40" round :src="curUser.avatar" />
    </div>
    <div :class="['contacts-item',  chatUser == null ? 'active':'']">
      <div  @click="clickUserAvatar('quliao')" class="user"> {{ `甜粥铺 (${userList.size})` }}</div>
    </div>
    <div @click="clickUserAvatar(item)" :class="['contacts-item ']"  v-for="item in users" key="item.id">
      <n-badge dot :show="initBadge(item)">
        <n-avatar  round :size="30" class="avatar" :src="item.avatar" />
      </n-badge>
      <div class="user">{{ item.name }}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed } from 'vue'
export default {
  name: 'LeftContacts',
  props: {
    userList: {},
    curUser: {
      type: Object,
      default: {}
    },
    chatUser:{}
  },
  setup(props,context) {    
    // 获取当前在线用户
  const users = computed (() => {
    const list = []
    if (props.userList.size === 0) return []
    props.userList.forEach((value, key) => {
      if (key !== props.curUser.id) {
        list.push({
          avatar: value.avatar,
          id: key,
          name: value.name,
          new: value.new,
        })
      }
    })
    return list
  })

  // 点击用户切换私聊
    const clickUserAvatar = (e:any) => {
      context.emit('click-user', {
        name: e.name,
        id: e.id,
        avatar: e.avatar,
      })
    }

    // 是否显示消息提示图标
    const initBadge = (val) => {
      if(val.new == undefined){
        return false
      }
      return val.new
    }

    return {
      users,
      clickUserAvatar,
      initBadge
    };
  },
};
</script>
<style scoped lang='css'>
.contacts {
  width: 30%;
  height: 100%;
  border-radius: 0 0 0 20px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
}
.avatar{
  margin-right: 10px;
}
.contacts-item {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
}
.active{
  background-color: rgba(0, 0, 0, 0.2);
}

.my-info {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  border-bottom: 1px solid #999;
}

.my-name {
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  margin-right: 10px;
}
</style>
