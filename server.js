const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const _ = require('lodash');
const PORT = process.env.PORT || 9000;

mongoose.connect("mongodb+srv://Asiful_01:Mongo1234@cluster0.9hlzt.mongodb.net/userDB?retryWrites=true&w=majority", {useNewUrlParser: true});

const app = express();

app.set('view engine');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

const userSchema = {
  name: String
}

const User = mongoose.model("User",userSchema);

// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });


app.post("/save",function(request,response){
  console.log("Save Data");
  console.log(request.body.user);
  var res = {};
  //const nameId = request.body.user.id;
  const userName = request.body.user.userName;

  console.log(userName);

  const newUser = new User({
    //id:nameId,
    name: userName
  })

  newUser.save(function(err, result){
  if(err) {
    res = { error: true, message: "Error adding data" };
  } else {
    res = { error: false, message: "Data added", id: result._id };
  }
  console.log(res);
  response.json(res);
});
  //response.redirect("http://localhost:3000/");

});

app.delete("/delete",function(request,response){
  console.log("Delete Item");
  console.log(request.body.item);

  const id = request.body.item.id;
  console.log(id);

  User.findByIdAndRemove({_id:id},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Delete Successful");
    }
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

app.get('/', function(req, res) {
  res.json('you did it');
});

app.listen(PORT,function(){
  console.log("Server listening to port 9000");
})