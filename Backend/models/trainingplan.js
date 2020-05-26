const mongoose = require("mongoose");

const Training = new mongoose.Schema({

    team:{
        type: String
    },

    user:{
        type: String
    },

    Details: {
        type: String,
    },

    
});



const TrainingPlan = mongoose.model('Training', Training);
module.exports = {TrainingPlan}; 