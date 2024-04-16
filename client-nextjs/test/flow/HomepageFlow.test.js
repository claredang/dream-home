const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

// describe("Quiz Service Navigation", () => {
let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
});

afterAll(async () => {
  if (driver) {
    await driver.quit();
  }
});

test("Navigate to Quiz Test Page", async () => {
  const pageUrl = "https://dream-home-server-umber.vercel.app";
  const expectedQuizUrl =
    "https://dream-home-server-umber.vercel.app/quiz-test";

  await driver.get(pageUrl);

  const button = await driver.wait(
    until.elementLocated(By.linkText("Pick Your Styles Quiz")),
    10000
  );
  await button.click();

  await driver.wait(until.urlIs(expectedQuizUrl), 10000);

  const currentUrl = await driver.getCurrentUrl();
  assert.strictEqual(currentUrl, expectedQuizUrl);
});
// });
