<template>
  <div class='chat'>
    <mainContainer>
      <Contacts 
        :curUser="curUser" 
        :userList="userList" 
        :curUserId="curUser.id"
        :chatUser="chatUser"
        @click-user="handleClickAvatar"
        ></Contacts>
      <!-- 群聊 -->
      <publicChat
      v-if="chatType == 'qunliao'"
      :chatData="chatData" 
      @send="handleSend" 
      @click-user="handleClickAvatar"
      ></publicChat>
      <!-- 私聊 -->
      <personalChat
      v-else
      :chatData="userChatData.get(chatUserId) ?? []"
      :chatUser="chatUser"
      @send="handleSendUser" 
      ></personalChat>
    </mainContainer>
    <JoinModel @join="handleJoin"/>
  </div>
</template>

<script lang='ts'>
import mainContainer from '../components/mainContainer.vue';
import Contacts from '../components/leftContacts.vue'
import publicChat from '../components/publicChat.vue'
import JoinModel from '../components/joinModel.vue'
import personalChat from '../components/personalChat.vue'
import init from './init'
export default {
  name: 'ChatItem',
  components:{
    mainContainer,
    Contacts,
    publicChat,
    JoinModel,
    personalChat
  },
  setup() {
    return { ...init()};
  },
};
</script>
<style scoped lang='css'>
.main{
  display: flex;
  width: 100%;
  height: 660px;
  box-sizing: border-box;
}
.chat{
  width: 100%;
  height: 100%;
}
</style>
