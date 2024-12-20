import { expect } from "chai";
import { Builder, By, until } from "selenium-webdriver"

const errorMessages = {
  USERNAME_REQUIRED: "Vui lòng nhập tên đăng nhập",
  PASSWORD_REQUIRED: "Vui lòng nhập mật khẩu",
  PASSWORD_MIN_LENGTH: "Mật khẩu tối thiểu 6 kí tự",
  LOGIN_SUCCESS: "Đăng nhập thành công",
  LOGIN_FAILED: "Đăng nhập thất bại"
}

describe("login page", function() {
  let driver;

  beforeEach(async function() {
    driver = new Builder().forBrowser("chrome").build()

    await driver.get("http://localhost:5173/auth")
  })

  afterEach(async function() {
    await driver.quit()
  })

  it("TC01: should show password required text and username required text", async function() {
    const username = ""
    const password = ""

    await driver.findElement(By.id(':r1:')).sendKeys(username)
    await driver.findElement(By.id(':r3:')).sendKeys(password)

    await driver.findElement(By.id("login-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r1:-helper-text"))?.getText() || ""
    const passwordErrorText = await driver.findElement(By.id(":r3:-helper-text"))?.getText() || ""

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
  })

  it("TC02: should show password cannot lower than 6 characters text and username is required text", async function() {
    const username = ""
    const password = "test"

    await driver.findElement(By.id(':r1:')).sendKeys(username)
    await driver.findElement(By.id(':r3:')).sendKeys(password)

    await driver.findElement(By.id("login-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r1:-helper-text"))?.getText() || ""
    const passwordErrorText = await driver.findElement(By.id(":r3:-helper-text"))?.getText() || ""

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
  })

  it("TC03: should show username is required text", async function() {
    const username = ""
    const password = "test123"

    await driver.findElement(By.id(':r1:')).sendKeys(username)
    await driver.findElement(By.id(':r3:')).sendKeys(password)

    await driver.findElement(By.id("login-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r1:-helper-text"))?.getText() || ""

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
  })


  it("TC04: should show password is required text", async function() {
    const username = "bangvo"
    const password = ""

    await driver.findElement(By.id(':r1:')).sendKeys(username)
    await driver.findElement(By.id(':r3:')).sendKeys(password)

    await driver.findElement(By.id("login-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r1:-helper-text"))
    const passwordErrorText = await driver.findElement(By.id(":r3:-helper-text"))?.getText() || ""

    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
    expect(usernameErrorText).to.have.lengthOf(0)
  })

  it("TC05: should show password cannot lower than 6 characters text", async function() {
    const username = "bangvo"
    const password = "test"

    await driver.findElement(By.id(':r1:')).sendKeys(username)
    await driver.findElement(By.id(':r3:')).sendKeys(password)

    await driver.findElement(By.id("login-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r1:-helper-text"))
    const passwordErrorText = await driver.findElement(By.id(":r3:-helper-text"))?.getText() || ""

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
  })

  it("TC06: should show login success text", async function() {
    const username = "bangvo"
    const password = "test123"

    await driver.findElement(By.id(':r1:')).sendKeys(username)
    await driver.findElement(By.id(':r3:')).sendKeys(password)

    await driver.findElement(By.id("login-btn")).click()

    const loginSuccessSnackBar = await driver.wait(until.elementLocated(By.id("notistack-snackbar")), 6000)
    const snackbarText = await driver.wait(until.elementTextIs(loginSuccessSnackBar, errorMessages.LOGIN_SUCCESS), 3000)

    expect(await snackbarText?.getText()).to.equal(errorMessages.LOGIN_SUCCESS)
  })

  it("TC07: should show login failed text", async function() {
    const username = "bangvo"
    const password = "test124"

    await driver.findElement(By.id(':r1:')).sendKeys(username)
    await driver.findElement(By.id(':r3:')).sendKeys(password)

    await driver.findElement(By.id("login-btn")).click()

    const loginFailedSnackBar = await driver.wait(until.elementLocated(By.id("notistack-snackbar")), 6000)
    const snackbarText = await driver.wait(until.elementTextIs(loginFailedSnackBar, errorMessages.LOGIN_FAILED), 3000)

    expect(await snackbarText?.getText()).to.equal(errorMessages.LOGIN_FAILED)
  })
})

