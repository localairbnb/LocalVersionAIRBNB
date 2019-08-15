const config=require('../config/config')
const  db= config.db;
const rp=require('request-promise');
// Get the `FieldValue` object
let FieldValue = require('firebase-admin').firestore.FieldValue;
class listingController{





 addlisting(desc,email,phone,price,images=[]){
    let docRef = db.collection('listings').doc(email);

    let setlisting = docRef.set({
      description: desc,
      email: email,
      phone:phone,
      price:price,
      images:images,
      dateAdded:FieldValue.serverTimestamp()
    });
    if(docRef){
        return "data added successfully"
    }
    else{
        return "failed"
    }
}

UpdateListing(desc,email,phone,price,images=[]){
 let docRef = db.collection('listings').doc(email).update({
      description: desc,
      email: email,
      phone:phone,
      price:price,
      images:images
    });
    if(docRef){
        return "record updated successfully"
    }
    else{
        return "failed"
    }
}

DeleteListing(email){
    let deleteDoc = db.collection('listings').doc(email).delete();
    if(deleteDoc){
        return "successfully deleted"
    }
    else{
        return failed;
    }
}
 getAllListings(){
     var all=[];
  db.collection('listings').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
        all.push(doc.data());
        
    });
    console.log(all)

  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
  
 
   

  
}










}
//console.log(db)

module.exports=listingController
