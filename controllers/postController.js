const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
    try{
        //fetch data from body
        const {title, body} = req.body;
        const post = new Post({
            title,body
        })
        const savedPost = await post.save();

        res.json({
            post:savedPost
        })
    }
    catch(err){
        return res.status(400).json({
            error:"Error while creating post"
        })
    }
}

exports.getAllPosts = async (req,res) => {
    try{
        const post = await Post.find().populate("likes").populate("comments").exec();

        res.json({
            post,
        })
    }
    catch(err){
        return res.status(400).json({
            error:"Error while getting all post"
        })
    }
}