const config = require("./config");

const express = require("express");
const cron = require("node-cron");
const request = require("request");
const EventEmitter = require("events").EventEmitter;

const puppeteerCustomizedFunctions = require("./puppeteerCustomizedFunctions");

const port = process.env.PORT || 3000;
const app = express();

function scheduler(config) {
  cron.schedule(config.schedule, () => {
    //Request to get Advice
    let advice = new EventEmitter();
    request({ url: "https://api.adviceslip.com/advice", json: true }, function(
      error,
      response,
      body
    ) {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body.slip.advice); // Print the HTML for the Google homepage.
      advice.data = body.slip.advice;
      advice.emit("update");
    });
    advice.on("update", function() {
      console.log(advice.data);
    });

    console.log("Running scheduled tasks");
    let tweetDate = Date(Date.now()).toString();
    console.log("Tweet Date: " + tweetDate);
    puppeteerCustomizedFunctions.postTweetPuppeteer(config, advice);
  });
} //end function scheduler

scheduler(config);

app.listen(port);
