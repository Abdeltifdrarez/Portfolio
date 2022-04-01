const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const port = 3000;

app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res){
  const firstName = req.body.fName;
  const email = req.body.email;
  const lastName = req.body.lName;



  const data= {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  

  const jsonData= JSON.stringify(data);
  
  const url="https://us14.api.mailchimp.com/3.0/lists/91cbc2c077";

  const options= {
    method: "POST",
    auth: "abdeltif:5d2957a7c0fb94156f7fa356febf46b9-us14"
  };

const reque = https.request(url, options, function (response) {

     if(response.statusCode === 200){
       
       res.sendFile(__dirname + "/");
     }else {
      res.sendFile(__dirname + "/");
     }


   response.on("data", function(data) {
     console.log(JSON.parse(data));
   });
  });

  reque.write(jsonData); 
  reque.end();

});




app.listen(process.env.PORT || port, function() {
  console.log(`Server running on port ${port}!`)
});
