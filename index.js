const express = require('express');
const app= express();
app.get('/home',(req,res)=>{
    res.send('this is a test route that definately working')
})
const port = 8080;
app.listen(port,()=>{
    console.log(`the  server is running on port ${port}`)
})