const mongoose = require("mongoose");
const {pdTemDetails} = require("../models/physicaldata_TemDetails");



const PhysicalDataTem_Schema = new mongoose.Schema({

    TemplateName:{
        type: String
    },

    // TemplateDetails:{
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref:'pdTemDetails'
    // },

},{toJSON: {virtuals: true}});

PhysicalDataTem_Schema.virtual('TemplateDetails', {
    ref: 'pdTemDetail',
    localField: 'TemplateName',
    foreignField: 'TemplateName',
    justOne: false
  });



const PhysicalDataTem = mongoose.model('physicalDataTem', PhysicalDataTem_Schema);
module.exports = {PhysicalDataTem}; 