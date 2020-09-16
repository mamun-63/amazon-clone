const functions = require('firebase-functions');
// npm i express
// npm i cors
// npm i stripe
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")(
  "sk_test_51HQezoGQkzeUTptRMCxSYKTDEKUDJ968ONCkpvzJvfJQCTm4PkfclUSgeUvK60zItxyOveB5X70zH7RJgQy4vK8Z00R4x1lm8e"
)

    // Setting up an API

// - App config, setting up the express server
const app = express()

// - Middlewires
app.use(cors({origin:true})) // cors is think of security 
app.use(express.json()) // allow us to send data and pass it in a json format

// - API routes
// GET and POST both carries req from client to server , and retrive info from server , and send back the response
 
// Get req carries req appended to URL
// status 200 is:  -GOOD
app.get('/', (request, response) => response.status(200).send('hello world'))
// app.get('/mamun', (request, response) => response.status(200).send('Hey!! BUDDY .'))

// POST request
// POSt req carries req in message body, that is more secured in http protocol
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });
  
    // status 201 is : OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
    
  } catch (error) {
    console.log(error)
  }

});



// - Listen command
exports.api = functions.https.onRequest(app)
    // this is the setup needed to get the backend express app running on a cloud function

// we're gonna emulate this, if it works then dep;oy it
// on terminal: firebase emulators:start

// API endpoint
// http://localhost:5001/clone-3c429/us-central1/api





