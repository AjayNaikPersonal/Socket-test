const http = require('http')
const express = require('express')
const app = express();
const server = http.createServer(app);
const {Server} = require('socket.io');
const PORT = 3000

app.use(express.static('./public'))

app.get('/',(req,res)=>{
    return res.sendFile('index',{});
})

const io = new Server(server);

io.on('connection',(socket)=>{
    
    socket.on('user-message',(message)=>{
        io.emit('message',{message,socketId : socket.id})
    })
})


server.listen(PORT,console.log(`server running on port ${PORT}`));


