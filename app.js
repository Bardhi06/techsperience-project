const express = require ('express');

//init app
const app = express();

//routes
app.get('/', function (req, res) {
  res.send("index page")
});
app.listen(3000, function() {
  console.log("App running at http://localhost:3000");
});
