const express = require('express')
const app = express()
const body_parser=require('body-parser')
const uuid=require('uuid/v1');
const port=8080;
const listing=require('./controller/controller');
const data=new listing();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.get('/getAllListings', function(req, res) {
    
    res.json(data.getAllListings())

    
})
// this endpoint registers a node and broadcast
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))