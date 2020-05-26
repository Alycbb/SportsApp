const express = require('express');
const router = express.Router();

const {User} = require("../models/user");
const {physical_Data} = require("../models/physicaldata");
const {Team} = require("../models/team");

const authenticate = require("../middlewares/authenticate");
// const params = require("../middlewares/params");
const mongoose = require("../db/db");

//create team
router.post("/create",(req,res) =>{
    console.log(req.body);
    const teamData = {
        TeamName: req.body.teamName,
    }
    const team = new Team(teamData);
    team.save().then((team) =>{
        res.send(team);
    }).catch((err) =>{
        res.status(400).send(err);
    });
    console.log(mongoose.connection.readyState);
});

//find team by userName
router.post("/getTeamByUserName", function(req, res){ 
    Team.find({'Users' : req.body}, 'TeamName', function(err,team){
        if(!team){
            res.status(404).send('data not found');
        }else{
            res.json(team);
        }
    });  
});

//get all the teams
router.get('/displayAllTeam',function (req,res){
    Team.find({}, 'TeamName').exec(function (err,data) {
        if(err){
            return next(err);
        }
        res.json(data);
    });

});

//get Team Members by TeamName
router.post("/getTeamMembers", function(req, res){ 
    Team.find({'TeamName' : req.body}, function(err,team){
        if(!team){
            res.status(404).send('data not found');
        }else{
            res.json(team);
        }
    });  
});


//remove users from team
router.post("/removeUser", function(req, res){ 
    if(req.body.userType === 'Coach'){
        //pull this coach from "Coaches" field in model "team"
        Team.findOneAndUpdate({'TeamName': req.body.teamName}, { "$pull": {'Coaches': req.body.userName}}, { new: true}).exec(
            function (err,team) {
                if(err){
                    console.log(err);
                }
                //pull this team from "team" field in model "User"
                User.findOneAndUpdate({name : req.body.userName}, {"$pull": {'team': req.body.teamName}}, { new: true }, function(err,user){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("updated user db too")
                    }
                });
                res.json(team);
            }
        );
    }else if(req.body.userType === 'Athlete'){
        //pull this athlete from "Athletes" field in model "Team"
        Team.findOneAndUpdate({'TeamName': req.body.teamName}, { "$pull": {'Athletes': req.body.userName}}, { new: true}).exec(
            function (err,team) {
                if(err){
                    console.log(err);
                }
                //pull this team from "team" field in model "User"
                User.findOneAndUpdate({name : req.body.userName}, {"$pull": {'team': req.body.teamName}}, { new: true }, function(err,user){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("updated user db too")
                    }
                });
                res.json(team);
            }
        );
    }
});

//Change New Team for User
router.post("/user/changeTeam", function(req, res){ 
    if(req.body.userType === 'Coach'){
        //pull this coach from field "Coaches" in model "Team"
        Team.findOneAndUpdate({'TeamName': req.body.oldTeamName}, { "$pull": {'Coaches': req.body.userName}}, { new: true}).exec(
            function (err,team) {
                if(err){
                    console.log(err);
                }
                //add new team from "team" field in model "User"
                Team.findOneAndUpdate({'TeamName': req.body.newTeamName}, { "$addToSet": {'Coaches': req.body.userName}}, { new: true}, function(err,newteam){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added User to New Team")
                        //update team as new team in model "User"
                        User.findOneAndUpdate({name : req.body.userName}, {'team': req.body.newTeamName}, { new: true }, function(err,user){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("updated user db too")
                                res.json(user);
                            }
                        });
                    }
                });           
            }
        );
    }else if(req.body.userType === 'Athlete'){
        //pull this athlete from field "Athletes" in previous "Team"
        Team.findOneAndUpdate({'TeamName': req.body.oldTeamName}, { "$pull": {'Athletes': req.body.userName}}, { new: true}).exec(
            function (err,team) {
                if(err){
                    console.log(err);
                }

                //add this athlete in field "Athletes" in new "Team"
                Team.findOneAndUpdate({'TeamName': req.body.newTeamName}, { "$addToSet": {'Athletes': req.body.userName}}, { new: true}, function(err,newteam){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added User to New Team")
                        //update team as new team in model "User"
                        User.findOneAndUpdate({name : req.body.userName}, {'team': req.body.newTeamName}, { new: true }, function(err,user){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("updated user db too")
                                res.json(user);
                            }
                        });
                    }
                });
            }
        );
    }
});

//assign questionnaire (all the questions inside) to team
router.post("/assignQuesToTeam", function(req, res){ 
    Team.findOneAndUpdate({'TeamName' : req.body.teamName}, {'Questionnaire': req.body.template}, { new: true }, function(err,team){
        if(!team){
            res.status(404).send('data not found');
        }else{
            res.json(team);
        }
    });  
});

//find team by questionnairee
router.post("/findTeamByQuestionnaire", function(req, res){ 
    Team.find({'Questionnaire' : req.body.questionnaireName}, 'TeamName', function(err,team){
        if(!team){
            res.status(404).send('data not found');
        }else{
            res.json(team);
        }
    });  
});

module.exports = router;