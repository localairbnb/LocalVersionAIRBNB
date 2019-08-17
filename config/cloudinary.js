const cloudinary=require('cloudinary')
const secret=require('../secretfile')

cloudinary.config({
    cloud_name:secret.cloud_name,
    api_key:secret.api_key,
    api_secret:secret.api_secret
})


