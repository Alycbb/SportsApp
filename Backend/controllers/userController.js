const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
var _ = require('lodash');



const {User} = require("../models/user");
const {physical_Data} = require("../models/physicaldata");
const {Team} = require("../models/team");

const authenticate = require("../middlewares/authenticate");
const mongoose = require("../db/db");

//create users

router.post("/create",(req,res) =>{
    console.log(req.body);
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height,
        category: req.body.category,
        status: 'active'
    }
    const user = new User(userData);
    user.save().then((user) =>{
        if(user){
            //Determine that "req.body.category" is one of the grades
            //then assign this user to the team with the same index number as this grade's index
            const aaa = ['grade_1', 'grade_2', 'grade_3','grade_4', 'grade_5', 'grade_6','grade_7', 'grade_8', 'grade_9','grade_10', 'grade_11', 'grade_12'];
            const bbb = ['team_1', 'team_2', 'team_3','team_4', 'team_5', 'team_6','team_7', 'team_8', 'team_9','team_10', 'team_11', 'team_12'];


            aaa.map((key, index) =>{
                if(key === req.body.category){
                    const ccc = bbb[index];
                    console.log("its ccc:");
                    console.log(ccc);
                    // if Athlete
                    // add his/her name to "Athletes" field in Team collection
                    if(req.body.userType === 'Athlete'){
                        Team.findOneAndUpdate({'TeamName' : ccc}, { "$addToSet": {'Athletes': req.body.name}}, { new: true }, function(err,team){
                            if(!team){
                                console.log("wrong");
                            }else{
                                console.log("add new Athlete success")
                                //add team name to "team" field in User collection
                                User.findOneAndUpdate({'name' : req.body.name}, { "$addToSet": {'team': ccc}}, { new: true }, function(err,UT){
                                    if(!team){
                                        console.log("wrong");
                                    }else{
                                        console.log("Update user with team success")
                                    }
                                }); 
                            }
                        }); 
                    // if Coach
                    // add his/her name to "Coaches" field in Team collection
                    }else if(req.body.userType === 'Coach'){
                        Team.findOneAndUpdate({'TeamName' : ccc}, { "$addToSet": {'Coaches': req.body.name}}, { new: true }, function(err,team){
                            if(!team){
                                console.log("wrong");
                            }else{
                                console.log("add new Coach success")
                                //add team name to "team" field in User collection
                                User.findOneAndUpdate({'name' : req.body.name}, { "$addToSet": {'team': ccc}}, { new: true }, function(err,UT){
                                    if(!team){
                                        console.log("wrong");
                                    }else{
                                        console.log("Update user with team success")
                                    }
                                }); 
                            }
                        }); 
                    }
                    
                }
            });            
            return user.generateAuthToken();
        }else{
            res.sendStatus(400);
        }
    }).then((token) => {
        res.header({"x-auth": token}).send(user);
    }).catch((error) =>{
        res.status(400).send(error);
    });   
    console.log(mongoose.connection.readyState);
});

// router.get("/user",authenticate,(req,res) => {
//     res.send(req.user);
// });

//get User List by userType(Athlete/Coach)
router.post('/getUser',function (req,res){
    console.log(req.body);
    User.find({'userType': req.body}, 'name email userType coach team weight height status', function (err, users) {
        if(err){
            console.log("mistake!!!!!");
        }
        console.log(users);
        res.json(users);
    });
});

//user login
router.post("/login",(req,res) =>{
    User.findUserByCredentails(req.body.email, req.body.password).then((user) =>{
        user.generateAuthToken().then((token) => {
            var data = {
                user: user,
                dbConnect: mongoose.connection.readyState
              };
            res.header({"x-auth":token}).send(data)
        });
    }).catch((error) =>{
        console.log(error);
        if(mongoose.connection.readyState === 1){
            res.status(400).send("wrong password or email")
        }else{
            res.status(404).send('Database Disconnected!')
        }
    }); 
});

//user logout
router.delete("/logout",authenticate, (req,res) =>{
    req.user.removeToken(req.token).then(() =>{
        res.status(200).send("user logged out");
    }).catch(() =>{
        res.status(401).send();
    });
});

//update user information
router.post("/update/basicInfo", (req,res) =>{
    
    const updateText = {
        name:req.body.newUserName,
        email: req.body.email,
        password: req.body.newPassword,
        category: req.body.newGrade,
        weight: req.body.weight,
        height: req.body.height,
        
    }
    User.findByIdAndUpdate(req.body.userID, updateText, {new: true}, function(err, user){
        if(err) {
            console.log("Something wrong when updating user data!");
        }else{
            // user.save();
            res.json(user);
          }
    });
})

//delete user
router.post("/delete", (req,res) =>{
    console.log(req.body);
    User.findByIdAndDelete(req.body, function(err,one){
        if (err){
            console.log("wrong");
        } 
        Team.updateMany({},{ "$pull": { 'Athletes': one.name, 'Coaches': one.name }}).exec(
            function (err) {
                if(err){
                    console.log(err);
                }
            }
        );   
        res.status(200).send("delete user successfully");
    })
});

//get one user information by userName
router.post("/getUserByName", function(req, res){ 
    User.findOne({'name':req.body.userName}, 'name team status email weight height', function(err,user){
        if(!user){
            res.send('data not found');
        }else{
            var data = {
                user: user,
                dbConnect: mongoose.connection.readyState
              };
            res.json(data);
        }
    });  
});

//Assign Coaches to team
router.post("/coach/assignTeam", function(req, res){ 
    User.findOneAndUpdate({_id : req.body.userID}, { "$addToSet": {'team': req.body.teamName}}, { new: true }, function(err,user){
        if(!user){
            res.status(404).send('data not found');
        }else{
            console.log(user);
            Team.findOneAndUpdate({'TeamName': req.body.teamName}, { "$addToSet": {'Coaches': user.name}}).exec(
                function (err,team) {
                    if(err){
                        console.log(err);
                    }
                    res.json(team);
                }
            );
        }
    });  
});

//Assign Athletes to teams
router.post("/athlete/assignTeam", function(req, res){ 
    User.findOneAndUpdate({_id : req.body.userID}, {'team': req.body.teamName}, { new: true }, function(err,user){
        if(!user){
            res.status(404).send('data not found');
        }else{
            console.log(user);
            
            //pull this athlete from other team
            Team.updateMany({},{ "$pull": { 'Athletes': user.name }}).exec(
                function (err) {
                    if(err){
                        console.log(err);
                    }
                    //add this athlete to "Athletes" field in model "Team"
                    Team.findOneAndUpdate({'TeamName': req.body.teamName}, { "$addToSet": {'Athletes': user.name}}, { new: true }).exec(
                        function (err,team) {
                            if(err){
                                console.log(err);
                            }
                            res.json(team);
                        }
                    );
                }
            );   
        }
    });  
});

//sort users by team
router.post('/sortByTeam',function (req,res){
    User.find({userType: req.body.userType}, 'name userType email team weight height', {sort: {'team': 1}}).exec(function (err,data) {
        if(err){
            return next(err);
        }
        res.json(data);
    });
});


//sort users by UserName
router.post('/sortByUserName',function (req,res){
    User.find({userType: req.body.userType}, 'name userType email team weight height', {sort: {'name': 1}}).exec(function (err,data) {
        if(err){
            return next(err);
        }
        res.json(data);
    });
});

//De/Activate Users
router.post("/changeStatus", function(req, res){ 
    User.findByIdAndUpdate(req.body.userID, {'status': req.body.status}, function(err,user){
        if(!user){
            res.status(404).send('data not found');
        }else{
            var data = {
                user: user,
                dbConnect: mongoose.connection.readyState
              };
            res.json(data);
        }
    });  
});




// router.post("/create/physical_data",(req,res) =>{
//     console.log(req.body);
//     const Data = {
//         name: req.body.name,
//         gender: req.body.gender,
//         weight: req.body.weight,
//         height: req.body.height
//     }
//     const pData = new physical_Data(Data);
//     pData.save().then((user) =>{
//         res.send(pData);
//     }).catch((error) =>{
//         res.status(400).send(error);
//     });   
//     console.log(mongoose.connection.readyState);
// });

// router.post("/update/:id",(req,res) =>{
//     User.findById(req.params.id,function(err,user){
//         if(!user){
//             res.status(404).send('data not found');
//         }else{
//             user.name = req.body.name;
//             user.password = req.body.password;
//             user.save().then((user) =>{
//                 console.log("New User Info:");
//                 console.log(req.body);
//                 res.json('user updated');
//             }).catch(err =>{
//                 res.status(400).send("update failed");
//             });
//         }
//     });
// });




module.exports = router;