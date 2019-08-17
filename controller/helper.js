const express=require('express')
const config=require('../config/clientConfig');
const auth=config.auth;


let checkifuserisloggedin=(req,res,next)=>{
    var user=auth.currentUser;
    if(user){
        req.user=user
        next()
    }
    else{
        return res.status(400).json("You do not have authorization for this task. Please Login first")
    }
}
module.exports={
    checkifuserisloggedin
}