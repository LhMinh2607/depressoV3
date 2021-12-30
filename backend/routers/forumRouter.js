import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Post from '../models/Post.js';


const forumRouter = express.Router();


forumRouter.get('/', expressAsyncHandler(async (req, res)=>{
    const posts = await Post.find({}).sort({createdAt: -1});
    //console.log(posts);
    if(posts.length>0){
        res.send(posts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
    }
}));

forumRouter.get('/sort/filter/:category', expressAsyncHandler(async (req, res)=>{
    //console.log(req.params.category);
    if(req.params.category==="none"){
        const sortedPosts = await Post.find({}).sort({createdAt: 1});
        //console.log(posts);
        if(sortedPosts.length>0){
            res.send(sortedPosts);
        }else{
            res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
        }
    }else if(req.params.category!=="none"){
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
    
    const searchedPosts = await Post.find({$or: [
        {title: {$regex: req.params.key}},
        {title: {$regex: req.params.key.toUpperCase()}},
        {title: {$regex: req.params.key.charAt(0).toUpperCase() + req.params.key.slice(1)}},
        {title: {$regex: splitStr.join(' ')}},
        {content: {$regex: req.params.key}},
        {content: {$regex: req.params.key.toUpperCase()}},
        {content: {$regex: req.params.key.charAt(0).toUpperCase() + req.params.key.slice(1)}},
        {content: {$regex: splitStr.join(' ')}},
        {keywords: {$regex: req.params.key}}, 
        {keywords: {$regex: req.params.key.toLowerCase()}}, 
    ]});
    if(searchedPosts.length>0){
        res.send(searchedPosts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
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


forumRouter.get('/keyword/add/:id', expressAsyncHandler(async(req, res)=>{
    const post = await Post.findById(req.params.id);
    if(drink){
        //console.log(user);
        post.keywords.push(req.body.keywordContent);
        
        await post.save();
        res.send({message: "Đã thêm keyword"});
    }else{
        res.status(404).send("404");
    }
}));

forumRouter.put('/keyword/remove/:id', expressAsyncHandler(async(req, res)=>{
    const post = await Post.findById(req.params.id);
    if(post){
        post.keywords.splice(post.keywords.indexOf(req.body.keywordContent), 1);
        
        await post.save();
        res.send({message: "Đã xóa keyword"});
    }else{
        res.status(404).send("404");
    }
}));

export default forumRouter;