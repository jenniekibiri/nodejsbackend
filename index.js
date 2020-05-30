const express = require('express');
const app= express();

const {getPosts}=require('./routes/posts')
app.get('/',getPosts)
const port = 8080;
app.listen(port,()=>{
    console.log(`the  server is running on port ${port}`)
})