const express = require('express');
const morgan = require('morgan')
const app= express();
app.use(morgan('dev'))
const postRoutes = require('./routes/posts')
app.use('/',postRoutes)
const port = 5000;
app.listen(port,()=>{
    console.log(`the  server is running on port ${port}`)
})