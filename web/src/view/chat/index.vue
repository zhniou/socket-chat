<template>
  <div class='chat'>
    <mainContainer>
      <NavHeader :curUser="curUser"/>
      <div class="main">
        <Contacts :userList="userList" :curUserId="curUser.id"></Contacts>
        <ChatContainer :chatData="chatData" @send="handleSend"></ChatContainer>
      </div>
    </mainContainer>
    <JoinModel @join="handleJoin"/>
  </div>
</template>

<script lang='ts'>
import mainContainer from '../../components/mainContainer.vue';
import Contacts from '../../components/leftContacts.vue'
import ChatContainer from '../../components/ChatContainer.vue'
import JoinModel from '../../components/joinModel.vue'
import NavHeader from '../../components/NavHeader.vue'
import init from './init'
export default {
  name: 'ChatItem',
  components:{
    mainContainer,
    Contacts,
    ChatContainer,
    JoinModel,
    NavHeader
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
