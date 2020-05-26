const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

const userController = require("./controllers/userController");
const teamController = require("./controllers/teamController");
const questionController = require("./controllers/questionController");
const trainingplanController = require("./controllers/trainingplanController");
const physicalDataController =  require("./controllers/physicalDataController");


app.use("/user",userController);
app.use("/team",teamController);
app.use("/question",questionController);
app.use("/training",trainingplanController);
app.use("/physicalData", physicalDataController);


const mongoose = require("./db/db");


app.listen(3333, function(){
  console.log('Im working on it');
});