import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Post from '../models/Post.js';
import fullTextSearch from 'fullTextSearch';


const forumRouter = express.Router();


forumRouter.get('/', expressAsyncHandler(async (req, res)=>{
    // const posts = await Post.find({}).sort({createdAt: -1});
    const posts = await Post.find({}).sort({title: 1});
    //console.log(posts);
    if(posts.length>0){
        res.send(posts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
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
                res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
            }
        }else if(req.params.sorting==="-1"){
            const sortedPosts = await Post.find({}).sort({createdAt: -1});
            //console.log(posts);
            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
            }
        }else if(req.params.sorting===""){
            const sortedPosts = await Post.find({}).sort({name: 1});
            //console.log(posts);
            if(sortedPosts.length>0){
                res.send(sortedPosts);
            }else{
                res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
            }
        }
    }else if(req.params.category=="none"){
        const sortedPosts = await Post.find({category: req.params.category}).sort({createdAt: 1});
        //console.log(posts);
        if(sortedPosts.length>0){
            res.send(sortedPosts);
        }else{
            res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
        }
    }
    
}));

forumRouter.get('/filter/:category/sort/:time', expressAsyncHandler(async (req, res)=>{
    const filteredPosts = await Post.find({category: req.params.category}).sort({createdAt: parseInt(req.params.time)});
    //console.log(posts);
    if(filteredPosts.length>0){
        res.send(filteredPosts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
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

    const searchedPosts = await Post.find({$or: [
        {title: {$regex: (searchedKey2)}},
        {title: {$regex: (searchedKey2.toUpperCase())}},
        {title: {$regex: (searchedKey2.charAt(0).toUpperCase() + searchedKey2.slice(1))}},
        {title: {$regex: (splitStr.join(' '))}},
        // {content: {$regex: (searchedKey2)}},
        // {content: {$regex: (searchedKey2.toUpperCase())}},
        // {content: {$regex: (searchedKey2.charAt(0).toUpperCase() + req.params.key.slice(1))}},
        // {content: {$regex: (splitStr.join(' '))}},
        {keywords: {$regex: (searchedKey2)}}, 
        {keywords: {$regex: (searchedKey2.toLowerCase())}}, 

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
    ]});
    if(searchedPosts.length>0){
        res.send(searchedPosts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
    }
}));

forumRouter.get('/post/category/:id', expressAsyncHandler(async (req, res)=>{
    const postsByCat = await Post.find({category: mongoose.Types.ObjectId(req.params.id)});
    //console.log(posts);
    if(postsByCat){
        res.send(postsByCat);
    }else{
        res.status(404).send({message: "404 KHÔNG CÓ BÀI ĐĂNG NÀO"});
    }
}));

forumRouter.get('/post/:id', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.id);
    //console.log(posts);
    if(post){
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
    });
}));

forumRouter.put('/edit_post', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.body.postId);
    //console.log(post);
    if(post){
        post.title = req.body.title;
        post.description = post.description;
        post.content = req.body.content;

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
            message: "404 KHÔNG CÓ BÀI ĐĂNG NÀO"
        });
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
    //console.log("weffffffffffffffff");
    const post = await Post.findById(req.params.id);
    
    if(post){
        console.log(req.body.keywordContent);
        if(req.body.keywordContent.includes(',')){
            var array = string.split(',');
            keyray = post.keywords;
            console.log(keyray);
            post.keywords = keyray.concat(array);
            console.log(post.keywords);
        }else{
            post.keywords.push(req.body.keywordContent);
        }
        
        
        await post.save();
        res.send({message: "Đã thêm keyword"});
    }else{
        res.status(404).send("404");
    }
}));

forumRouter.put('/keyword/remove/:id/keyword/:keyword', expressAsyncHandler(async(req, res)=>{ //if keyword is a link then this is fucked lol
    //console.log("sfweff");
    const post = await Post.findById(req.params.id);
    if(post){
        const theKeyWord = post.keywords.filter(word => word === req.params.keyword);
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

export default forumRouter;