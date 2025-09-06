const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("mongodb atlas connected successfully with taxi server");
    
}).catch(err=>{
    console.log("mongodb altas connection failed");
    console.log(err);
    
})