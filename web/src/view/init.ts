import { io } from 'socket.io-client'
import { reactive, ref } from 'vue'
export default () => {
  // 创建 socket 实例
  const socket = io('ws://localhost:5433')

  interface ChatDataItem {
    type: 'your' | 'me' | 'tips'
    id: string
    name?: string
    content: string
    avatar?: string
    userId?: string
  }

  // 监听 join
  const handleJoin = (e:any) => {
    socket.emit('join', Object.assign({}, e))
  }

  const curUser = reactive({ //当前登陆的用户信息
    name: '',
    avatar: '',
    id: '',
  })

  // 获取当前加入群聊信息
  socket.on('joined', (e: typeof curUser) => {
    curUser.avatar = e.avatar
    curUser.id = e.id
    curUser.name = e.name
  })

  const userList = ref(new Map()) //在线用户
  const chatData = ref<ChatDataItem[]>([]) //群聊的信息
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

  // 监听群聊消息的广播
  socket.on('message', (e: any) => {
    const msg = Object.assign({}, e, { type: 'your' }) as ChatDataItem
    chatData.value.push(msg)
  })

  const chatUserId = ref('') //私聊用户id
  const chatUser = ref(null) //私聊用户信息
  const chatType = ref('qunliao') //聊天类型
  // 点击用户头像私聊
  const handleClickAvatar = (e:any) => {
  if (e.id === curUser.id) {
    return
  }
  if(e.name == undefined){
    chatType.value = 'qunliao'
    return
  }
  chatType.value = 'siliao'
  chatUserId.value = e.id //私聊对象id
  chatUser.value = e //私聊对象
  const u = userList.value.get(chatUserId.value)
  // 点击头像去掉表示已读去掉红点
  if (u) {
    u.new = false
  }
  }

  const userChatData = ref<Map<string, ChatDataItem[]>>(new Map())
  // 私聊发送消息
  const handleSendUser = (v: string) => {
  const obj = {
    id: Math.random().toString().split('.')[1].slice(0, 10),
    name: curUser.name,
    avatar: curUser.avatar,
    content: v,
    userId: curUser.id,
    sendUserId: chatUserId.value,
  }
  // 在 userChatData 中新增一条数据，表示自己发送的
  const type: 'me' = 'me'
  if (!userChatData.value.has(chatUserId.value)) {    
    userChatData.value.set(chatUserId.value, [])
  }  
  const _chatData = userChatData.value.get(chatUserId.value) ?? [] 
  _chatData.push(Object.assign({}, { type }, obj))
  // 发出send事件，将消息发送出去
  socket.emit('send-user', obj)
  }
  
  // 私聊监听接受消息
  socket.on('message-user', (e: any) => {
    const msg = Object.assign({}, e, { type: 'your' }) as ChatDataItem
    const sendId = e.userId
    if (!userChatData.value.has(sendId)) {
      userChatData.value.set(sendId, [])
    }
    const chatData = userChatData.value.get(sendId) ?? []
    chatData.push(msg)
    // 给发送消息的id标记新信息
    const u = userList.value.get(sendId)
    if (u) {
      u.new = true
    }
  })

  // 监听退出
  socket.on('quit', (id: string) => {
      const user = userList.value.get(id)
      userList.value.delete(id)
      chatData.value.push({
        type: 'tips',
        id: Math.random().toString().split('.')[1].slice(0, 10),
        content: user?.name + '退出群聊~',
      })
  })
  

  return{
    handleJoin,
    curUser,
    userList,
    chatType,
    // 群聊
    ...{chatData , handleSend , handleClickAvatar},
    // 私聊
    ...{userChatData , chatUserId, chatUser , handleSendUser},
  }
}