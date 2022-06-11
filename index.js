const express = require("express");
const path = require("path");

let ejs = require('ejs');
let people = ['geddy', 'neil', 'alex'];
let html = ejs.render('<%= people.join(", "); %>', {people: people});
const fs = require('fs');



// Just one template

const app = express();
const port = process.env.PORT || "8000";
app.use("/styles",express.static(__dirname + "/styles"));
app.get("/", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
});

app.get("/game",(req,res)=>{
   res.send(html)
})

app.get("/home",(req,res)=>{
    res.render('home.ejs')
})

app.get("/random", (req, res) =>{
  const allFileContents = fs.readFileSync('words_alpha.txt', 'utf-8');
  let words = allFileContents.split(/\r?\n/)

  let random = Math.floor(Math.random() * words.length)
  console.log(words)
  
  res.send(JSON.stringify(words[random]));

  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
})

  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });