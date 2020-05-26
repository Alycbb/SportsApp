const mongoose = require("mongoose");

const physicalDataTemDetails_Schema = new mongoose.Schema({

    TemplateName:{
        type: String
    },

    field1:{
        type: String
    },

    field2:{
        type: String
    },
    
    field3:{
        type: String
    },

    field4:{
        type: String
    },

    field5:{
        type: String
    },

    field6:{
        type: String
    },

    field7:{
        type: String
    },

    field8:{
        type: String
    },
});



const pdTemDetails = mongoose.model('pdTemDetail', physicalDataTemDetails_Schema);
module.exports = {pdTemDetails}; 