const mongoose = require("mongoose");
const {QuesDetails} = require("./ques_details");
const {User} = require("../models/user");
const {Team} = require("../models/team");


const Question_Schema = new mongoose.Schema({

    quesTemplate:{
        type:String,
    },
    
    Question:{
        type: String,
    },

    type:{
        type: String,
        trim: true,
        required: true,
    },

    details:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'quesDetails'
    },

    // user:{
    //     type: [String],
    // },

    team:{
        type: String,
    }


});



const Question = mongoose.model('question', Question_Schema);
module.exports = {Question}; 