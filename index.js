var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var auth       = require('./middlewares/auth')
var cors       = require('cors')

const config = {
   channel: "mychannel",
   orderers: [
      "grpc://health-ledger.westeurope.cloudapp.azure.com:7050"
   ],
   peers: [
      "grpc://health-ledger.westeurope.cloudapp.azure.com:7051"
   ],
   hubs: [
      "grpc://health-ledger.westeurope.cloudapp.azure.com:7053"
   ]
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(auth(config));

var port = process.env.PORT || 5000;

// REGISTER OUR ROUTES -------------------------------
app.use('/request', require("./request"));
app.use('/treatment', require("./treatment"));
app.use('/user', require("./user"));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
