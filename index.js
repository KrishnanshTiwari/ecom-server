const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Define a simple route
app.get('/',(req,res)=>{
    res.send('Hello world!');
});

// Start the server
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
});