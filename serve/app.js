import { Server } from 'socket.io'
import { socketServer } from './chat/socket.js'
// 开启cors跨域
const io = new Server(5433, { cors: true })

socketServer(io)

console.log('服务启动..');