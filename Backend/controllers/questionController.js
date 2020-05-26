const express = require('express');
const router = express.Router();

const {Questionnaire} = require("../models/questionnaire");
const {Question} = require("../models/questions");
const {QuesDetails} = require("../models/ques_details");
const {QuesAnswers} = require("../models/ques_answer");
const {User} = require("../models/user");
const {Team} = require("../models/team");



const mongoose = require("../db/db");

var async = require("async");

mongoose.set('useFindAndModify', false);

//create Questionnare
router.post("/create/questionnaire",(req,res) =>{
    console.log(req.body);
    const questionnare = {
        questionnaireName: req.body.name
    }
    //new data for model "questionnaire"
    const newQuestionnaire = new Questionnaire(questionnare);
    newQuestionnaire.save().then(() =>{
        res.send(newQuestionnaire);
        
    }).catch((error) =>{
        res.status(400).send(error);
    });   
    console.log(mongoose.connection.readyState);
});

//get all Questionnaire
router.get("/display/questionnaire",(req,res) =>{
    console.log(req.body);
    Questionnaire.find({}, 'questionnaireName', function(err,questionnaire){
        if(!questionnaire){
            res.send('data not found');
        }else{
            res.json(questionnaire)
        }
    });  
});

//create questionnaire question
router.post("/create/question",(req,res) =>{
    console.log(req.body);
    const quesOption = {
        quesTemplate:req.body.quesTemplate,
        Question: req.body.Question,
        type: req.body.QuesType,
        Number: req.body.Number,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        option5: req.body.option5,
        option6: req.body.option6,
        option7: req.body.option7,
        option8: req.body.option8,
        Comment: req.body.Comment,
    }
    //create specific contents for Questions
    const quesDetails = new QuesDetails(quesOption);
    quesDetails.save().then(() =>{
        res.send(quesDetails);
        
        const questionType = {
            quesTemplate:req.body.quesTemplate,
            Question: req.body.Question,
            type: req.body.QuesType,
            details: quesDetails._id,
        }
        //create another collection for the order of questions
        const question = new Question(questionType);
        question.save(function (err) {
            if (err) return handleError(err);
          });
    }).catch((error) =>{
        res.status(400).send(error);
    });   
    console.log(mongoose.connection.readyState);
});

//create Question Answers
router.post("/create/questionAnswer",(req,res) =>{
    console.log(req.body);
    const quesAnswer = {
        quesTemplate:req.body.quesTemplate,
        userName: req.body.userName,
        Question: req.body.Question,
        type: req.body.QuesType,
        Answer: req.body.Answer,
        Comment: req.body.userComment
    }
    // new data for model "questionAnswer"
    const newAnswer = new QuesAnswers(quesAnswer);
    newAnswer.save().then(() =>{
        res.send(newAnswer);
        
    }).catch((error) =>{
        res.status(400).send(error);
    });   
    console.log(mongoose.connection.readyState);
});

//display Question Answers
router.post("/display/questionAnswer",(req,res) =>{
    console.log(req.body);
    QuesAnswers.find({'userName':req.body}, null, {sort: {'date': -1}}, function(err,answer){
        if(!answer){
            res.send('data not found');
        }else{
            res.json(answer)
        }
    });  
});


//Display all questions by Questionnare
//sort questions from new to old
router.post('/getQuestionsByQuestionnaire',function (req,res){
    Question.find({'quesTemplate': req.body}, null, {sort: {'_id': -1}}).populate('details','Number option1 option2 option3 option4 option5 option6 option7 option8').exec(function (err,data) {
        if(err){
            return next(err);
        }
        res.json(data);
    });
});

//sort questions from old to new
router.post('/sortQuestion/OldToNew',function (req,res){
    Question.find({'quesTemplate': req.body}, null, {sort: {'_id': 1}}).populate('details','Number option1 option2 option3 option4 option5 option6 option7 option8').exec(function (err,data) {
        if(err){
            return next(err);
        }
        res.json(data);
    });
});

//sort questions by type
router.post('/sortQuestionByType',function (req,res){
    Question.find({ 'quesTemplate': req.body}, 'Question type', {sort: {'type' : 1}}).populate('details','Number option1 option2 option3 option4 option5 option6 option7 option8').exec(function (err,data) {
        if(err){
            return next(err);
        }
        res.json(data);
    });
});


//delete questionnaire question
router.post("/delete", (req,res) =>{
    console.log(req.body);
    QuesDetails.findOneAndDelete({'Question': req.body}, function(err,one){
        if (err){
            console.log("wrong");
        } 
        Question.findOneAndDelete({'details': one._id }, function(err,qq){
            if(err){
                console.log("wrong");
            } 
            res.status(200).send("delete successfully");

        });
    })
});

//update question
router.post("/update",(req,res) =>{
    console.log(req.body);
    const Questype = req.body.Questype;
    console.log(Questype);
    console.log(req.body.Number)
    //check the option number and update to specific field
    //without "if", the empty field will be null
    if(req.body.Number === '8'){
        var update = {
            Question: req.body.Question,
            Number: req.body.Number,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            option5: req.body.option5,
            option6: req.body.option6,
            option7: req.body.option7,
            option8: req.body.option8,
        }
    }else if(req.body.Number === '7'){
        var update = {
            Question: req.body.Question,
            Number: req.body.Number,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            option5: req.body.option5,
            option6: req.body.option6,
            option7: req.body.option7,
        }
    }else if(req.body.Number === '6'){
        var update = {
            Question: req.body.Question,
            Number: req.body.Number,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            option5: req.body.option5,
            option6: req.body.option6,
        }
    }else if(req.body.Number === '5'){
        var update = {
            Question: req.body.Question,
            Number: req.body.Number,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            option5: req.body.option5,
        }
    }else if(req.body.Number === '4'){
        var update = {
            Question: req.body.Question,
            Number: req.body.Number,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
        }
    }else if(req.body.Number === '3'){
        var update = {
            Question: req.body.Question,
            Number: req.body.Number,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
        }
    }else if(req.body.Number === '2'){
        var update = {
            Question: req.body.Question,
            Number: req.body.Number,
            option1: req.body.option1,
            option2: req.body.option2,

        }
    }

    const updateText = {
        Question: req.body.Question,
    }

    //when update Text, update field "Question" only
    if(Questype === 'Text'){
        var results = {};
        var tasks = [
            function(callback){
                Question.findOneAndUpdate({'Question': req.body.OldQuestion}, updateText, { new: true },function(err, obj){
                    if(err) {
                        console.log("Something wrong when updating data!");
                    }
                    callback();
                });
            },
    
            function(callback){
                QuesDetails.findOneAndUpdate({'Question': req.body.OldQuestion}, updateText, { new: true },function(err, obj){
                    if(err) {
                        console.log("Something wrong when updating data!");
                    }
                    results = obj;
                    callback();
                });
            }
    
        ];
        
        async.parallel(tasks, function(err) { 
                if (err){ return next(err); }
                res.json(results);
            });

    //when update Radio Buttons and Check Boxes, update field "Question" "Number" and other "option" field
    }else{
        var results = {};
        var tasks = [
            function(callback){
                Question.updateOne({'Question': req.body.OldQuestion}, update, { new: true },function(err, abc){
                    if(err) {
                        console.log("Something wrong when updating data!");
                    }
                    callback();
                });
            },
    
            function(callback){
                QuesDetails.findOneAndUpdate({'Question': req.body.OldQuestion}, update, { new: true },function(err, obj){
                    if(err) {
                        console.log("Something wrong when updating data!");
                    }
                    results = obj;
                    callback();
                });
            }
    
        ];
        
        async.parallel(tasks, function(err) { 
                if (err){ return next(err); }
                res.json(results);
            });
    
    }
});

//assign questionnaire (all the questions inside) to user
router.post("/assignQuesToUser", function(req, res){ 
    User.findOneAndUpdate({'name' : req.body.userName}, {'personalQues': req.body.questionnaire}, { new: true }, function(err,assign){
        if(!assign){
            res.status(404).send('data not found');
        }else{
            res.json(assign);
        }
    });  
});

//Athlete pages: Display assigned Questions
router.post("/athlete/displayQuestion", function(req, res){ 
    User.findOne({'name':req.body}, 'name team status email personalQues', function(err,user){
        if(!user){
            res.send('data not found');
        }else{
            var results = {};
            var tasks = [
            function(callback){
                //get personal Questions
                QuesDetails.find({'quesTemplate': user.personalQues}, 'quesTemplate Number type Question option1 option2 option3 option4 option5 option6 option7 option8').exec(function (err,data) {
                    if(err){
                        return next(err);
                    }
                    console.log(data)
                    results.personal = data;
                    callback();
                });
            },
    
            function(callback){
                //get team  details in model "Team"
                Team.findOne({'TeamName': user.team[0]}).exec(function (err,team) {
                    if(err){
                        return next(err);
                    }
                    //get team Questions
                    QuesDetails.find({'quesTemplate': team.Questionnaire}, 'quesTemplate Number type Question option1 option2 option3 option4 option5 option6 option7 option8').exec(function (err,data) {
                        if(err){
                            return next(err);
                        }
                        results.team = data;
                        callback();
                    });
                });
            }
    
        ];
        
        async.parallel(tasks, function(err) { 
                if (err){ return next(err); }
                res.json(results);
            });
            
        }
    });  
});

module.exports = router;