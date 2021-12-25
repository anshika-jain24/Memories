import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';

export const getPosts = async (req, res) =>{
    try {
        const postMessages= await PostMessage.find();

        console.log(postMessages[0].title);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message : error.message});
    }
}

export const createPost= async (req, res) => {
    const post= req.body;

    const newPost= new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404) .send("No post with that id");

    const updatePost= await PostMessage.findByIdAndUpdate(_id, {...post, _id} , {new: true});

    res.json(updatePost);

}

export const deletePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404) .send("No post with that id");

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully'});
}

export const likePost = async (req, res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({message: "User not authenticated"});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404) .send("No post with that id");

    const post = await PostMessage.findById(id);

    //Each like has an id from a specific person, so we have to check that if any like has id of that user
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        //like the post
        post.likes.push(req.userId);
    }
    else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
        //dislike the post
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post , { new: true } );

    console.log("Post liked");
    res.json(updatedPost);
}
