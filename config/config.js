
var admin = require("firebase-admin");

var serviceAccount = require("./localairbnb-firebase-adminsdk-wm6r0-9800f50642.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://localairbnb.firebaseio.com"
});
const db = admin.firestore();
const auth=admin.auth();


module.exports={
db,
auth
}
