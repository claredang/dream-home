const { Builder, By, until } = require("selenium-webdriver");

let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
});

afterAll(async () => {
  if (driver) {
    await driver.quit();
  }
});

test("should submit form and show result", async () => {
  await driver.get("https://dream-home-server-umber.vercel.app/gallery");

  // Wait for the image to be present before interacting with it
  console.log("Waiting for image element...");
  const imageElement = await driver.wait(
    until.elementLocated(By.css('img[alt="image options"]')),
    10000
  );
  console.log("Image element found:", imageElement);
  await imageElement.click();

  const submitButton = await driver.findElement(
    By.xpath('//button[contains(text(), "Submits")]')
  );
  await submitButton.click();

  await driver.wait(
    until.elementLocated(
      By.xpath('//div[contains(text(), "Calculating your result")]')
    ),
    10000
  );

  const resultText = await driver.findElement(
    By.xpath('//div[@class="result"]')
  );
  const result = await resultText.getText();
  expect(result).toBe("Based on our prediction, here is your style");
}, 10000);
