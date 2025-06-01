const http = require('http')
const {WebSocketServer} = require('ws')
const url = require('url')
const uuidv4 = require('uuid').v4
const server = http.createServer()
const wsServer = new WebSocketServer({server})

connections = {}
users = {}

const Broadcast = () => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid]
    const message = JSON.stringify(users)
    connection.send(message)
  });
  
}

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString())
  const user = users[uuid]
  user.state = message

  Broadcast()
  console.log(`Received Latest update from ${user.username} with positions: ${JSON.stringify(user.state)}`);
}

wsServer.on('connection',(connection,request)=>{
  const {username} = url.parse(request.url,true).query
  const uuid = uuidv4()
  console.log(`New connection from ${username}`)
  console.log(`UUID: ${uuid}`)

  connections[uuid] = connection

  users[uuid] = {
    username:username,
    state : {
     
    }
  }

  connection.on('message', message=>{handleMessage(message,uuid)})
  connection.on('close', ()=> {
    console.log(`Connection closed for ${username}`)
    delete connections[uuid]
    delete users[uuid]
  })
})


server.listen(8000,()=> {
  console.log('Server is listening on port 8000')
})