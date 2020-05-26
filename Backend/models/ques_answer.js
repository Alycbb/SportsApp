const mongoose = require("mongoose");
const {Questionnaire} = require("../models/questionnaire");
const moment = require('moment');


const QuesAnswer_Schema = new mongoose.Schema({

    userName: {
        type: String,
    },

    quesTemplate: {
        type: String,
    },
    
    Question:{
        type: String,
    },

    type:{
        type: String,
        
    },

    Answer:{
        type: String,
    },

    Comment:{
        type: String,
    },

    date:{
        type: String,
        default: () => moment().format("MM/DD/YYYY")

    },



});



const QuesAnswers = mongoose.model('quesAnswer', QuesAnswer_Schema);
module.exports = {QuesAnswers}; 