import { io } from 'socket.io-client'
import { reactive, ref } from 'vue'
import { JoinEvent } from '../../components/joinModel.vue'
export default () => {
  // 创建 socket 实例
  const socket = io('ws://localhost:5433')

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

  const chatData = ref<ChatDataItem[]>([])
  const userList = ref<Map<string, User>>(new Map())
  const message = ref('')

  // 获取当前加入群聊信息
  socket.on('joined', (e: typeof curUser) => {
    curUser.avatar = e.avatar
    curUser.id = e.id
    curUser.name = e.name
  })

  // 监听 welcome
  socket.on('welcome', ({ name, uList }) => {
  uList.forEach((item: any[]) => {
    const [id, value] = item
    userList.value.set(id, value)
  })

  chatData.value.push({
    type: 'tips',
    id: Math.random().toString().split('.')[1].slice(0, 10),
    content: '欢迎' + name + '加入群聊~',
  })
  })


  // 群聊发送消息
const handleSend = (v: string) => {
  const obj = {
    id: Math.random().toString().split('.')[1].slice(0, 10),
    name: curUser.name,
    avatar: curUser.avatar,
    content: v,
    userId: curUser.id,
  }
  // 在 chatData 中新增一条数据，表示自己发送的
  const type: 'me' = 'me'
  chatData.value.push(Object.assign({}, { type }, obj))
  // 发出send事件，将消息发送出去
  socket.emit('send', obj)
}

// 监听消息的广播
socket.on('message', (e: any) => {
  const msg = Object.assign({}, e, { type: 'your' }) as ChatDataItem
  chatData.value.push(msg)
})


  return{
    handleJoin,
    curUser,
    userList,
    chatData,
    handleSend,
  }
}