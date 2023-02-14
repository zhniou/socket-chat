<template>
  <!-- <div :class="['modal', isOpen ? 'modal-open' : '']">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-center">加入群聊</h3>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">请输入你的名字</span>
        </label>
        <input
          type="text"
          placeholder="your name"
          v-model="name"
          class="input input-bordered w-full"
          @keyup.enter="handleJoin"
        />
      </div>

      <div class="modal-action justify-center">
        <label for="my-modal" class="btn px-8" @click="handleJoin">进入</label>
      </div>
    </div>
  </div> -->
  <n-modal v-model:show="isOpen" :mask-closable="false">
    <n-card
      style="width: 600px"
      title="加入群聊"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
    <div class="form-control w-full">
        <label class="label">
          <span class="label-text">请输入你的名字</span>
        </label>
        <!-- <n-input type="text" class="input-name" size="large" v-model="name" placeholder="your name" round  @keyup.enter="handleJoin"/> -->
        <input
          type="text"
          placeholder="your name"
          v-model="name"
          class="input input-bordered w-full"
          @keyup.enter="handleJoin"
        />
      </div>

      <template #footer>
        <n-button color="#3d4451" @click="handleJoin" class="btn" size="large">进入</n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import avatarList from './../assets/avatar'
export interface JoinEvent {
  name: string
  avatar: string
}
const aList = [...avatarList]
const emits = defineEmits({
  // 校验 join 事件
  join: (e: JoinEvent) => {
    const { name, avatar } = e
    
    if (name && avatar) {
      return true
    } else {
      console.warn('未输入名字~')
      return false
    }
  },
})
const name = ref('')
const isOpen = ref(true)
const handleJoin = () => {
  // 随机头像
  const randomIndex = Math.floor(Math.random() * aList.length)
  const avatar = aList[randomIndex]
  emits('join', { name: name.value, avatar })
  isOpen.value = false
}
</script>

<style scoped lang="css">
.input-name{
  margin: 20px 0 0;
}
.label-text{
  font-size: 17px;
}
.btn{
  width: 120px;
  height: 45px;
  border-radius: 10px;
}
</style>