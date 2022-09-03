const express =require("express");
const bodyParser=require("body-parser");
const request =require("request");
const https = require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const data ={
    members:[
      {
        email_address:email,
        status : "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url="https://us14.api.mailchimp.com/3.0/lists/8953d45a72";
  const options={
     method:"POST",
     auth:"SaiSheren:98f3ebdf06691c177dc79ac65ad5b11e-us14"
  }

  const request1 =https.request(url,options,function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname+"/succes.html");

    } else{
      res.sendFile(__dirname+"/failure.html");

    }


    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request1.write(jsonData);
  request1.end();
 });
 app.post("/failure",function(req,res){
   res.redirect("/");
 })

app.listen(process.env.PORT||3000,function(){
  console.log("server is working");
});
// api key
// 836a09bd4cb2a207d1821bfd2f240cee-us14
// id
// 8953d45a72
// 836a09bd4cb2a207d1821bfd2f240cee-us14
