const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
const expressValidator= require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser= require('cookie-parser')


mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,  useUnifiedTopology: true } ).then(()=>console.log('database connected'))
.catch((err)=>console.log(`error ${err}`))
const app= express();
app.use(expressValidator())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
const postRoutes = require('./routes/posts')
app.use('/',postRoutes)
app.use('/posts',postRoutes)
app.use('/signup',postRoutes)
app.use('/allposts',postRoutes)
app.use('/deletepost',postRoutes)
app.use('/updatepost',postRoutes)
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`the  server is running on port ${port}`)
})