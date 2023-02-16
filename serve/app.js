import { Server } from 'socket.io'

// 开启cors跨域
const io = new Server(5433, { cors: true })

let userList = new Map()
  io.on('connection', socket => {  //实例在连接和重新连接时触发
    // 监听加入用户加入
    socket.on('join', e => {
      userList.set(socket.id, e)
      // 加入成功后返回加入成功的事件
      socket.emit('joined', Object.assign({}, e, { id: socket.id }))
      const uList = [...userList.entries()]
      // 触发广播
      socket.broadcast.emit('welcome', {
        ...e,
        uList,
      })
      // 自己展示加入的信息
      socket.emit('welcome', {
        ...e,
        uList,
      })
    })

    // 监听消息发送
    socket.on('send', e => {
      // 接受到消息给他广播出去 所有连接到服务器的客户端都会受到广播的信息
      socket.broadcast.emit('message', e)
    })

    // 监听私聊消息的发送
    socket.on('send-user', e => {
      const sendUserId = e.sendUserId
      socket.to(sendUserId).emit('message-user', e)
    })
    
    // 用户离开
    socket.on('disconnecting', () => { //socket失去链接时触发，包括关闭浏览器，主动断开，掉线等情况
      const bool = userList.delete(socket.id)
      // 如果有用户离开，在进行广播（因为只打开页面不进入关闭页面也会触发这个事件）
      bool && socket.broadcast.emit('quit', socket.id)
    })
  })

console.log('服务启动..');