var firebase = require("firebase/app");
var secret=require('../secretfile');
require("firebase/auth");
require("firebase/firestore");


var firebaseConfig = secret
  
firebase.initializeApp(firebaseConfig);

const auth=firebase.auth();
const mydb=firebase.firestore();

module.exports={
    auth,
    mydb
}