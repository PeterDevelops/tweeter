"use strict";

// Basic express setup:

const PORT          = 8080; // localhost:8080
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express(); //invokes express

app.use(bodyParser.urlencoded({ extended: true })); // uses bodyparser for req.body
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
const db = require("./lib/in-memory-db");  // an object that requires the data-files/initial tweets
const dataHelpers = require("./lib/data-helpers.js"); // data-helpers.js defines a helper function for saving and getting tweets

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db);

// Update the dates for the initial tweets (data-files/initial-tweets.json).
const updateDates = require("./lib/date-adjust.js")();

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
