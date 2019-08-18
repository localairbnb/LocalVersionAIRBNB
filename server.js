const express = require('express')
const app = express()
const body_parser=require('body-parser')
const uuid=require('uuid/v1');
const port=8080;
const listing=require('./controller/controller');
const data=new listing();
const userAuthentication=require('./controller/userAuthentication');
const cloudinary=require('cloudinary');
require ('./config/cloudinary');
const upload=require('./config/multer');
const helper=require('./controller/helper')
const config=require('./config/clientConfig')
const  db= config.mydb
const auth=config.auth


app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.get('/getAllListings', function(req, res) {
    
    res.json(data.getAllListings())

    
})




app.post('/register',userAuthentication.User.signup);
app.post('/resetpassword',userAuthentication.User.resetpassword);
app.post('/login',userAuthentication.User.login);
app.post('/updateProfile',userAuthentication.User.updateProfile);
app.post('/setProfileImage',helper.checkifuserisloggedin,upload.single('image'), async(req,res)=>{
    const result= await cloudinary.v2.uploader.upload(req.file.path)
    var image=result.secure_url
    let profilepic=image;
    var id=req.user.uid
    let userRef = db.collection('users').doc(id);
    userRef.update({photourl: profilepic}).then(function(){
        res.status(200).json("You have successfully update your profile picture")

    }).catch(function(err){
        res.status(400).json("An error occured and couldnt upload photo")
    })
    

    
    
    })




app.post('/addlisting', function(req, res) {
    var email,desc,phone,price;
    var images=[];
    email=req.body.email;
    desc=req.body.description;
    phone=req.body.phone;
    price=req.body.price;
    images=req.body.images
    const message=data.addlisting(desc,email,phone,price,images)
    res.json({note:message})
    

})

app.post('/updateListing', function(req, res) {
    var email,desc,phone,price;
    var images=[];
    email=req.body.email;
    desc=req.body.description;
    phone=req.body.phone;
    price=req.body.price;
    images=req.body.images

    const message=data.UpdateListing(desc,email,phone,price,images)
    res.json({note:message})

})

app.post('/deleteListing', function(req, res) {
    var email=req.body.email;
    const message=data.DeleteListing(email);
    res.json({note:message})

})

app.listen(port, () => console.log(`AirBnB app listening on port ${port}!`))