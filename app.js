const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const yaml = require('js-yaml')

const MongoClient = require('mongodb').MongoClient;
const dontlook = process.env.mongopwd ? process.env.mongopwd : 'blablabla';
console.log(dontlook);
const uri = `mongodb+srv://saitejavadlapatla:${dontlook}@sabha-0kofs.mongodb.net/test?retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri, { useNewUrlParser: true });

const createRoom = (roomName) => {
  dbClient.connect(err => {
    console.log(err);
    dbClient.db("sabha").createCollection(roomName);
    // dbClient.close();
  })
}

const addChatToRoom = (msg) => {
  dbClient.connect(err => {
    console.log(err);
    const compiledMessage = {
      user: msg.username,
      message: msg.message.text,
      time: msg.message.time
    };
    // compiledMessage[msg.username] = {messages: [msg.message]};
    dbClient.db("sabha").collection(msg.roomName).insertOne(compiledMessage);
    // dbClient.close();
  })
}

const getAllChatsInRoom = (roomName, socketEmitter) => {
  let allMessagesInPromise;
  dbClient.connect(err => {
    console.log(err);
    allMessagesInPromise = dbClient.db("sabha").collection(roomName).find().toArray();
    allMessagesInPromise.then(allMessages => {
      socketEmitter(allMessages);
    });
  });
}

// client.connect(err => {
//   const collection = client.db("whatthe").collection("devices");
//   // perform actions on the collection object
//   // console.log(collection);
//   const local = client.db("test");
  
//   local.collection('test1').insertOne({a:1}, (err, res) => {
//     console.log(err);
//   })

//   client.close();
// });

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('bhambhola jambha');
});
module.exports = {
  app, dbClient, createRoom, addChatToRoom, getAllChatsInRoom
}
// module.exports = dbClient;
// app.listen(9000);