<template>
  <div class='chat'>
    <mainContainer>
      <Contacts></Contacts>
      <ChatContainer></ChatContainer>
    </mainContainer>
    <JoinModel @join="handleJoin"/>
  </div>
</template>

<script lang='ts'>
import mainContainer from '../../components/mainContainer.vue';
import Contacts from '../../components/leftContacts.vue'
import ChatContainer from '../../components/ChatContainer.vue'
import JoinModel,{ JoinEvent }  from '../../components/joinModel.vue'
import init from './init'
export default {
  name: 'ChatItem',
  components:{
    mainContainer,
    Contacts,
    ChatContainer,
    JoinModel
  },
  setup() {
    return { ...init()};
  },
};
</script>
<style scoped lang='css'>
.chat{
  width: 100%;
  height: 100%;
}
</style>
