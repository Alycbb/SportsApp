const mongoose = require("mongoose");
const {QuesDetails} = require("./ques_details");
const {User} = require("../models/user");
const {Team} = require("../models/team");


const Questionnaire_Schema = new mongoose.Schema({

    questionnaireName:{
        type:String,
    },


});



const Questionnaire = mongoose.model('questionnaire', Questionnaire_Schema);
module.exports = {Questionnaire}; 