const puppeteer = require("puppeteer");

let postTweetPuppeteer = function postTweetPuppeteer(config, advice) {
  async function asyncCall(config, advice) {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--disable-dev-shm-usage",
        "--shm-size=1gb", // --shm-size=1gb to fix Protocol error (Runtime.callFunctionOn)
        "--no-sandbox", // configuration for heroku deployment
        "--disable-setuid-sandbox" // configuration for heroku deployment
      ]
    });

    const page = await browser.newPage();
    // open twitter
    await page.goto("https://twitter.com/login", {
      timeout: 0,
      waitUntil: "domcontentloaded"
    });

    //Login
    // wait for page dom content to load
    await page.waitForNavigation({ waitUntil: "domcontentloaded" }).catch(e => {
      console.log("Error: " + e);
    });

    // await page
    //   .waitForSelector(".js-username-field.email-input.js-initial-focus")
    //   .then(() => console.log("got Username Field"))
    //   .catch(e => {
    //     console.log("Error: " + e);
    //   });

    // await page
    //   .waitForSelector(
    //     ".submit.EdgeButton.EdgeButton--primary.EdgeButtom--medium"
    //   )
    //   .then(() => console.log("got login button"))
    //   .catch(e => {
    //     console.log("Error: " + e);
    //   });

    await page.waitFor(2000)
    .then(() => console.log("waited for 2000"))
    .catch(e => {
      console.log("Error: " + e);
    });

    // await page
    //   .click(".js-username-field.email-input.js-initial-focus")
    //   .then(() => console.log("clicked it username_or_email"))
    //   .catch(e => {
    //     console.log("Error: " + e);
    //   });
    //page.$('select[name="busca_grupo_estado"]');

    await page
      .waitForSelector('[name="session[username_or_email]"]')
      .then(() => console.log("got Username Field"))
      .catch(e => {
        console.log("Error: " + e);
      });

    await page
      .click('[name="session[username_or_email]"]')
      .then(() => console.log("clicked it username_or_email"))
      .catch(e => {
        console.log("Error: " + e);
      });

    await page.keyboard.type(config.username)
    .then(() => console.log("typed username"))
    .catch(e => {
      console.log("Error: " + e);
    });

    await page.waitFor(2000).catch(e => {
      console.log("Error: " + e);
    });
    // await page
    //   .click(".js-password-field")
    //   .then(() => console.log("clicked it session[password]"))
    //   .catch(e => {
    //     console.log("Error: " + e);
    //   });
    //session[password]
    await page
      .click('[name="session[password]"')
      .then(() => console.log("clicked it session[password]"))
      .catch(e => {
        console.log("Error: " + e);
      });
    await page.keyboard.type(config.password).catch(e => {
      console.log("Error: " + e);
    });

    //data-testid="LoginForm_Login_Button"
    await page
      .click('[data-testid="LoginForm_Login_Button"')
      .then(() => console.log("Clicked LoginForm_Login_Button"))
      .catch(e => {
        console.log("Error: " + e);
      });

    // wait till page load
    await page
      .waitForNavigation({ waitUntil: "domcontentloaded" })
      .then(() => {
        console.log("Waited for page navigation");
      })
      .catch(e => {
        console.log("Error: " + e);
      });
    await page
      .waitFor(3000)
      .then(() => {
        console.log("Waited for 3000");
      })
      .catch(e => {
        console.log("Error: " + e);
      });
    
    await page
      .waitForSelector('[data-testid="SideNav_NewTweet_Button"]')
      .then(() => console.log("got it"))
      .catch(e => {
        console.log("Error: " + e);
      });

    //same thing
    //await page.click('.css-1dbjc4n.r-1awozwy.r-jw8lkh.r-e7q0ms')
    await page.click('[data-testid="SideNav_NewTweet_Button"]').catch(e => {
      console.log("Error: " + e);
    });

    // Typing Tweet
    await page
      .waitForSelector('[data-testid="tweetTextarea_0"]')
      .then(() => console.log("got it tweetTextarea_0"))
      .catch(e => {
        console.log("Error: " + e);
      });
    await page
      .click('[data-testid="tweetTextarea_0"]')
      .then(() => console.log("clicked it tweetTextarea_0"))
      .catch(e => {
        console.log("Error: " + e);
      });
    await page.keyboard.type(advice.data).catch(e => {
      console.log("Error: " + e);
    });
    await page.waitFor(2000).catch(e => {
      console.log("Error: " + e);
    });

    //Clicking Tweet Button to post Tweet
    await page
      .waitForSelector('[data-testid="tweetButton"]')
      .then(() => console.log("got it tweetButton"))
      .catch(e => {
        console.log("Error: " + e);
      });
    await page
      .click('[data-testid="tweetButton"]')
      .then(() => console.log("clicked it tweetButton"))
      .catch(e => {
        console.log("Error: " + e);
      });
    await page.waitFor(2000).catch(e => {
      console.log("Error: " + e);
    });

    // Closing browser
    await browser.close().catch(e => {
      console.log("Error: " + e);
    });
  }
  asyncCall(config, advice);
};

module.exports = { postTweetPuppeteer };
