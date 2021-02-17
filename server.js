const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const _ = require('lodash');
const PORT = process.env.PORT || 9000;

mongoose.connect("mongodb+srv://Asiful_01:Mongo1234@cluster0.9hlzt.mongodb.net/budgetDB?retryWrites=true&w=majority", { useNewUrlParser: true });

const app = express();

app.set('view engine');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const userSchema = {
  userName: String,
}

const itemListSchema = {
  userId: String,
  listDate: String,
  isSaved: Boolean,
  list: Array
}

const User = mongoose.model("User", userSchema);
const ItemList = mongoose.model("ItemList", itemListSchema);

// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

app.get("/getItemListData", function (request, response) {

  console.log("Get Item List");
  console.log(request.query);

  const id = request.query.userId;
  const date = request.query.listDate;

  ItemList.findOne({ userId: id, listDate:date},'list isSaved',function(err, result){
    if(err){
      res = { error: true, message: "Error Fetching Item List"};
    }else{
      res = { error: false, message: "Data Fetched Item List", itemList: result};
    }
    console.log(res);
    response.json(res);
  });
});

app.post("/saveItemListData", function (request, response) {
  console.log("Save Budget Data");
  console.log(request.body);
  var res = {};

  const userId = request.body.itemList.userId;
  const listDate = request.body.itemList.listDate;
  const isSaved = true;
  const list = request.body.itemList.list;

  const newList = new ItemList({
    userId: userId,
    listDate: listDate,
    isSaved: isSaved,
    list: list
  })

  newList.save(function (err, result) {
    if (err) {
      res = { error: true, message: "Error adding data" };
    } else {
      res = { error: false, message: "Data added", id: result._id };
    }
    console.log(res);
    //response.json(res);
  });
  //response.redirect("http://localhost:3000/");
});

app.put("/updateItemListData", function (request, response) {
  console.log("Update Budget Data");
  console.log(request.body);
  var res = {};

  const id = request.body.itemList.userId;
  const date = request.body.itemList.listDate;
  //const isSaved = true;
  const list = request.body.itemList.list;

  //isSaved: isSaved,

  const newList = new ItemList({
    userId: id,
    listDate: date,
    list: list
  })

  ItemList.findOneAndUpdate({userId: id,listDate:date},{ list: list},function (err, result) {
    if (err) {
      res = { error: true, message: "Error updating data" };
    } else {
      res = { error: false, message: "Data updated"};
    }
    console.log(res);
    //response.json(res);
  });
  //response.redirect("http://localhost:3000/");
});


app.get("/getUserListData", function (request, response) {

  console.log("Get User List");
  //console.log(request.query);
  User.find(function(err, result){
    if(err){
      res = { error: true, message: "Error Fetching User List"};
    }else{
      res = { error: false, message: "Data Fetched User List", userList: result};
    }
    console.log(res);
    response.json(res);
  });
});

app.post("/save", function (request, response) {
  console.log("Save Data");
  console.log(request.body.user);
  var res = {};
  //const nameId = request.body.user.id;
  const userName = request.body.user.userName;

  console.log(userName);

  const newUser = new User({
    userName: userName
  }, { versionKey: false });

  newUser.save(function (err, result) {
    if (err) {
      res = { error: true, message: "Error adding data" };
    } else {
      res = { error: false, message: "Data added", id: result._id };
    }
    console.log(res);
    response.json(res);
  });
  //response.redirect("http://localhost:3000/");

});

app.delete("/delete", function (request,response) {
  console.log("Delete Item");
  console.log(request.body.item);

  const id = request.body.item._id;
  console.log(id);

  User.findByIdAndRemove({ _id: id }, function (err, res) {
    if(err){
      res = { error: true, message: "Error Deleting User"};
    }else{
      res = { error: false, message: "User Deleted"};
    }
    console.log(res);
    response.json(res);
  })
});




//
// app.post("/delete",function(request,response){
//   const id = request.body.deleteItem;
//   const hiddenTitle = request.body.hiddenValue;
//   if(hiddenTitle === "Today"){
//     Item.findByIdAndRemove({_id:id},function(err){
//       if(err){
//         console.log(err);
//       }else{
//         console.log("Delete Successful");
//         response.redirect("/");
//       }
//     })
//   }else{
//     List.findOneAndUpdate({name:hiddenTitle},{$pull: {items:{_id:id}}},function(err){
//       if(!err){
//         console.log("Delete Successful")
//         response.redirect("/"+hiddenTitle);
//       }
//     })
//   }
// })

app.get('/', function (req, res) {
  res.json('you did it');
});

app.listen(PORT, function () {
  console.log("Server listening to port 9000");
})