const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
// const cors = require("cors");
const { MongoClient } = require("mongodb");
require('dotenv').config()
// let MongoClient = mongo.MongoClient;

const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port',webSocketsServerPort);


const wsServer = new webSocketServer({
  httpServer: server
});

const url = process.env.URL;
const client = new MongoClient(url);

let count = 1
const clients = {};
wsServer.on('request', function (request) {
  console.log(count++)
  const connection = request.accept(null, request.origin);
  // console.log(connection);

  connection.on('message', async function(message) {
      const data = JSON.parse(message.utf8Data)
      console.log('Received data: ', data);


      // Login Process
      if(data.type === 'login'){
        const user = await login(data.userName,data.password);
        // console.log(user)
        if(user.userName){
          const userList = await findUsers(data.userName);
          data.userList = userList;
          connection.sendUTF(JSON.stringify(data));
          clients[data.userName] = connection;
        }
        else{
          connection.sendUTF(JSON.stringify({error:user}));
        }
      }

      // Register Process
      else if(data.type === 'register'){
        const user = await register(data.userName,data.password);
        if(user === "User Exist"){
          connection.sendUTF(JSON.stringify({error:user}));
        }
        else{
          const userList = await findUsers();
          data.userList = userList;
          connection.sendUTF(JSON.stringify(data));
          clients[data.userName] = connection;
        }
      }

      // Message Process
      else if(data.type === 'message'){
        const messages = await getMessages(data.sender,data.receiver);
        // console.log(messages);
        connection.sendUTF(JSON.stringify(messages));
      }

      // receive message
      else if(data.type === "send Message"){
        const messages = await adMessage(data.sender,data.receiver,data.message);
        let userList = await findUsers(data.sender);
        data.userList = userList;
        data.messages = messages;
        connection.sendUTF(JSON.stringify(data));
        userList = await findUsers(data.receiver);
        data.userList = userList;
        try{
          clients[data.receiver].sendUTF(JSON.stringify(data));
          // console.log(client[data.receiver]);
        }
        catch(e){
          // console.log(client[data.receiver]);
          console.log(e);
        }
      }

      // search User
      else if(data.type === "search User"){
        if(data.userName === ""){
          const userList = await findUsers(data.username);
          data.userList = userList;
          connection.sendUTF(JSON.stringify(data));
        }
        else{
          const userList = await searchUsers(data.username);
          data.userList = userList;
          connection.sendUTF(JSON.stringify(data));
        }
        
      }
      else if(data.type === 'getUsers'){
          const userList = await findUsers(data.userName);
          // console.log(userList);
          data.userList = userList;
          connection.sendUTF(JSON.stringify(data));
      }
    }
  )
});

async function register(userName,passWord){
  let user = ""
  try {
    const database = client.db('chat');
    const users = database.collection('users');
    // Query for a movie that has the title 'Back to the Future'
    let query = { userName:userName}
    user = await users.findOne(query);
    if(user){
      return "User Exist";
    }
    query = { userName:userName,password:passWord };
    user = await users.insertOne(query);
  
  } catch(e) {
    console.log(e)
  }
  return user;
}

async function login(userName,passWord){
  
  let user = ''
  try {
    const database = client.db('chat');
    const users = database.collection('users');
    const query = { userName:userName};
    user = await users.findOne(query);
        if(user.password !== passWord){
          return "Invalid Password"; 
        }
  }
  catch(e){
    return "Invalid Username";
  }

  return user;
}

async function findUsers(username){
  await client.connect();
  try{
    const database = client.db('chat');
    const messages = database.collection('messages');
    userList = await messages.find({$or:[{sender:username},{receiver:username}]}).toArray(); 
    userList.reverse();

    let uniqueUsers = new Set();

    for (let message of userList) {
      uniqueUsers.add(message.sender);
      uniqueUsers.add(message.receiver);
    }

    let uniqueUsersArray = Array.from(uniqueUsers)
    
    // const usersArray = userList.map(user => user.sender);
    // console.log(uniqueUsersArray);
    return uniqueUsersArray;

  }
  catch(e){
    console.log(e)
    return [];
  }
}

async function getMessages(sender,receiver){
  await client.connect();
  try{
    const database = client.db('chat');
    const messages = database.collection('messages');
    userList = await messages.find({$or:[{sender:receiver,receiver:sender},{sender:sender,receiver:receiver}]}).toArray(); 
    // const usersArray = userList.map(user => user.userName);
    return userList;

  }
  catch(e){
    console.log(e)
    return [];
  }
}

async function adMessage(sender,receiver,message){
  await client.connect();
  try {
    const database = client.db('chat');
    const messages = database.collection('messages');
    const query = { sender:sender,receiver:receiver,message:message};
    user = await messages.insertOne(query);
    userList = await messages.find({$or:[{sender:receiver,receiver:sender},{sender:sender,receiver:receiver}]}).toArray(); 
    // const usersArray = userList.map(user => user.userName);
    return userList;
  }
  catch(e){
    console.log(e)
    return [];
  }

  // return user;
}

async function searchUsers(search){
  await client.connect();
  try{
    const database = client.db('chat');
    const users = database.collection('users');
    userList = await users.find({ userName: { $regex: new RegExp("^" + search) } }).toArray();
    const usersArray = userList.map(user => user.userName);
    return usersArray;

  }
  catch(e){
    console.log(e)
    return [];
  }

}