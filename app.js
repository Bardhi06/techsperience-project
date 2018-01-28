const express = require('express');
// init app
const app = express();

// Views location
app.set('views', __dirname + '/views');

// Setting template engine
app.set('view engine', 'ejs');

// Serving static files
app.use(express.static(__dirname + '/public'));

// body parser middleware
var bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Setup MongoDB
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/techsperience';
const ObjectId = require('mongodb').ObjectId;

// Conneting to MongoDB
MongoClient.connect(mongoURL, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log('Database connected successfully!');
    dokumentet = db.collection('dokumentet');
  }
});

//routes
app.get('/', function(req, res) {
  res.render("index");
});

app.get('/products', function(req, res) {

     Product.find(function (err, products) {
       if (err) {
         console.log(err); }
         res.json(products);
     });
  });


app.post('/products', function(req, res) {

   // Code for handling create product to DB and return as JSON

   var product = new Product();
   product.product_name = req.body.product_name;
   product.product_description = req.body.product_description;
   product.product_price = req.body.product_price;

   Product.create(product, function (err, product){
     if (err) { console.log(err); }
     res.json(product);
   });
});


app.get('/products/:id', function(req, res) {

   // Code for getting one specific product and return as JSON

   Product.findById(req.params.id, function(err, product){
     if (err) {
       console.log(err);
     }
     res.json(product);
   });
});


app.put('/products/update/:id', function(req, res) {
   // Code for updating one specific product and return as JSON
   var updatedProduct = {
     product_name: req.body.product_name,
     product_description: req.body.product_description,
     product_price: req.body.product_price
   }
   // setting {new: true} e kthen meniher tUpdated
   Product.findOneAndUpdate({_id: req.params.id}, updatedProduct, {new: true}, function(err, product){
     if (err) {
      console.log(err);
     }
     res.json(product);
   });
});

/* DELETE PRODUCT */
app.delete('/products/delete/:id', function(req, res) {
   // Code to delete one specific product and return message as JSON
   Product.remove({_id: req.params.id}, function (err, result) {
     if (err){ console.log(err)};
     res.json({message: " Product Successfully deleted! "});
   });
});

app.listen(3010, function() {
  console.log("App running at http://localhost:3010");
});
