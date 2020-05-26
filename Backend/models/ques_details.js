const mongoose = require("mongoose");
const {Questionnaire} = require("./questionnaire");

const QuesOption_Schema = new mongoose.Schema({

    quesTemplate:{
        type:String,
    },
    
    Question:{
        type: String,
    },

    type:{
        type: String,
        
    },

    Number:{
        type: String,
    },

    option1:{
        type: String,

    },

    option2:{
        type: String,
    },

    option3:{
        type: String,
    },

    option4:{
        type: String,
    },

    option5:{
        type: String,
    },

    option6:{
        type: String,
    },

    option7:{
        type: String,
    },

    option8:{
        type: String,
    },

    Comment:{
        type: String,
    },

});



const QuesDetails = mongoose.model('quesDetails', QuesOption_Schema);
module.exports = {QuesDetails}; 