import { io } from 'socket.io-client'
import { reactive, ref } from 'vue'
import { JoinEvent } from '../../components/joinModel.vue'
export default () => {
  // 创建 socket 实例
  const socket = io('ws://localhost:5433')
  console.log(socket,'socket');

  const handleJoin = (e: JoinEvent) => {
    socket.emit('join', Object.assign({}, e))
  }

  interface ChatDataItem {
    type: 'your' | 'me' | 'tips'
    id: string
    name?: string
    content: string
    avatar?: string
    userId?: string
  }

  const curUser = reactive({
    name: '',
    avatar: '',
    id: '',
  })

  interface User {
    name: string
    avatar: string
    id: string
    new: boolean
  }


  const userList = ref<Map<string, User>>(new Map())
  const message = ref('')
  const drawerShow = ref(false)
  const userChatData = ref<Map<string, ChatDataItem[]>>(new Map())
  const chatUserId = ref('')
  const userMessage = ref('')

  // 获取当前加入群聊信息
  socket.on('joined', (e: typeof curUser) => {
    curUser.avatar = e.avatar
    curUser.id = e.id
    curUser.name = e.name
    console.log(curUser,'curUser');
  })



  return{
    handleJoin
  }
}