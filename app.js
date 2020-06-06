//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//connecting to the DB
mongoose.connect('mongodb://localhost:27017/feedbackDB', {useNewUrlParser: true});
//creating a schema for the DB
const feedbackschema={
  FirstName:String,
  LastName:String,
  Email:String,
  Learnus:String,
  Service:String,
  Likes:String,
  Suggestion:String,
};
//creating a model
const Feedback=mongoose.model("Feedback",feedbackschema);
// displaying the webpages home route
app.get("/", function(req, res) {
  res.render("feedback");
});

app.get("/response", function(req, res) {
    res.render("response");
});
//posting or saving the feedback to the DB
app.post("/",function(req,res){
  //obtaining details from the form
  const fname=req.body.Fname;
  const lname=req.body.Lname;
  const email=req.body.emails;
  const learnus=req.body.Learnus;
  const services=req.body.service;
  const likes=req.body.Likes;
  const suggestion=req.body.Suggestion;
//storing the obtained items to a new variable to store in DB
  const item=new Feedback({
    FirstName:fname,
    LastName:lname,
    Email:email,
    Learnus:learnus,
    Service:services,
    Likes:likes,
    Suggestion:suggestion,
  });
  item.save();
  //redirecting to the homepage
  res.redirect("/response");
});
app.post("/response",function(req,res){
  res.redirect("/");
});
//connecting to the server
app.listen(3000, '0.0.0.0', function() {
  console.log("Server started on port 3000");
});
