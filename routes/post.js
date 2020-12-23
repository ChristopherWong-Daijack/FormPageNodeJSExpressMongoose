const express = require("express");
const app = express();
const router = express.Router();
const Post = require('../models/Post')
const fs = require('fs');
var path = require('path');
 

router.get('/',async(req,res)=>{
    var showPost = await Post.find();
   res.render('form',{postObj:showPost})
  

 //Find function needs to be in a async function

  //res.json(showPost)
   /*try{
    const posts= await Post.find();
    res.json(posts)
    console.log(posts)
   }catch(err){
       res.json({message:err})
   }*/
});

/*router.post('/',async(req,res)=>{
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating
    });

   try{
       const savedPost= await post.save()
       res.redirect('/')
   }catch(err){
       res.json({message:err})
   }
})*/

router.post('/',(req,res)=>{
    
    const post = new Post({
        title: req.body.title,//These should match the ID when submmiting the form
        description: req.body.description,
        rating: req.body.rating
    });
    console.log(post)
    post.save()
    .then(data=>{
        console.log(data)
        res.redirect('/post')//res.redirect needs the complete route not just the router "/" So this would be "/post" NOT "/"
        console.log(req.body);
       // res.json(data)
    })
    .catch(err=>{
        res.json({message:err})
        console.log(err);
    })
    
})

router.get('/:id', async (req,res)=>{
    var showPost = await Post.findById(req.params.id);
       if(showPost === null){
           res.send("ID DOES NOT MATCH HOW IS THAT EVEN POSSIBLE???");
       }else{
        res.render('postId',{postObj:showPost})
       }

    
    console.log("Im here in /:id")
    console.log(req.params.id)
    
   
})

module.exports = router;