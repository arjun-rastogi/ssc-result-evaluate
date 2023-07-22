const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Define a route to fetch the results using Puppeteer
// Define a route to fetch the results using Puppeteer
app.get("/fetch-results", async (req, res) => {
  const browser = await puppeteer.launch({
    headless: true, // Set this to true to run without a visible browser window
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // Add these args to avoid errors on some systems
  });

  const page = await browser.newPage();

  await page.goto(
    "https://ssc.digialm.com//per/g27/pub/2207/touchstone/AssessmentQPHTMLMode1//2207O23158/2207O23158S5D31137/16885362528197116/5311016448_2207O23158S5D31137E3.html"
  );

  const results = await page.evaluate(() => {
    var right = 0;
    var notAttempted = 0;

    for (var i = 0; i < 100; i++) {
      if (
        document
          .getElementsByClassName("question-pnl")
          [i].getElementsByClassName("bold")[5].textContent === " -- "
      ) {
        notAttempted++;
      }

      if (
        document
          .getElementsByClassName("question-pnl")
          [i].getElementsByClassName("rightAns")[0].textContent[0] ===
        document
          .getElementsByClassName("question-pnl")
          [i].getElementsByClassName("bold")[5].textContent
      ) {
        right++;
      }
    }

    var wrong = 100 - notAttempted - right;
    var marks = right * 2 - wrong * 0.5;

    return {
      Attempted: 100 - notAttempted,
      "Right Answers": right,
      "Wrong Answers": wrong,
      Marks: marks,
    };
  });

  await browser.close();

  res.json(results);
});

const port = 3001; // Choose any port number you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
