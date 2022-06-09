// import express from 'express';
// import expressAsyncHandler from 'express-async-handler';
// import mongoose from 'mongoose';
// import Post from '../models/Post.js';
// import fullTextSearch from 'fullTextSearch';
const express =  require('express');
const expressAsyncHandler =  require('express-async-handler');
const mongoose =  require('mongoose');
const Post =  require('../models/Post.js');
const fullTextSearch =  require('fullTextSearch');
// const io = require('../server.js');
// let connections = [];

const forumRouter = express.Router();


forumRouter.get('/', expressAsyncHandler(async (req, res)=>{
    // const posts = await Post.find({}).sort({createdAt: -1});
    const posts = await Post.find({}).sort({title: 1});
    //console.log(posts);
    if(posts.length>0){
        res.send(posts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
    }
}));

forumRouter.get('/sort/:sorting/filter/:category', expressAsyncHandler(async (req, res)=>{
    //console.log(req.params.category);
    if(req.params.category==="none"){
        if(req.params.sorting==="1"){
            const sortedPosts = await Post.find({}).sort({createdAt: 1});
            //console.log(posts);
            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
            }
        }else if(req.params.sorting==="-1"){
            const sortedPosts = await Post.find({}).sort({createdAt: -1});
            //console.log(posts);
            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
            }
        }else if(req.params.sorting===""){
            const sortedPosts = await Post.find({}).sort({name: 1});
            //console.log(posts);
            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
            }
        }else if(req.params.sorting==="hot"){
            //roughly based on reddit's hot filter algorithm
            // var mapper = function() {
            //     function hot(upvotes,downvotes,createdAt){
            //         var score = upvotes - downvotes;
            //         var order = log10(Math.max(Math.abs(score), 1));
            //         var sign = score>0 ? 1 : score<0 ? -1 : 0;
            //         var seconds = epochSeconds(createdAt) - 1134028003;
            //         var product = order + sign * seconds / 45000;
            //         return Math.round(product*10000000)/10000000;
            //     }
            
            //    function log10(val){
            //       return Math.log(val) / Math.LN10;
            //    }
            
            //    function epochSeconds(d){
            //        return (d.getTime() - new Date(1970,1,1).getTime())/1000;
            //    }
            
            //    emit( hot(this.upvotes, this.downvotes, this.createdAt), this );
            
            // };
            let hot = (upvotes,downvotes,createdAt) => {
                var score = upvotes - downvotes;
                var order = log10(Math.max(Math.abs(score), 1));
                var sign = score>0 ? 1 : score<0 ? -1 : 0;
                var seconds = epochSeconds(createdAt) - 1134028003;
                var product = order + sign * seconds / 45000;
                return Math.round(product*10000000)/10000000;
            }
        
            function log10(val){
                return Math.log(val) / Math.LN10;
            }
            
            function epochSeconds(d){
                return (d.getTime() - new Date(1970,1,1).getTime())/1000;
            }
        
            var posts = await Post.find({}).sort({upvotes: -1});
            var hotPoints = posts.map((post)=>{
                post["hotness"] = hot(post.upvotes.length, post.downvotes.length, post.createdAt);
                // console.log(post.title);
                // console.log(post.hotness);
                return post;
            })
            // console.log(hotPoints);
            // var sortedPosts = hotPoints.sort((a, b)=>a.hotness > b.hotness ? 1 : a.hotness<b.hotness ? -1 : a.hotness === b.hotness && 0);
            // console.log(sortedPosts);
            var sortedPosts = hotPoints.sort((a, b)=>
                {
                    if(a.hotness > b.hotness){
                        return 1;
                    }else if(a.hotness<b.hotness){
                        return -1;
                    }else if(a.hotness===b.hotness){
                        return 0;
                    }
                }
            ).reverse();

            sortedPosts.map((post)=>
            {
                console.log("hotness: "+post.hotness+" score:"+(post.upvotes.length-post.downvotes.length).toString());
                console.log(" upvotes:"+(post.upvotes.length).toString()+" downvotes: "+(post.downvotes.length).toString());
            });

            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
            }
        }else if(req.params.sorting==="top"){
            //roughly based on reddit's hot filter algorithm
            var posts = await Post.find({}).sort({upvotes: -1});
            var topPoints = posts.map((post)=>{
                post["score"] = (post.upvotes.length - post.downvotes.length);
                // console.log(post.title);
                // console.log(post.hotness);
                return post;
            })
            // console.log(hotPoints);
            // var sortedPosts = hotPoints.sort((a, b)=>a.hotness > b.hotness ? 1 : a.hotness<b.hotness ? -1 : a.hotness === b.hotness && 0);
            // console.log(sortedPosts);
            var sortedPosts = topPoints.sort((a, b)=>
                {
                    if(a.score > b.score){
                        return 1;
                    }else if(a.score<b.score){
                        return -1;
                    }else if(a.score===b.score){
                        return 0;
                    }
                }
            ).reverse();

            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
            }
        }
    }else if(req.params.category!=="none"){
        if(req.params.sorting==="1"){
            const sortedPosts = await Post.find({category: req.params.category}).sort({createdAt: 1});
            //console.log(posts);
            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
            }
        }else if(req.params.sorting==="-1"){
            const sortedPosts = await Post.find({category: req.params.category}).sort({createdAt: -1});
            //console.log(posts);
            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
            }
        }else if(req.params.sorting===""){
            const sortedPosts = await Post.find({category: req.params.category}).sort({name: 1});
            //console.log(posts);
            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
            }
        }else if(req.params.sorting==="hot"){
            //roughly based on reddit's hot filter algorithm
            function hot(upvotes,downvotes,createdAt){
                var score = upvotes - downvotes;
                var order = log10(Math.max(Math.abs(score), 1));
                var sign = score>0 ? 1 : score<0 ? -1 : 0;
                var seconds = epochSeconds(createdAt) - 1134028003;
                var product = order + sign * seconds / 45000;
                return Math.round(product*10000000)/10000000;
            }
            function log10(val){
                return Math.log(val) / Math.LN10;
            }
            function epochSeconds(d){
                return (d.getTime() - new Date(1970,1,1).getTime())/1000;
            }
            var posts = await Post.find({category: req.params.category}).sort({upvotes: -1});
            var hotPoints = posts.map((post)=>{
                post["hotness"] = hot(post.upvotes.length, post.downvotes.length, post.createdAt);
                return post;
            })
            var sortedPosts = hotPoints.sort((a, b)=>
                {
                    if(a.hotness > b.hotness){
                        return 1;
                    }else if(a.hotness<b.hotness){
                        return -1;
                    }else if(a.hotness===b.hotness){
                        return 0;
                    }
                }
            ).reverse();

            sortedPosts.map((post)=>
            {
                console.log("hotness: "+post.hotness+" score:"+(post.upvotes.length-post.downvotes.length).toString());
                console.log(" upvotes:"+(post.upvotes.length).toString()+" downvotes: "+(post.downvotes.length).toString());
            });

            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
            }
        }else if(req.params.sorting==="top"){
            //roughly based on reddit's hot filter algorithm
            var posts = await Post.find({category: req.params.category}).sort({upvotes: -1});
            var topPoints = posts.map((post)=>{
                post["score"] = (post.upvotes.length - post.downvotes.length);
                return post;
            })
            var sortedPosts = topPoints.sort((a, b)=>
                {
                    if(a.score > b.score){
                        return 1;
                    }else if(a.score<b.score){
                        return -1;
                    }else if(a.score===b.score){
                        return 0;
                    }
                }
            ).reverse();

            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
            }
        }
    }
    
}));

forumRouter.get('/filter/:category/sort/:time', expressAsyncHandler(async (req, res)=>{
    const filteredPosts = await Post.find({category: req.params.category}).sort({createdAt: parseInt(req.params.time)});
    //console.log(posts);
    if(filteredPosts.length>0){
        res.send(filteredPosts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
    }
}));

forumRouter.get('/search/:key', expressAsyncHandler(async (req, res)=>{
    var splitStr = req.params.key.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }

    // var str = "cồn";
    // str = str.toLowerCase();
    // str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    // str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    // str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    // str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    // str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    // str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    // str = str.replace(/đ/g, 'd');

    
    var fullTextSearchVi = fullTextSearch.vi;

    const searchedKey = req.params.key
    const searchedKey2 = searchedKey
    // .replaceAll(' ', '%20');
    // console.log(searchedKey2);
    // console.log(fullTextSearchVi(searchedKey2));

    let searchedPosts = await Post.find({$or: [
        // {title: {$regex: (searchedKey2)}},
        // {title: {$regex: (searchedKey2.toUpperCase())}},
        // {title: {$regex: (searchedKey2.charAt(0).toUpperCase() + searchedKey2.slice(1))}},
        // {title: {$regex: (splitStr.join(' '))}},
        // {keywords: {$regex: (searchedKey2)}}, 
        // {keywords: {$regex: (searchedKey2.toLowerCase())}}, 
        // {content: {$regex: (searchedKey2)}},
        // {content: {$regex: (searchedKey2.toUpperCase())}},
        // {content: {$regex: (searchedKey2.charAt(0).toUpperCase() + req.params.key.slice(1))}},
        // {content: {$regex: (splitStr.join(' '))}},
        {$text: {$search: searchedKey2}},

        // {title: {$regex: fullTextSearchVi(searchedKey2)}},
        // {title: {$regex: fullTextSearchVi(searchedKey2.toUpperCase())}},
        // {title: {$regex: fullTextSearchVi(searchedKey2.charAt(0).toUpperCase() + searchedKey2.slice(1))}},
        // {title: {$regex: fullTextSearchVi(splitStr.join(' '))}},
        // {content: {$regex: fullTextSearchVi(searchedKey2)}},
        // {content: {$regex: fullTextSearchVi(searchedKey2.toUpperCase())}},
        // {content: {$regex: fullTextSearchVi(searchedKey2.charAt(0).toUpperCase() + req.params.key.slice(1))}},
        // {content: {$regex: fullTextSearchVi(splitStr.join(' '))}},
        // {keywords: {$regex: fullTextSearchVi(searchedKey2)}}, 
        // {keywords: {$regex: fullTextSearchVi(searchedKey2.toLowerCase())}}, 
    ]},
    { 
        score: { $meta: 'textScore'} 
    }).sort({score: { $meta: 'textScore'} }).limit(10);

    if(searchedPosts.length===0){
        searchedPosts = await Post.find({$or: [
            {title: {$regex: (searchedKey2)}},
            {title: {$regex: (searchedKey2.toUpperCase())}},
            {title: {$regex: (searchedKey2.charAt(0).toUpperCase() + searchedKey2.slice(1))}},
            {title: {$regex: (splitStr.join(' '))}},
            {keywords: {$regex: (searchedKey2)}}, 
            {keywords: {$regex: (searchedKey2.toLowerCase())}}, 
            {content: {$regex: (searchedKey2)}},
            {content: {$regex: (searchedKey2.toUpperCase())}},
            {content: {$regex: (searchedKey2.charAt(0).toUpperCase() + req.params.key.slice(1))}},
            {content: {$regex: (splitStr.join(' '))}},
    
            // {title: {$regex: fullTextSearchVi(searchedKey2)}},
            // {title: {$regex: fullTextSearchVi(searchedKey2.toUpperCase())}},
            // {title: {$regex: fullTextSearchVi(searchedKey2.charAt(0).toUpperCase() + searchedKey2.slice(1))}},
            // {title: {$regex: fullTextSearchVi(splitStr.join(' '))}},
            // {content: {$regex: fullTextSearchVi(searchedKey2)}},
            // {content: {$regex: fullTextSearchVi(searchedKey2.toUpperCase())}},
            // {content: {$regex: fullTextSearchVi(searchedKey2.charAt(0).toUpperCase() + req.params.key.slice(1))}},
            // {content: {$regex: fullTextSearchVi(splitStr.join(' '))}},
            // {keywords: {$regex: fullTextSearchVi(searchedKey2)}}, 
            // {keywords: {$regex: fullTextSearchVi(searchedKey2.toLowerCase())}}, 
        ]},).limit(10);
    }


    if(searchedPosts.length>0){
        res.send(searchedPosts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
    }
}));

forumRouter.get('/post/category/:id', expressAsyncHandler(async (req, res)=>{
    const postsByCat = await Post.find({category: mongoose.Types.ObjectId(req.params.id)}).sort({title: 1});;
    //console.log(posts);
    if(postsByCat){
        res.send(postsByCat);
    }else{
        res.status(404).send({message: "404 KHÔNG CÓ BÀI VIẾT NÀO"});
    }
}));

forumRouter.get('/post/:id', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.id);
    //console.log(posts);
    if(post){
        // var io = req.app.get('socketio');
        // let interval;
        // io.on("connection", (socket) => {
        // console.log("Post client connected");
        // if (interval) {
        //     clearInterval(interval);
        // }
        // interval = setInterval(() => {
        //     socket.emit('getLatestPostInfo', post);
        // }, 1000);
        //     socket.on("disconnect", () => {
        //         console.log("Client disconnected");
        //         clearInterval(interval);
        //     });
        // });
        // var io = req.app.get('sock');
        // io.on("connection", (socket) => {
        //     socket.on("addComment", ()=>{
        //         socket.emit("loadComments");
        //         console.log("addComment")
        //     })
        // });
        res.send(post);
    }else{
        res.status(404).send({message: "404 NOT FOUND"});
    }
}));

forumRouter.get('/post/:id/nested', expressAsyncHandler(async (req, res)=>{
    const posts = await Post.find({category: mongoose.Types.ObjectId(req.params.id)});
    if(posts){
        res.send(posts);
    }else{
        res.status(404).send({message: "404 NOT FOUND"});
    }
}));

forumRouter.get('/post/:id/related', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.id);
    const relatedPosts = await Post.find({keywords: {$in: post.keywords}, _id: {$nin: req.params.id}}).limit(4);
    
    if(relatedPosts){
        res.send(relatedPosts);
    }else{
        res.status(404).send({message: 'Không có bài viết liên quan'});
    }
}));

forumRouter.post('/create_post', expressAsyncHandler(async (req, res)=>{
    const post = new Post({
        user: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        category: req.body.category,
        thumbnail: req.body.thumbnail,
    });
    const newPost = await post.save();
    res.send({
        _id: newPost._id,
        user: newPost.userId,
        title: newPost. title,
        description: newPost.description,
        content: newPost.content,
        category: newPost.category,
        thumbnail: newPost.thumbnail,
        isPinned: false,
        isHomepage: false,
    });
}));

forumRouter.put('/edit_post', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.body.postId);
    //console.log(post);
    if(post){
        post.title = req.body.title;
        post.description = req.body.description;
        post.content = req.body.content;
        post.category = req.body.category;

        //console.log(post);
        const updatedPost =  await post.save();

        res.send({
            _id: updatedPost._id,
            user: updatedPost.userId,
            title: updatedPost. title,
            description: updatedPost.description,
            content: updatedPost.content,
            category: updatedPost.category,
            thumbnail: updatedPost.thumbnail,
        });
    }else{
        res.status(404).send({
            message: "404 KHÔNG CÓ BÀI VIẾT NÀO"
        });
    }
}));

forumRouter.put('/pin_to_home/:id', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.id);
    console.log(post);
    if(post){
        if(post.isHomepage===true){
            post.isHomepage = false;
        }else if (post.isHomepage===false){
            post.isHomepage = true;
        }

        console.log(post.isHomepage)
        
        const updatedPost =  await post.save();

        res.send({
            _id: updatedPost._id,
            user: updatedPost.userId,
            title: updatedPost. title,
            description: updatedPost.description,
            content: updatedPost.content,
            category: updatedPost.category,
            thumbnail: updatedPost.thumbnail,
            isHomepage: updatedPost.isHomepage,
            isPinned: updatedPost.isPinned,
        });
    }else{
        res.status(404).send({
            message: "404 KHÔNG CÓ BÀI VIẾT NÀO"
        });
    }
}));

forumRouter.put('/pin/:id', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.postId);
    //console.log(post);
    if(post){
        if(post.isPinned===true){
            post.isPinned = false;
        }else if (post.isPinned===false){
            post.isPinned = true;
        }
        
        const updatedPost =  await post.save();

        res.send({
            _id: updatedPost._id,
            user: updatedPost.userId,
            title: updatedPost. title,
            description: updatedPost.description,
            content: updatedPost.content,
            category: updatedPost.category,
            thumbnail: updatedPost.thumbnail,
            isHomepage: updatedPost.isHomepage,
            isPinned: updatedPost.isPinned,
        });
    }else{
        res.status(404).send({
            message: "404 KHÔNG CÓ BÀI VIẾT NÀO"
        });
    }
}));

forumRouter.get('/homepost', expressAsyncHandler(async (req, res)=>{
    // const posts = await Post.find({}).sort({createdAt: -1});
    const posts = await Post.find({isHomepage: true}).sort({title: 1});
    //console.log(posts);
    if(posts.length>0){
        res.send(posts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
    }
}));

// userPostStat
forumRouter.get('/postby/:id', expressAsyncHandler(async (req, res)=>{
    var posts = await Post.find({user: mongoose.Types.ObjectId(req.params.id)});
    //console.log(posts);
    if(posts){
        var userScore = 0;
        var ups = [];
        posts.map((post)=>{
            post.score = post.upvotes.length - post.downvotes.length;
            userScore += post.score;
            
        });
    }

    var allPosts = await Post.find({});
    allPosts.map((post)=>{
        post.upvotes.map((up)=>{
            if(up===req.params.id){
                ups.push(post._id);
            }
        })
    });
    // console.log(allPosts[0]);
    var upvotedPosts = allPosts.filter(a=>a.upvotes.includes(req.params.id)).slice(0, 10);
    // console.log(upvotedPosts[0]);
    // var noInteractedPosts = allPosts.filter(allPost=>a.map(a.map(!upvotedPosts.filter(post=>post.upvotes.map(up=>up===a)))));

    let hot = (upvotes,downvotes,createdAt) => {
        var score = upvotes - downvotes;
        var order = log10(Math.max(Math.abs(score), 1));
        var sign = score>0 ? 1 : score<0 ? -1 : 0;
        var seconds = epochSeconds(createdAt) - 1134028003;
        var product = order + sign * seconds / 45000;
        return Math.round(product*10000000)/10000000;
    }

    function log10(val){
        return Math.log(val) / Math.LN10;
    }
    
    function epochSeconds(d){
        return (d.getTime() - new Date(1970,1,1).getTime())/1000;
    }

    var posts = await Post.find({}).sort({upvotes: -1});
    var hotPoints = posts.map((post)=>{
        post["hotness"] = hot(post.upvotes.length, post.downvotes.length, post.createdAt);
        return post;
    })
    var sortedPosts = hotPoints.sort((a, b)=>
        {
            if(a.hotness > b.hotness){
                return 1;
            }else if(a.hotness<b.hotness){
                return -1;
            }else if(a.hotness===b.hotness){
                return 0;
            }
        }
    ).reverse().slice(0, 10);
    //user has no prior upvotes or downvotes to these popular posts.
    var noInteractedPosts = sortedPosts.filter(allPost => !allPost.upvotes.includes(req.params.id) && !allPost.downvotes.includes(req.params.id));
    // console.log(noInteractedPosts);

    var noInteractedArr = [];
    noInteractedPosts.map((post)=>{
        noInteractedArr.push(post._id + ">>>" + post.title + ">>>" + post.content);
    })

    var suggestedPosts = [];
    // var postPoints = [];
    upvotedPosts.map((post)=>{
        var string = post.title + ">>>"+post.content;
        var point = findClosestString(noInteractedArr, string);
        if(suggestedPosts.indexOf(point)===-1 && point.postContent){
            suggestedPosts.push(point);
        }
    });


    // console.log(suggestedPosts);
    function findClosestString(arr, inputvalue) {
        let postContent = "";
        let closestText = '';
        let floorDistance = 0.1;
        // console.log(arr);
        for (let i = 0; i < arr.length; i++) {
          let dist = distance(arr[i], inputvalue);
          if (dist > floorDistance) {
                floorDistance = dist;
                postContent = arr[i];
                // console.log(arr[i]);
          }
        }
        // console.log(closestOne);  
        return {postContent};
    }
    
    function distance(val1, val2) {
        let longer, shorter, longerlth, result;
    
        if (val1.length > val2.length) {
        longer = val1;
        shorter = val2;
        } else {
        longer = val2;
        shorter = val1;
        }
    
        longerlth = longer.length;
    
        result = ((longerlth - editDistance(longer, shorter)) / parseFloat(longerlth));
    
        return result;
    }
    
    function editDistance(val1, val2) {
        val1 = val1.toLowerCase();
        val2 = val2.toLowerCase();
    
        let costs = [];
    
        for(let i = 0; i <= val1.length; i++) {
        let lastVal = i;
        for(let j = 0; j <= val2.length; j++) {
            if (i === 0) {
            costs[j] = j;
            } else if (j > 0) {
            let newVal = costs[j - 1];
            if (val1.charAt(i - 1) !== val2.charAt(j - 1)) {
                newVal = Math.min(Math.min(newVal, lastVal), costs[j]) + 1;
            }
            costs[j - 1] = lastVal;
            lastVal = newVal;
            }
        }
        if (i > 0) { costs[val2.length] = lastVal }
        }
        
        // console.log(costs[val2.length]);
        return costs[val2.length];
    }
    

    
    var userForumStat = {};
    userForumStat = {posts, userScore, upvotedPosts, noInteractedPosts, suggestedPosts}
    if(userForumStat){
        res.send(userForumStat);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
    }
}));
forumRouter.get('/postStat', expressAsyncHandler(async (req, res)=>{
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
    //console.log(posts);
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
      ]).sort({count: -1});
    const postStat = {postStatByUserCount, commentStatByUserCount};
    if(postStat){
        res.send(postStat);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI VIẾT NÀO"});
    }
}));

forumRouter.put('/delete_post/:id', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findByIdAndDelete(req.params.id);
    res.send({
        message: "POST DELETED"
    });
}));

forumRouter.post('/post/:id/reply', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.id);

    post.postComments.push({
        commenter: req.body.userId,
        content: req.body.replyContent,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const updatedPost = await post.save();
    res.send({
        comments: updatedPost.comments,
    });
    // io.on("connection", (socket) => {
    //     socket.on("addComment", ()=>{
    //         socket.emit("loadComments");
    //     })
    // });
}));

forumRouter.put('/post/:id/edit_reply', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.id);

    post.postComments.update({_id: req.body.commentId}, {$set:
        {
            content: req.body.replyContent,
            updatedAt: new Date(),
        }}
    );

    const updatedPost = await post.save();
    res.send({
        comments: updatedPost.comments,
    });
}));

forumRouter.put('/post/:id/delete_reply', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.id);

    
    if(post){
        post.postComments.splice(post.postComments.indexOf({_id: req.body.commentId}), 1);

        const updatedPost = await post.save();
        res.send({
            comments: updatedPost.comments,
        });
    }else{
        res.status(404).send({message: "NO COMMENT FOUND"});
    }
    
}));


forumRouter.put('/keyword/add/:id', expressAsyncHandler(async(req, res)=>{
    //console.log(req.body.keywordContent);
    const post = await Post.findById(req.params.id);
    
    if(post){
        // console.log(req.body.keywordContent);
        if(req.body.keywordContent.includes(',')){
            var string = req.body.keywordContent;
            var array = string.split(',');
            console.log(array.length);
            for(var i=0;i<array.length;i++){
                post.keywords.push(array[i]);
                console.log(array[i]);
            }
        }else{
            post.keywords.push(req.body.keywordContent);
        }
        
        
        await post.save();
        res.send({message: "Đã thêm keyword"});
    }else{
        res.status(404).send("404");
    }
}));

forumRouter.put('/keyword/remove/:id', expressAsyncHandler(async(req, res)=>{ //if keyword is a link then this is fucked lol
    //console.log("sfweff");
    const post = await Post.findById(req.params.id);
    if(post){
        const theKeyWord = post.keywords.filter(word => word === req.body.keyword);
        //console.log(theKeyWord);
        const index = post.keywords.indexOf(theKeyWord);
        //console.log(index);
        //console.log(post.keywords);
        post.keywords.splice(index, 1);

        await post.save();
        res.send({message: "Đã xóa keyword"});
    }else{
        res.status(404).send("404");
    }
}));

forumRouter.put('/accumulatePost', expressAsyncHandler(async(req, res)=>{ //if keyword is a link then this is fucked lol
    //console.log("sfweff");
    const post = await Post.findById(req.body.postId);
    if(post){
        if(req.body.type && req.body.type==="upvote"){
            if(post.upvotes.indexOf(req.body.userId)===-1){
                const index = post.downvotes.indexOf(req.body.userId);
                post.downvotes.splice(index, 1)
                post.upvotes.push(req.body.userId)
            }else{
                res.send("Already exists");
            }
        }
        if(req.body.type && req.body.type==="downvote"){
            if(post.downvotes.indexOf(req.body.userId)===-1){
                const index = post.upvotes.indexOf(req.body.userId);
                post.upvotes.splice(index, 1)
                post.downvotes.push(req.body.userId)
            }else{
                res.send("Already exists");
            }
        }
        
        await post.save();
        res.send({message: "Accumulated", upvotes: post.upvotes, downvotes: post.downvotes});
    }else{
        res.status(404).send("404");
    }
}));

module.exports = forumRouter;