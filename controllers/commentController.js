//import model
const Post = require('../models/postModel' )
const Comment = require('../models/commentModel');

//business logic

exports.createComment = async (req, res) => {
    try{
        //fetch data from re body
        const {post, user, body} = req.body;

        //create a comment object
        const comment = new Comment({
            post,user, body
        });

        //save the new object into the database
        const savedComment = await comment.save();


        //find the post by ID, add the new comment in the comment array in post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id }}, {new: true}) 
                            .populate("comments") // populate the comments array with comments documents
                            .exec();


        res.json({
            post: updatedPost
        })
    }
    catch(err){
        return res.status(500).json({
            error: "error while creating comment"
        })
    }
}