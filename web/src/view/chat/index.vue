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
      <ChatContainer
      v-if="chatType == 'qunliao'"
      :chatData="chatData" 
      @send="handleSend" 
      @click-user="handleClickAvatar"
      ></ChatContainer>
      <!-- 私聊 -->
      <Chat
      v-else
      :chatData="userChatData.get(chatUserId) ?? []"
      :chatUser="chatUser"
      @send="handleSendUser" 
      ></Chat>
    </mainContainer>
    <JoinModel @join="handleJoin"/>
  </div>
</template>

<script lang='ts'>
import mainContainer from '../../components/mainContainer.vue';
import Contacts from '../../components/leftContacts.vue'
import ChatContainer from '../../components/ChatContainer.vue'
import JoinModel from '../../components/joinModel.vue'
import Chat from '../../components/chat.vue'
import init from './init'
export default {
  name: 'ChatItem',
  components:{
    mainContainer,
    Contacts,
    ChatContainer,
    JoinModel,
    Chat
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
