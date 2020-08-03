const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const path = require('path');

const router = require("./app/routes");
app.use(router);

if (process.env.NODE_ENV === "production") {
  console.log("Production")
  app.use(express.static("/build"));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
} else {
  console.log("Development")
  app.use(express.static(path.join(__dirname, 'client/public/')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './client/public/index.html'))
  })
}

 
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 })


const port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log(`Server listening on PORT ${port}!`);
});