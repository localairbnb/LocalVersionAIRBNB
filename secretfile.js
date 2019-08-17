const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    apiKey: process.env.apiKey ,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    api_key:process.env.API_KEY,
    cloud_name:process.env.CLOUD_NAME,
    api_secret:process.env.API_SECRET

};

