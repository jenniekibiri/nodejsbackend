const express = require('express');
const morgan = require('morgan')
const app= express();
app.use(morgan('dev'))
const {getPosts}=require('./routes/posts')
app.get('/',getPosts)
const port = 8080;
app.listen(port,()=>{
    console.log(`the  server is running on port ${port}`)
})