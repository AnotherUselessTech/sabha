const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const MongoClient = require('mongodb').MongoClient;
const dontlook = process.env.mongopwd ? process.env.mongopwd : 'blablabla';
const uri = `mongodb+srv://saitejavadlapatla:${dontlook}@sabha-0kofs.mongodb.net/test?retryWrites=true&w=majority`;


const createRoom = (roomName) => {
  const dbClient = new MongoClient(uri, { useNewUrlParser: true });
  dbClient.connect(err => {
    console.log("Error creating room: ");
    console.log(err);
    dbClient.db("sabha").createCollection(roomName);
    dbClient.close();
  })
}

const addChatToRoom = (msg) => {
  const dbClient = new MongoClient(uri, { useNewUrlParser: true });
  dbClient.connect(err => {
    console.log("Error adding chat to room: ");
    console.log(err);
    const compiledMessage = {
      user: msg.username,
      message: msg.message.text,
      time: msg.message.time
    };
    // compiledMessage[msg.username] = {messages: [msg.message]};
    dbClient.db("sabha").collection(msg.roomName).insertOne(compiledMessage);
    dbClient.close();
  })
}

const getAllChatsInRoom = (roomName, socketEmitter) => {
  let allMessagesInPromise;
  const dbClient = new MongoClient(uri, { useNewUrlParser: true });
  dbClient.connect(err => {
    console.log("Error fetching all chats in room: ");
    console.log(err);
    allMessagesInPromise = dbClient.db("sabha").collection(roomName).find().toArray();
    allMessagesInPromise.then(allMessages => {
      socketEmitter(allMessages);
      // dbClient.close();
    });
  });
}

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// io.on('connection', (socket) => {
//   console.log('bhambhola jambha');
// });
module.exports = {
  app, createRoom, addChatToRoom, getAllChatsInRoom
}
// module.exports = dbClient;
// app.listen(9000);