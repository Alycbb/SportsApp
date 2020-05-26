const express = require('express');
const router = express.Router();

const {PhysicalDataTem} = require("../models/physicaldata_Tem");
const {pdTemDetails} = require("../models/physicaldata_TemDetails");
const {physicalData} = require("../models/physicaldata");

var async = require("async");

const mongoose = require("../db/db");


// create physical data template
router.post("/template/create",(req,res) =>{
    console.log(req.body);
    const pdTemData = {
        TemplateName: req.body.templateName,
    }
    //new data for model "physicalDataTemplate"
    const pdTem = new PhysicalDataTem(pdTemData);
    pdTem.save().then((pdTem) =>{
        const pdTemDetailsData = {
            TemplateName: pdTem.TemplateName,
            field1: req.body.field1,
            field2: req.body.field2,
            field3: req.body.field3,
            field4: req.body.field4,
            field5: req.body.field5,
            field6: req.body.field6,
        }
        // new data for model "physicalDataTemplateDetails"
        const pdTemDetail = new pdTemDetails(pdTemDetailsData);
        pdTemDetail.save(function (err) {
            if (err) return handleError(err);
          });
        res.send(pdTemDetail);
    }).catch((err) =>{
        res.status(400).send(err);
    });
    console.log(mongoose.connection.readyState);
});

//get all the template
router.get("/template/view",(req,res) =>{
    
    PhysicalDataTem.find({}).populate('TemplateDetails').exec(function(error, data) {
        res.json(data)
    });
});

//get physical data template by template name
router.post("/template/displaychosenTem",(req,res) =>{
    
    PhysicalDataTem.find({TemplateName: req.body}).populate('TemplateDetails').exec(function(error, data) {
        res.json(data)
    });
});


//update the physical data template
router.post("/template/update",(req,res) =>{
    const update = {
        TemplateName: req.body.newTemplateName,
        field1: req.body.newField1,
        field2: req.body.newField2,
        field3: req.body.newField3,
        field4: req.body.newField4,
        field5: req.body.newField5,
        field6: req.body.newField6,
    }
    // update model "physicalDataTemplate"
    PhysicalDataTem.findOneAndUpdate({'TemplateName': req.body.oldTemplateName}, {'TemplateName': req.body.newTemplateName}).exec(function(err, data) {
        if (err){
            console.log("wrong");
        } 
        //update model "physicalDataTemplateDetails"
        pdTemDetails.findOneAndUpdate({'TemplateName': req.body.oldTemplateName},update, {new: true}, function(err,obj){
            if(err) {
                console.log("Something wrong when updating data!");
            }
            res.json(obj);
        })
    })
});

//delete physical data template
router.post("/template/delete", (req,res) =>{
    console.log(req.body);
    // update model "physicalDataTemplate"
    PhysicalDataTem.findOneAndDelete({'TemplateName': req.body}, function(err,one){
        if (err){
            console.log("wrong");
        } 
        // update model "physicalDataTemplateDetails"
        pdTemDetails.findOneAndDelete({'TemplateName': req.body}, function(err,qq){
            if(err){
                console.log("wrong");
            } 
            res.status(200).send("delete successfully");

        });
    })
});

//create physical data by template
router.post("/data/create",(req,res) =>{
    console.log(req.body);

    //get template details by templateName in model "physicalDataTemplateDetails"
    pdTemDetails.findOne({'TemplateName': req.body.templateName}).exec(function(error, temDetails){
        tems = {
            [temDetails.field1]: req.body.data1,
            [temDetails.field2]: req.body.data2,
            [temDetails.field3]: req.body.data3,
            [temDetails.field4]: req.body.data4,
            [temDetails.field5]: req.body.data5,
            [temDetails.field6]: req.body.data6,
        }

        console.log(tems);

        //create date as today
        now = new Date();

        //get template details and specific data input as part of new data for model "physicalData"
        const dataData = {
            userName: req.body.username,
            TemplateName: req.body.templateName,
            dataDetails: tems
        }

        //new data for model "physicalData"
        const data = new physicalData(dataData);
        data.save().then((data) =>{
                res.send(data);
            }).catch((err) =>{
                res.status(400).send(err);
            });
        console.log(mongoose.connection.readyState);
    })  
});

//update the physical data 
router.post("/data/update",(req,res) =>{
    console.log(req.body.newDataDetails)
    const leng = (req.body.newDataDetails).length;
    console.log(leng)

    //sperate newDataDetails as key and value
    //then update to model "physicalData"
    aaa = [];
    req.body.newDataDetails.map((value) =>{
        console.log(value)
        Object.entries(value).map(([key, val]) =>{
            console.log(key);
            aaa.push(key)
        })
    });
    console.log(aaa)

    bbb = [];
    req.body.newDataDetails.map((value) =>{
        console.log(value)
        Object.entries(value).map(([key, val]) =>{
            console.log(val);
            bbb.push(val)
        })
    });
    console.log(bbb)

    aaa.map((val) =>{
        bbb
    })

    //check the field Number
    if(leng === 3){
        handledNewData = {
            [aaa[0]]: bbb[0],
            [aaa[1]]: bbb[1],
            [aaa[2]]: bbb[2],  
        }
    }else if(leng === 4){
        handledNewData = {
            [aaa[0]]: bbb[0],
            [aaa[1]]: bbb[1],
            [aaa[2]]: bbb[2],
            [aaa[3]]: bbb[3],
        }
    }else if(leng === 5){
        handledNewData = {
            [aaa[0]]: bbb[0],
            [aaa[1]]: bbb[1],
            [aaa[2]]: bbb[2],
            [aaa[3]]: bbb[3],
            [aaa[4]]: bbb[4],
   
        }
    }else if(leng === 6){
        handledNewData = {
            [aaa[0]]: bbb[0],
            [aaa[1]]: bbb[1],
            [aaa[2]]: bbb[2],
            [aaa[3]]: bbb[3],
            [aaa[4]]: bbb[4],
            [aaa[5]]: bbb[5],
    
        }
    }
    

    const update = {
        dataDetails: handledNewData,
        date: req.body.newDate
    }
    
    //update data in model "physicalData"
    physicalData.findByIdAndUpdate(req.body.TemID, update, {new: true}, function(err,obj){
        if(err) {
            console.log("Something wrong when updating data!");
        }
        res.json(obj);
    })
});

//get all the physical data
router.get("/view",(req,res) =>{
    physicalData.find({}).exec(function(error, data) {
        res.json(data)
    });
});


//get physical data by userName and TemplateName
router.post("/data/getByUserNameAndTemName",(req,res) =>{    
    physicalData.find({'userName': req.body.username, 'TemplateName': req.body.templatename}, null, {sort: {'date': 1}}).exec(function(error, data) {
        res.json(data)
    });
});

//get physical data by userName
router.post("/data/getByUserName", (req,res) =>{
    console.log(req.body);
    physicalData.find({'userName': req.body }, null, {sort: {'date': -1}}, function(err,pds){
        if (err){
            console.log("wrong");
        } 
        res.json(pds)
    })
});

//delete physical data
router.post("/data/delete", (req,res) =>{
    console.log(req.body);
    physicalData.findOneAndDelete({'TemplateName': req.body.tem, 'userName': req.body.user }, function(err,one){
        if (err){
            console.log("wrong");
        } 
        res.status(200).send("delete successfully");
    })
});

//get physical data(lists) from two different users
router.post("/data/getTwoUserData",(req,res) =>{
    console.log(req.body);

    //find two users' physical data record in model "physicalData"
    var results = [];
    var tasks = [
        function(callback){
            physicalData.find({'userName': req.body.user1, 'TemplateName': req.body.templatename}, null, {sort: {'date': 1}},function(err, obj){
                if(err) {
                    console.log("Something wrong when getting comapred data!");
                }
                results.push(obj);
                callback();
            });
        },

        function(callback){
            physicalData.find({'userName': req.body.user2, 'TemplateName': req.body.templatename}, null, {sort: {'date': 1}},function(err, obj){
                if(err) {
                    console.log("Something wrong when geting compared data!");
                }
                results.push(obj);
                callback();
            });
        }

    ];
    async.parallel(tasks, function(err) { 
            if (err){ return next(err); }
            res.json(results);
        });
});

//get specific physical data by data ID
router.post("/data/getTwoComparedData",(req,res) =>{
    console.log(req.body);

    //get two specifc physical data in model "physicalData"
    var results = [];
    var tasks = [
        function(callback){
            physicalData.findById(req.body.ID1,function(err, obj){
                if(err) {
                    console.log("Something wrong when getting comapred data!");
                }
                results.push(obj);
                callback();
            });
        },

        function(callback){
            physicalData.findById(req.body.ID2,function(err, obj){
                if(err) {
                    console.log("Something wrong when geting compared data!");
                }
                results.push(obj);
                callback();
            });
        }
    ];
    async.parallel(tasks, function(err) { 
            if (err){ return next(err); }
            res.json(results);
        });  
});




module.exports = router;