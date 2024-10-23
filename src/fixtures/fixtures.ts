import { RegisterPage } from '@/page/registrationPage'
import { ThankYouPage } from '@/page/thankYouPage'
import { test as baseTest } from '@playwright/test'

export const test = baseTest.extend<{
  registerPage: RegisterPage
  thankYouPage: ThankYouPage
}>({
  registerPage: ({ page }, use) => use(new RegisterPage(page)),
  thankYouPage: ({ page }, use) => use(new ThankYouPage(page)),
})
