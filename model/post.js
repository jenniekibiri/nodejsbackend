const mongoose = require('mongoose')
 const postSchema = new mongoose.Schema({
     title:{
type:String,
required:true

     },
     body:{
type:String,
required:true
     },
     photo:{
data:Buffer,
contentType:String
     },
     postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'Users'  
     },
     created:{
          type:Date,
          default:Date.now

     }
 })
 module.exports = mongoose.model('Posts',postSchema)
