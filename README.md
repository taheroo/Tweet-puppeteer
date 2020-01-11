# Tweet-puppeteer
Automate posting tweets using Puppeteer and [Advice Slip API](https://api.adviceslip.com/) which generate random advice slips.

### Installation
```
git clone https://github.com/taheroo/Tweet-puppeteer
cd Tweet-puppeteer
npm install
```
### Usage
```
open config.js to set your twitter username, password and schedule settings
npm start
```
### Customize Posts
The application use Asvice Slip API to generate random advice posts. 
If you want to use another API to get posts to tweet then go to app.js file and change this default code to your way.
By the end you have to store your post content to advice.data
```javascript
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
```
### Want to help
If you like this application, please star this repository.

If you create an app using this application, please mention this repository.

If you want to contribute to this application, feel free to create a pull request.
