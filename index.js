const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto("https://www.amazon.es");
  await page.waitForSelector("#twotabsearchtextbox");
  await page.type("#twotabsearchtextbox", "web development");
  await page.waitForSelector("#nav-search-submit-button");
  await page.click("#nav-search-submit-button");
  await page.waitForSelector("[data-component-type=s-search-result]");

  const infoText = await page.evaluate(() => {
    const info = document.querySelectorAll(
      "[data-component-type=s-search-result]"
    );

    const infoText = [];

    for (const el of info) {
      infoText.push(el);
    }
    console.log(infoText);

    return infoText;
  });
  console.log(infoText);
})();
