const express = require("express");
const app = express();
const router = express.Router();
const Post = require('../models/Post')
const fs = require('fs');
var path = require('path');


router.get('/',async (req,res)=>{
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

router.get('/postAll',async (req,res)=>{
    var showPost = await Post.find();
    console.log("in postAll")
    res.render('postAll',{postObj:showPost})
})

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
  try{  
   var showPost = await Post.findById(req.params.id);
    console.log(showPost)
       if(showPost === null){
           res.send("ID DOES NOT MATCH HOW IS THAT EVEN POSSIBLE???");
       }else{
        res.render('postId',{postObj:showPost})
       }
    }catch{
        
    }
    
  // var postid=Post.findOne(req.params.id)
   //console.log(postid);
   /* Post.findById(req.params.id)
    .then(data=>{
         if(data === null){
        res.send("ID DOES NOT MATCH HOW IS THAT EVEN POSSIBLE???");
         }else{
            console.log("in res.id"+data);
              res.render('postId',{postObj:data})
        }
     })
    .catch(function(err){
      res.json({message:err})
     console.log(err);
     })  */  
})
router.delete('/:id',async function(req,res){
    console.log(req.params.id)
    console.log("in deleteeeee")
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/post');
})
module.exports = router;