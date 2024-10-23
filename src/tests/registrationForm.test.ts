import { test } from '@/fixtures'
import { expect } from '@playwright/test'

test.beforeEach(async ({ registerPage }) => {
  await registerPage.navigate()
})
const username = 'Zosia'
const surname = 'Kowalska'
const email = 'zosia@op.pl'
const password = 'Adminka123!'
const dateOfBirth = '1990-01-01'
const errorRepeadPassword = 'Hasła nie są jednakowe!'
const thankYouHeader = `Zosia, dziękujemy za rejestrację!`

const testDataInputEmail: [string, string][] = [
  ['@op.pl', 'Pole E-mail musi być poprawnym adresem email'],
  ['.pl', 'Pole E-mail musi być poprawnym adresem email'],
]

const testDataInputPassword: [string, string][] = [
  [
    'a',
    'Hasło musi zawierać: co najmniej 8 znaków, dużą literę, liczbę, znak specjalny!',
  ],
  [
    'abcabcd',
    'Hasło musi zawierać: co najmniej 8 znaków, dużą literę, liczbę, znak specjalny!',
  ],
  ['abcabcd1', 'Hasło musi zawierać: dużą literę, znak specjalny!'],
  ['abcabcd1!', 'Hasło musi zawierać: dużą literę!'],
  ['Abcac1!', 'Hasło musi zawierać: co najmniej 8 znaków!'],
]

test('Send empty register form', async ({ registerPage }) => {
  const errorMessage = (label: string) => `Pole ${label} jest wymagane`

  await registerPage.clickOnButtonRegister()
  await Promise.all([
    expect(registerPage.errorNameMessage).toContainText(errorMessage('Imię')),
    expect(registerPage.errorSurnameMessage).toContainText(
      errorMessage('Nazwisko'),
    ),
    expect(registerPage.errorEmailMessage).toContainText(
      errorMessage('E-mail'),
    ),
    expect(registerPage.errorPasswordMessage).toContainText(
      errorMessage('password'),
    ),
    expect(registerPage.errorRepeadPassword).toContainText(
      errorMessage('Powtórz hasło'),
    ),
    expect(registerPage.errorDateBirth).toContainText(
      errorMessage('Data urodzenia'),
    ),
    expect(registerPage.errorCheckboxAcceptPolicy).toContainText(
      'To pole jest wymagane',
    ),
  ])
})

test.describe('Test input e-mail. Negative cases.', () => {
  testDataInputEmail.forEach(([inputValue, expectedError]) => {
    test(`Test inputu: ${inputValue}`, async ({ registerPage }) => {
      await registerPage.fillInputName(username)
      await registerPage.fillInputSurname(surname)
      await registerPage.fillInputPassword(password)
      await registerPage.fillInputRepeadPassword(password)
      await registerPage.fillDateOfBirth(dateOfBirth)
      await registerPage.fillInputEmail(inputValue)
      await registerPage.clickOnCheckboxAcceptPolicy()
      await registerPage.clickOnButtonRegister()
      expect(registerPage.errorEmailMessage).toContainText(expectedError)
    })
  })
})

test.describe('Test input password. Negative cases.', () => {
  testDataInputPassword.forEach(([inputValue, expectedError]) => {
    test(`Test inputu: ${inputValue}`, async ({ registerPage }) => {
      await registerPage.fillInputName(username)
      await registerPage.fillInputSurname(surname)
      await registerPage.fillDateOfBirth(dateOfBirth)
      await registerPage.fillInputEmail(email)
      await registerPage.clickOnCheckboxAcceptPolicy()
      await registerPage.fillInputPassword(inputValue)
      await registerPage.fillInputRepeadPassword(password)
      await registerPage.clickOnButtonRegister()
      expect(registerPage.errorPasswordMessage).toContainText(expectedError)
    })
  })
})

test('Test input repead password, negative case.', async ({ registerPage }) => {
  await registerPage.fillInputName(username)
  await registerPage.fillInputSurname(surname)
  await registerPage.fillDateOfBirth(dateOfBirth)
  await registerPage.fillInputEmail(email)
  await registerPage.clickOnCheckboxAcceptPolicy()
  await registerPage.fillInputPassword('z')
  await registerPage.fillInputRepeadPassword(password)
  await registerPage.clickOnButtonRegister()
  expect(registerPage.errorRepeadPassword).toContainText(errorRepeadPassword)
})

test('Test send register form', async ({ registerPage, thankYouPage }) => {
  await registerPage.fillInputName(username)
  await registerPage.fillInputSurname(surname)
  await registerPage.fillDateOfBirth(dateOfBirth)
  await registerPage.fillInputEmail(email)
  await registerPage.fillInputPassword(password)
  await registerPage.fillInputRepeadPassword(password)
  await registerPage.clickOnCheckboxAcceptPolicy()
  await registerPage.clickOnButtonRegister()
  // await new Promise(res => setTimeout(res, 4000))
  expect(thankYouPage.header).toContainText(thankYouHeader)
})
