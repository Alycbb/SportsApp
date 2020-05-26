const express = require('express');
const router = express.Router();

const {TrainingPlan} = require("../models/trainingplan");
const authenticate = require("../middlewares/authenticate");
const mongoose = require("../db/db");

//create training plan 
router.post("/create",(req,res) =>{
    console.log(req.body);
    const trainingData = {
        user: req.body.userName,
        team: req.body.teamName,
        Details: req.body.details
    }
    const training = new TrainingPlan(trainingData);
    training.save().then((training) =>{
        res.send(training);
    }).catch((error) =>{
        res.status(400).send(error);
    });   
    console.log(mongoose.connection.readyState);
});

//get training plan by teamName
router.post("/getListByTeam", function(req, res){ 
    TrainingPlan.find({'team' : req.body}, 'team Details', function(err,list){
        if(!list){
            res.status(404).send('data not found');
        }else{
            res.json(list);
        }
    });  
});

//get training plan by userName
router.post("/getListByUser", function(req, res){ 
    TrainingPlan.find({'user' : req.body}, 'user Details', function(err,list){
        if(!list){
            res.status(404).send('data not found');
        }else{
            res.json(list);
        }
    });  
});

module.exports = router;