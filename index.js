const Network    = require('health-ledger-network');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var auth       = require('./middlewares/auth');
var cors       = require('cors');


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

const pollingUser = {
    "username":"Hans Pollmeier",
    "mspid":"MainOrgMSP",
    "key":"-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgq92fWEiyj5A33dKL\nubf8RYVTb1PZgF4zDCOZWNdOwCOhRANCAASqA54A34J+Ie5QN2K/0s5GDiujPIzK\nG4H2S+GcGEfueyL/AC8U7vpipKDJSachVlewMRt5u1maQjbXJt0d6ut2\n-----END PRIVATE KEY-----",
    "cert":"-----BEGIN CERTIFICATE-----\nMIICLzCCAdWgAwIBAgIRANsW3lTtBjowu1HTWv1ks08wCgYIKoZIzj0EAwIweDEL\nMAkGA1UEBhMCREUxDDAKBgNVBAgTA05SVzESMBAGA1UEBxMJQmllbGVmZWxkMSEw\nHwYDVQQKExhtYWlub3JnLmhlYWx0aC1sZWRnZXIuZGUxJDAiBgNVBAMTG2NhLm1h\naW5vcmcuaGVhbHRoLWxlZGdlci5kZTAgFw0xODA2MTkxMTIyMzBaGA8yMTE4MDUy\nNjExMjIzMFowaTEXMBUGA1UEAwwOSGFucyBQb2xsbWVpZXIxCzAJBgNVBAYTAkRF\nMQwwCgYDVQQIDANOUlcxITAfBgNVBAoMGG1haW5vcmcuaGVhbHRoLWxlZGdlci5k\nZTEQMA4GA1UECwwHUGF0aWVudDBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABKoD\nngDfgn4h7lA3Yr/SzkYOK6M8jMobgfZL4ZwYR+57Iv8ALxTu+mKkoMlJpyFWV7Ax\nG3m7WZpCNtcm3R3q63ajTTBLMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8EAjAA\nMCsGA1UdIwQkMCKAIGbYBFc6gxOePq6MOtDSl6Fa3mSAGERVNZJWw0iWbgAqMAoG\nCCqGSM49BAMCA0gAMEUCIEpmlV1zPjMNMb0FBrBe3sPzeJZYO8yw75QJpLJHRRHI\nAiEA5fMLTnrX1gSuQrYSwtFueI6CzBxtpQz+RmIjosus9N0=\n-----END CERTIFICATE-----"
}
const pollingUserPubKey = "-----BEGIN PUBLIC KEY-----↵MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGMDzASe69pOaELVmUhzNJ6LBdOQ↵0+4B6JYw9RdV2KuN8iE+NvfqiTWkqGiGeNsptnFREKezphTPjOd6kGdIVp53NKmd↵kqRuGsHrrsDnd5sX/Inm4lWBUGI4yCcAtAx1Hi9HgP+kVGRttsUuTtnA1orD82xJ↵5pKsO/T+o7IvhfojAgMBAAE=↵-----END PUBLIC KEY-----";

async function poll() {
    let client = await Network.HealthClient.initWithIdentity(config, pollingUser);
    let user = await client.getUser();
    user = await client.postUser({publicKey: pollingUserPubKey});
    
}

setInterval(function () {
    poll();
}, 25000);

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


