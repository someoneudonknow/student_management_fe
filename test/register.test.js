import { expect } from "chai";
import { Builder, By, until } from "selenium-webdriver"

const errorMessages = {
  USERNAME_REQUIRED: "Vui lòng nhập tên đăng nhập",
  EMAIL_REQUIRED: "Vui lòng nhập email",
  PASSWORD_REQUIRED: "Vui lòng nhập mật khẩu",
  PASSWORD_CONFIRM_NOT_MATCHED: "Mật khẩu xác nhận không trùng khớp",
  PASSWORD_MIN_LENGTH: "Mật khẩu tối thiểu 6 kí tự",
  INVALID_EMAIL: "Địa chỉ email không hợp lệ",
  REGISTER_FAILED: "Đăng kí thất bại",
  REGISTER_SUCCESS: "Đăng kí thành công"
}

describe("register page", function() {
  let driver;

  beforeEach(async function() {
    driver = new Builder().forBrowser("chrome").build()

    await driver.get("http://localhost:5173/auth")

    await driver.findElement(By.id('register-navigation-btn')).click()

    await driver.sleep(1000)
  })

  afterEach(async function() {
    await driver.quit()
  })

  it("TC01: should show required error messages of email, username and password fields", async function() {
    const username = ""
    const email = ""
    const password = ""

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
  })

  it("TC02: should show required error messages of email, username and password fields and show password confirm is not match error message ", async function() {
    const username = ""
    const email = ""
    const password = ""
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC03: should show required error messages of email, username and password is at least 6 characters", async function() {
    const username = ""
    const email = ""
    const password = "test"
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.equal("Mật khẩu tối thiểu 6 kí tự")
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC04: should show required error messages of email, username, password confirm is not match and password is at least 6 characters", async function() {
    const username = ""
    const email = ""
    const password = "test"
    const passwordConfirm = "test1"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.equal("Mật khẩu tối thiểu 6 kí tự")
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC05: should show required error messages of email, username", async function() {
    const username = ""
    const email = ""
    const password = "test123"
    const passwordConfirm = "test123"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElements(By.id(":r9:-helper-text"))
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.have.lengthOf(0)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC06: should show required error messages of email, username, password confirm is not matched", async function() {
    const username = ""
    const email = ""
    const password = "test123"
    const passwordConfirm = "test124"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElements(By.id(":r9:-helper-text"))
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.have.lengthOf(0)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC07: should show required error messages of username, password, invalid email", async function() {
    const username = ""
    const email = "test@"
    const password = ""

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
  })

  it("TC08: should show required error messages of username, password, invalid email, password confirm is not matched", async function() {
    const username = ""
    const email = "test@"
    const password = ""
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC09: should show required error messages of username, password, invalid email, password confirm is not matched", async function() {
    const username = ""
    const email = "test@"
    const password = "test"
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC10: should show required error messages of username, invalid email, password cannot be lower than 6 characters, password confirm is not matched", async function() {
    const username = ""
    const email = "test@"
    const password = "test"
    const passwordConfirm = "test1"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })


  it("TC11: should show required error messages of username, invalid email", async function() {
    const username = ""
    const email = "test@"
    const password = "test123"
    const passwordConfirm = "test123"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElements(By.id(":r9:-helper-text"))
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.have.lengthOf(0)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC12: should show these error messages: username is required, invalid email, password confirm is not matched", async function() {
    const username = ""
    const email = "test@"
    const password = "test123"
    const passwordConfirm = "test124"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElements(By.id(":r9:-helper-text"))
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.have.lengthOf(0)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC13: should show these error messages: username is required, password is required", async function() {
    const username = ""
    const email = "test@gmail.com"
    const password = ""
    const passwordConfirm = ""

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElements(By.id(":r7:-helper-text"))
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC14: should show these error messages: username is required, password is required, password confirm is not matched", async function() {
    const username = ""
    const email = "test@gmail.com"
    const password = ""
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElements(By.id(":r7:-helper-text"))
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC15: should show these error messages: username is required, password cannot lower than 6 characters", async function() {
    const username = ""
    const email = "test@gmail.com"
    const password = "test"
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElements(By.id(":r7:-helper-text"))
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC16: should show these error messages: username is required, password cannot lower than 6 characters, password confirm is not matched", async function() {
    const username = ""
    const email = "test@gmail.com"
    const password = "test"
    const passwordConfirm = "test1"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElements(By.id(":r7:-helper-text"))
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC17: should show this error messages: username is required", async function() {
    const username = ""
    const email = "test@gmail.com"
    const password = "test123"
    const passwordConfirm = "test123"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElements(By.id(":r7:-helper-text"))
    const passwordErrorText = await driver.findElements(By.id(":r9:-helper-text"))
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.have.lengthOf(0)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC18: should show these error messages: username is required, password confirm is not matched", async function() {
    const username = ""
    const email = "test@gmail.com"
    const password = "test123"
    const passwordConfirm = "test124"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElement(By.id(":r5:-helper-text")).getText()
    const emailErrorText = await driver.findElements(By.id(":r7:-helper-text"))
    const passwordErrorText = await driver.findElements(By.id(":r9:-helper-text"))
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.equal(errorMessages.USERNAME_REQUIRED)
    expect(emailErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.have.lengthOf(0)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC19: should show these error messages: email is required, password is required", async function() {
    const username = "bangvo"
    const email = ""
    const password = ""
    const passwordConfirm = ""

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC20: should show these error messages: email is required, password is required, password confirm is not matched", async function() {
    const username = "bangvo"
    const email = ""
    const password = ""
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC21: should show these error messages: email is required, password cannot lower than 6 characters", async function() {
    const username = "bangvo"
    const email = ""
    const password = "test"
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC22: should show these error messages: email is required, password cannot lower than 6 characters, password confirm is not matched", async function() {
    const username = "bangvo"
    const email = ""
    const password = "test"
    const passwordConfirm = "test1"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC23: should show these error messages: email is required", async function() {
    const username = "bangvo"
    const email = ""
    const password = "test123"
    const passwordConfirm = "test123"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElements(By.id(":r9:-helper-text"))
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.have.lengthOf(0)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC24: should show these error messages: email is required, password confirm is not matched", async function() {
    const username = "bangvo"
    const email = ""
    const password = "test123"
    const passwordConfirm = "test124"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElements(By.id(":r9:-helper-text"))
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.EMAIL_REQUIRED)
    expect(passwordErrorText).to.have.lengthOf(0)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC25: should show these error messages: invalid email, password is required", async function() {
    const username = "bangvo"
    const email = "test@"
    const password = ""
    const passwordConfirm = ""

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC26: should show these error messages: invalid email, password is required, password confirm is not matched", async function() {
    const username = "bangvo"
    const email = "test@"
    const password = ""
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC27: should show these error messages: invalid email, password cannot lower than 6 chracters", async function() {
    const username = "bangvo"
    const email = "test@"
    const password = "test"
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC28: should show these error messages: invalid email, password cannot lower than 6 chracters, password confirm is not matched", async function() {
    const username = "bangvo"
    const email = "test@"
    const password = "test"
    const passwordConfirm = "test1"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC29: should show these error messages: invalid email", async function() {
    const username = "bangvo"
    const email = "test@"
    const password = "test123"
    const passwordConfirm = "test123"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElements(By.id(":r9:-helper-text"))
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.have.lengthOf(0)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC30: should show these error messages: invalid email, password confirm is not matched", async function() {
    const username = "bangvo"
    const email = "test@"
    const password = "test123"
    const passwordConfirm = "test124"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElement(By.id(":r7:-helper-text")).getText()
    const passwordErrorText = await driver.findElements(By.id(":r9:-helper-text"))
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.equal(errorMessages.INVALID_EMAIL)
    expect(passwordErrorText).to.have.lengthOf(0)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC31: should show these error messages: password is required", async function() {
    const username = "bangvo"
    const email = "test@gmail.com"
    const password = ""
    const passwordConfirm = ""

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElements(By.id(":r7:-helper-text"))
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC32: should show these error messages: password is required, password confirm is not matched", async function() {
    const username = "bangvo"
    const email = "test@gmail.com"
    const password = ""
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElements(By.id(":r7:-helper-text"))
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_REQUIRED)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC33: should show these error messages: password cannot lower than 6 characters", async function() {
    const username = "bangvo"
    const email = "test@gmail.com"
    const password = "test"
    const passwordConfirm = "test"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElements(By.id(":r7:-helper-text"))
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElements(By.id(":rb:-helper-text"))

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
    expect(passwordConfirmErrorText).to.have.lengthOf(0)
  })

  it("TC34: should show these error messages: password cannot lower than 6 characters, password confirm is not matched", async function() {
    const username = "bangvo"
    const email = "test@gmail.com"
    const password = "test"
    const passwordConfirm = "test1"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElements(By.id(":r7:-helper-text"))
    const passwordErrorText = await driver.findElement(By.id(":r9:-helper-text")).getText()
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.equal(errorMessages.PASSWORD_MIN_LENGTH)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC35: should show these error messages: password confirm is not matched", async function() {
    const username = "bangvo"
    const email = "test@gmail.com"
    const password = "test123"
    const passwordConfirm = "test124"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const usernameErrorText = await driver.findElements(By.id(":r5:-helper-text"))
    const emailErrorText = await driver.findElements(By.id(":r7:-helper-text"))
    const passwordErrorText = await driver.findElements(By.id(":r9:-helper-text"))
    const passwordConfirmErrorText = await driver.findElement(By.id(":rb:-helper-text")).getText()

    expect(usernameErrorText).to.have.lengthOf(0)
    expect(emailErrorText).to.have.lengthOf(0)
    expect(passwordErrorText).to.have.lengthOf(0)
    expect(passwordConfirmErrorText).to.equal(errorMessages.PASSWORD_CONFIRM_NOT_MATCHED)
  })

  it("TC36: should show this error messages: register failed", async function() {
    const username = "bangvo"
    const email = "test@gmail.com"
    const password = "test123"
    const passwordConfirm = "test123"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const registerFailedSnackbar = await driver.wait(until.elementLocated(By.id("notistack-snackbar")), 6000)
    const snackbarText = await driver.wait(until.elementTextIs(registerFailedSnackbar, errorMessages.REGISTER_FAILED), 3000)

    expect(await snackbarText.getText()).to.equal(errorMessages.REGISTER_FAILED)
  })

  it("TC37: should show this error messages: register failed", async function() {
    const username = "bangvo"
    const email = "test1@gmail.com"
    const password = "test123"
    const passwordConfirm = "test123"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const registerFailedSnackbar = await driver.wait(until.elementLocated(By.id("notistack-snackbar")), 6000)
    const snackbarText = await driver.wait(until.elementTextIs(registerFailedSnackbar, errorMessages.REGISTER_FAILED), 3000)

    expect(await snackbarText.getText()).to.equal(errorMessages.REGISTER_FAILED)
  })

  it("TC38: should show this error messages: register failed", async function() {
    const username = "bangvo1"
    const email = "test@gmail.com"
    const password = "test123"
    const passwordConfirm = "test123"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const registerFailedSnackbar = await driver.wait(until.elementLocated(By.id("notistack-snackbar")), 6000)
    const snackbarText = await driver.wait(until.elementTextIs(registerFailedSnackbar, errorMessages.REGISTER_FAILED), 3000)

    expect(await snackbarText.getText()).to.equal(errorMessages.REGISTER_FAILED)
  })

  it("TC39: should show this error messages: register success", async function() {
    const username = "bangvo1"
    const email = "test1@gmail.com"
    const password = "test123"
    const passwordConfirm = "test123"

    await driver.findElement(By.id(":r5:")).sendKeys(username)
    await driver.findElement(By.id(":r7:")).sendKeys(email)
    await driver.findElement(By.id(":r9:")).sendKeys(password)
    await driver.findElement(By.id(":rb:")).sendKeys(passwordConfirm)

    await driver.findElement(By.id("register-btn")).click()

    const registerSuccessSnackbar = await driver.wait(until.elementLocated(By.id("notistack-snackbar")), 6000)
    const snackbarText = await driver.wait(until.elementTextIs(registerSuccessSnackbar, errorMessages.REGISTER_SUCCESS), 3000)

    expect(await snackbarText.getText()).to.equal(errorMessages.REGISTER_SUCCESS)
  })
})
