import { Page } from '@playwright/test'

export class RegisterPage {
  constructor(private page: Page) {}

  public inputName = this.page.getByLabel('Imię*')
  public inputSurname = this.page.getByLabel('Nazwisko*')
  public inputEmail = this.page.getByLabel('Adres e-mail*')
  public inputPassword = this.page.locator(
    "xpath=//input[@placeholder='Hasło']",
  )
  public inputRepeadPassword = this.page.locator(
    "xpath=//input[@placeholder='Powtórz hasło']",
  )
  public inputDateBirth = this.page.getByLabel('Data urodzenia*')
  public selectLanguage = this.page.getByLabel('Język')
  public inputPhoneNumber = this.page.locator(
    "xpath=//input[@placeholder='Numer telefonu']",
  )
  public buttonRegister = this.page.getByText('Zarejestruj')
  public checkboxAcceptReg = this.page.locator(
    "xpath=//span[contains(text(), 'Akceptuję ')]",
  )
  public checkboxAcceptPolicy = this.page.locator(
    'xpath=//span[8]/label/div/div',
  )
  public errorPhoneMessage = this.page.locator(
    "xpath=//div[contains(text(), 'Numer telefonu')]//span[contains(@class, 'error')]",
  )
  public errorNameMessage = this.page.locator(
    "xpath=//label[contains(normalize-space(), 'Imię*')]//span[@class='errors']",
  )
  public errorSurnameMessage = this.page.locator(
    "xpath=//label[contains(normalize-space(), 'Nazwisko*')]//span[@class='errors']",
  )
  public errorEmailMessage = this.page.locator(
    "xpath=//label[contains(normalize-space(), 'Adres e-mail*')]//span[@class='errors']",
  )
  public errorPasswordMessage = this.page.locator(
    "xpath=//label[contains(normalize-space(), 'Hasło*')]//span[@class='errors']",
  )
  public errorRepeadPassword = this.page.locator(
    "xpath=//label[contains(normalize-space(), 'Powtórz hasło*')]//span[@class='errors']",
  )
  public errorDateBirth = this.page.locator(
    "xpath=//label[contains(normalize-space(), 'Data urodzenia*')]//span[@class='errors']",
  )
  public errorCheckboxAcceptPolicy = this.page.locator(
    "xpath=//label[contains(normalize-space(), 'Akceptuję')]//span[@class='errors']",
  )

  async fillInputName(name: string) {
    await this.inputName.fill(name)
  }
  async fillInputSurname(surname: string) {
    await this.inputSurname.fill(surname)
  }
  async fillInputEmail(email: string) {
    await this.inputEmail.fill(email)
  }
  async fillInputPassword(password: string) {
    await this.inputPassword.fill(password)
  }
  async fillInputRepeadPassword(repeadPassword: string) {
    await this.inputRepeadPassword.fill(repeadPassword)
  }
  async fillDateOfBirth(dateOfBirth: string) {
    await this.inputDateBirth.fill(dateOfBirth)
  }
  async clickOnButtonRegister() {
    await this.buttonRegister.click()
  }
  async clickOnCheckboxAcceptPolicy() {
    await this.checkboxAcceptPolicy.click({ force: true })
  }
  async fillInputPhoneNumber(phoneNumber: string) {
    await this.inputPhoneNumber.fill(phoneNumber)
  }
  async navigate() {
    await this.page.goto('/')
  }
}
