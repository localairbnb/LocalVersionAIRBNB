const config=require('../config/clientConfig')
const  db= config.mydb
const auth=config.auth




const User = {
    /**
     * Create A User
     * @param {object} req 
     * @param {object} res
  
     */
    async signup(req, res) {
        var email=req.body.email;
        var password=req.body.password;
        var contact=req.body.contact
        var username=req.body.username
        var gender=req.body.gender
        auth.createUserWithEmailAndPassword(email,password).then(credentials =>{
               return  db.collection("users").doc(credentials.user.uid).set({
                    username:username,
                    contact:contact,
                    gender:gender

                });
            }).then(()=>{
                var user = auth.currentUser;
                if(!user.emailVerified){
                    user.sendEmailVerification().then(function() {
                       return res.status(200).json("Sucessfully registered. Click on the email verification sent to your email to verify your account")
                      }).catch(function(error) {
                        // An error happened.
                      });
                }
            }).catch((err)=>{
                return res.status(404).json("An error occured on the server and couldnt register user because "+err.message)
            })
       
      
     

    },
    async login(req,res){
        var email=req.body.email;
        var password=req.body.password;
        auth.signInWithEmailAndPassword(email, password).then(credentials=>{
            if(!credentials.user.emailVerified){
                return res.send(404).json("Your account is not verified yet. Click on email verification code sent to your email")
            }
            else{
                res.status(200).json(credentials.user)
            }
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
            if (errorCode === 'auth/wrong-password') {
                return res.status(404).json("Wrong password")
              }
               else if(errorCode === 'auth/user-not-found') {
                return res.status(404).json("Wrong user email or password")
               
              }
              else{
                return res.status(404).json("An error occured on the server and couldnt log in  user because "+errorMessage) 
              }
          });

    },
    async resetpassword(req,res){
        var email=req.body.email;
        auth.sendPasswordResetEmail(email).then(function(){
            return res.status(200).json("An email has been sent to you to reset your password")
        }).catch(function(error){
            res.status(404).json("An error occured on the server. "+error.message)
        })
    },
    async updateProfile(req,res){
        var userid=req.user.uid
        var username=req.body.username
        var contact=req.body.contact
        let userRef = db.collection('users').doc(userid);
    userRef.update({username: username,contact:contact }).
    then(function(){
        res.status(200).json("You have successfully update your profile ")

    }).catch(function(err){
        res.status(400).json("An error occured and couldnt update your profile")
    })
    }

   
      

  


}

module.exports={
    User:User
}