const mongoose = require("mongoose");
const moment = require('moment');


const PhysicalData = new mongoose.Schema({
    userName:{
        type: String,
        // required:true
    },

    date:{
        type: String,
        default: () => moment().format("MM/DD/YYYY")
        // type: Date,
        // default: Date.now
    },

    TemplateName:{
        type: String
    },

    dataDetails: {
        type: Object
    }

});

// PhysicalData.pre('save', function(next){
//     // var now = new Date();
//     var now = moment();
//     // console.log(now.toDateString());    
//     console.log(now.format('MM/DD/YYYY'));
//     this.date = now;
//     next();
// });

const physicalData = mongoose.model('physicalData', PhysicalData);
module.exports = {physicalData}; 