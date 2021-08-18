const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto("https://www.amazon.es");
  await page.waitForSelector("#twotabsearchtextbox");
  await page.type("#twotabsearchtextbox", "web development");
})();
