const express =  require('express');
const expressAsyncHandler =  require('express-async-handler');
const User =  require('../models/User.js');
const bcrypt =  require('bcryptjs');
const isAuth =  require('../utils.js');
const mongoose =  require('mongoose');
const Post = require('../models/Post.js')

// Statistic:
// Piechart percentages of
// Users by issue types, await from the chat bot's dataset update
// Users who used the chatbot X
// Users who updated their moods via the bot
// Users who post questions
// Users who reply
// Contributers who made outgoing calls X
// Users who received and accepted calls X 
// Bar chart
// Posts by date
// Chatbot by date
// Calls by date X
// Export Statistics

const adminRouter = express.Router();
adminRouter.get('/stat', expressAsyncHandler(async (req, res)=>{

    // mongoose.connect('mongodb://localhost/mentalBotDB').then(() => {
    //     const db = mongoose.connection.db;
    //     db.collection('conversationStore').find({$and: [{"events": {$elemMatch: {"text": req.params.id}}}, {$or: [{"events": {$elemMatch: {"event": "bot"}}}, {"events": {$elemMatch: {"event": "user"}}}]}]}, 
    //     {projection: {"events": {"text": 1, "event": 1, "timestamp": 1}}, }, ).toArray((err, result) => {
    //         // console.log(result)
    //         res.send(result);
    //     });
    // }).catch(err => console.log(err.message));

    //users who updated their mood via the bot
    const usersWhoUpdatedMood = await User.find({$match: {mood: {$ne: ""}}}, {_id: 1, mood: 1}).sort({updatedAt: -1})

    //users who post
    const postStatByUserCount = await Post.aggregate([
        {
          '$match': {}
        }, {
          '$group': {
            '_id': {
              'userId': '$user'
            }, 
            'user': {
              '$first': '$user'
            }, 
            'count': {
              '$sum': 1
            }
          }
        }
    ]).sort({count: -1});
    const users = await User.find({}).sort({createdAt: 1})

    //users who comment
    const commentStatByUserCount = await Post.aggregate([
        {
          '$match': {}
        }, {
          '$project': {
            '_id': 0, 
            'postComments': '$postComments'
          }
        }, {
          '$unwind': {
            'path': '$postComments', 
            'includeArrayIndex': 'postCommentCount', 
            'preserveNullAndEmptyArrays': false
          }
        }, {
          '$group': {
            '_id': '$postComments.commenter', 
            'commenter': {
              '$first': '$postComments.commenter'
            }, 
            'count': {
              '$sum': 1
            }
          }
        }
      ]).sort({count: -1}); //{_id, commenter, count}

      //Contributers who made outgoing calls
      //Users who received and accepted calls

      // Bar chart
    // Posts by date
    const postByDate = await Post.aggregate([
        {
          '$match': {}
        },
        {
            '$group': {
              '_id': {
                '$dateToString': {
                  'format': '%Y-%m-%d', 
                  'date': '$createdAt'
                },
              },
              'count': {
                '$sum': 1
              }
            }
        },
        {'$sort': {'_id': 1}},
      ])
    // postByDateCount = {}
    // postByDate.forEach(function (x) { postByDateCount[x] = (postByDateCount[x] || 0) + 1; });
    // console.log(postByDateCount)
    // Chatbot by date
    let chatbotByDate = []
    mongoose.connect('mongodb://localhost/mentalBotDB').then(() => {
        const db = mongoose.connection.db;
        db.collection('conversationStore').find({$and: [{"events": {$elemMatch: {"parse_data.intent.name": "show_id"}}} ,{"events": {$elemMatch: {"event": "user"}}}]}, 
        {projection: 
            {"events": {"text": 1, "event": 1, "timestamp": 1}}, 
            // {"events": 
            //     {$cond: {
            //         if: {$ne: ["$event", "user"]},
            //         then: "$$REMOVE",
            //         else: {"text": 1, "event": 1, "timestamp": 1}
            //         }
            //     }
            // }, 
        }, ).toArray((err, result) => {
            chatbotByDate = result
            var chatbotByDateArr = []
            // var chatByDateArr = []
            chatbotByDate = chatbotByDate.map(c=>
                {   
                    c.events.map((e)=>{
                        var date = new Date(parseInt(e.timestamp) * 1000)
                        var publishedDate = date.getDate();
                        var publishedMonth = date.getMonth()+1;
                        var publishedYear = date.getFullYear();
                        chatbotByDateArr.push(publishedDate+"/"+publishedMonth+"/"+publishedYear)
                        // return publishedDate+"/"+publishedMonth+"/"+publishedYear
                    })
                })
            // chatbotByDateArr.map((date)=>{
            //     if(chatByDateArr.indexOf(date)===-1){
            //         chatByDateArr.push(date);
            //     }
            // })
            const messageByDate = {};
            const sampleArray = ['a', 'a', 'b', 'c'];
            chatbotByDateArr.forEach(function (x) { messageByDate[x] = (messageByDate[x] || 0) + 1; });
            // console.log(messageByDate)
            // chatbotByDateArr.map((x) => { x.count = (x.count || 0) + 1; });
            var chatByDateArr = []
            Object.keys(messageByDate).map((key, index) => {
                chatByDateArr.push({date: key, count: messageByDate[key]});
            });
            
            const stat = {usersWhoUpdatedMood, postStatByUserCount, commentStatByUserCount, postByDate, chatByDateArr, users}
            res.send(stat);
        });
    }).catch(err => console.log(err.message));

    // Calls by date

    
    
    
}));


module.exports = adminRouter;