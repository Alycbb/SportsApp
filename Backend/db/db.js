const mongoose = require("mongoose");

//connect database
const mongodb_url = "mongodb://localhost/SportsApp";
mongoose.connect(mongodb_url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => { 
    console.log(mongoose.connection.readyState);
    if(mongoose.connection.readyState === 1){
        console.log("database are connected")
    }else{
        console.log("database are disconnected")
    }
}).catch(err => 
    console.log(err)
);

module.exports = mongoose;


