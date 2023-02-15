<template>
  <div class='chat-area'>
    <div class="chat-info">
      <n-avatar round :size="45" class="avatar" :src="chatUser.avatar" />
      <span>{{ chatUser.name }}</span>
    </div>
    <!-- 信息展示区域 -->
    <template v-for="(item, index) in chatData" class="area">
      <div class="chat-content">
        <div>
          <div :class="item.type === 'your' ? 'your' : 'me'">
            <n-avatar :size="45" class="avatar" :src="item.avatar" />
            <span class="text">{{ item.content }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- 消息编辑发送 -->
    <div class="input-area">
      <n-input type="text" class="input-msg" size="large" v-model:value="value" @keyup.enter="handleSend"
        placeholder="your message" round />
      <n-button class="btn" @click="handleSend" color="#8a2be2">发送</n-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, ref } from 'vue'
export default {
  name: 'ChatContainer',
  props: {
    chatData: {},
    chatUser:{}
  },
  setup(props, context) {
    const value = ref('')
    // 发送私聊消息
    const handleSend = () => {
      if (value.value == '') return
      context.emit('send', value.value)
      value.value = ''
    }    

    return {
      value,
      handleSend,
    };
  },
};
</script>
<style scoped lang='css'>
.chat-info {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chat-info span{
  font-size: 20px;
  color: #fff;
  margin-left: 10px;
}

.chat-area {
  width: 70%;
  height: 100%;
  border-radius: 0 0px 20px 0;
  background-color: transparent;
  position: relative;
  padding: 0 30px 80px;
  box-sizing: border-box;
  overflow: scroll;
}

.area {
  overflow: scroll;
}

.input-area {
  display: flex;
  align-items: center;
  position: relative;
  bottom: 20px;
  width: 64%;
  position: fixed;
}

.input-msg {
  flex: 1;
  height: 50px;
}

.btn {
  height: 50px;
  width: 140px;
  border-radius: 20px;
  margin-left: 20px;
}

.tips {
  font-size: 18px;
  color: #000;
  margin: 20px 0;
}

.me.avatar {
  border-radius: 8px;
  margin-right: 10px;
}

.me .text {
  background-color: #56cac7;
  padding: 10px;
  margin-right: 10px;
  border-radius: 8px;
}

.me {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: end;
  margin: 20px 0;
}

.your {
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 20px 0;
}

.your.avatar {
  border-radius: 8px;
}

.your .text {
  background-color: #712df4;
  padding: 10px;
  border-radius: 8px;
  margin-left: 10px;
}
</style>
