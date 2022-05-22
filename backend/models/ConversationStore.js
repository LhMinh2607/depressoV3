import mongoose from 'mongoose';
const {Schema} = mongoose;
// import {MongoClient} from 'mongodb';
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// const url = 'mongodb://localhost:27017/mentalBotDB';
// const client = new MongoClient(url);

// await client.connect();
// const dbName = "mentalBotDB"
// console.log('Connected successfully to server (MongoDB Client)');
// var conversationStore = []
// async function run() {
//     try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("mentalBotDB").command({ ping: 1 });
//     console.log("Connected successfully to server");
//     const dbName = "mentalBotDB";
//     const mentalBotDB = client.db(dbName);
//     const users = mentalBotDB.collection('users');
//     conversationStore = mentalBotDB.collection('conversationStore');
//     console.log(users)
//     } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//     }
// }
// MongoClient.connect(url, function(err, db) {
    
//   if(err) { return console.dir(err); }

//   var collection = db.collection('conversationStore');

//   collection.find().toArray(function(err, items){});

//   console.log(conversationStore);
//   client.close();

// });

// const mentalBotDB = client.db(dbName);

// export default conversationStore

// const conversationStoreSchema = new mongoose.Schema({}, { strict: false });

// const ConversationStore = mongoose.model('conversationStore', conversationStoreSchema);
// mongoose.connect('mongodb://localhost/mentalBotDB').then(() => {
//     const db = mongoose.connection.db;
//     db.collection('conversationStore').find({$and: [{"events": {$elemMatch: {"text": "6258e2b0ee1e676f8626d4bd"}}}, {$or: [{"events": {$elemMatch: {"event": "bot"}}}, {"events": {$elemMatch: {"event": "user"}}}]}]}).projection(
//         {"events": {"text": 1}} ).toArray((err, result) => {
//         console.log(result)
//     });
// }).catch(err => console.log(err.message))


// export default ConversationStore;