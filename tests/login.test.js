import { after, before, describe, it } from "mocha";
import { Builder } from "selenium-webdriver";

describe("user login", function() {

  this.timeout(30_000)

  let driver;

  before(async () => {
    driver = new Builder().forBrowser("chrome").build()
  })

  // after(async () => {
  //   await driver.quit()
  // })

  it("should login successfully", async function() {
    await driver.get('http://localhost:5173/auth')
  })
})
