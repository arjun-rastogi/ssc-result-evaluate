const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Define a route to fetch the results using Puppeteer
// Define a route to fetch the results using Puppeteer
app.post("/fetch-results", async (req, res) => {
  try {
    const { url } = req.body; // Assuming you're extracting the values from the request body
    const browser = await puppeteer.launch({
      headless: true, // Set this to true to run without a visible browser window
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Add these args to avoid errors on some systems
    });

    const page = await browser.newPage();

    await page.goto(url);

    const data = await page.evaluate(() => {
      const container = document.querySelector(".grp-cntnr");
      const rows = container.querySelectorAll(".section-cntnr");
      const extractedData = [];

      rows.forEach((row) => {
        const h1Element = row.querySelector(".bold");
        const colElements = row.querySelectorAll(".question-pnl");

        const section = h1Element.textContent;
        const Unattempted = Array.from(colElements).map((col) => {
          const boldElements1 = col.querySelectorAll(".bold");
          if (boldElements1.length >= 6) {
            return boldElements1[5].textContent;
          } else {
            return "N/A"; // If there are fewer than 6 elements with class .bold, handle appropriately
          }
        });
        const attempted = Array.from(colElements).map((col) => {
          const boldElements1 = col.querySelectorAll(".rightAns");
          const boldElements2 = col.querySelectorAll(".bold");
          if (boldElements1.length >= 1) {
            let attemptCoorect =
              boldElements1[0].textContent[0] === boldElements2[5].textContent
                ? "Correct"
                : "Wrong";
            return attemptCoorect;
          } else {
            return "N/A"; // If there are fewer than 6 elements with class .bold, handle appropriately
          }
        });

        let notAttempted = 0;
        for (let i = 0; i < Unattempted.length; i++) {
          if (Unattempted[i] === " -- ") {
            notAttempted++;
          }
        }
        let Attempted = 0;
        for (let i = 0; i < attempted.length; i++) {
          if (attempted[i] === "Correct") {
            Attempted++;
          }
        }
        var wrong = 25 - notAttempted - Attempted;
        var marks = Attempted * 2 - wrong * 0.5;

        extractedData.push({ section, notAttempted, Attempted, wrong, marks });
      });

      return extractedData;
    });

    await browser.close();

    let total = data.reduce((acc, curr) => {
      acc.notAttempted = (acc.notAttempted || 0) + curr.notAttempted;
      acc.Attempted = (acc.Attempted || 0) + curr.Attempted;
      acc.wrong = (acc.wrong || 0) + curr.wrong;
      acc.ans = (acc.Attempted || 0) + (acc.wrong || 0);
      return acc;
    }, {});

    res.status(200).json({ data, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to get data." });
  }
});

const port = 3001; // Choose any port number you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
