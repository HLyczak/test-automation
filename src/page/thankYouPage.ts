import { Page } from '@playwright/test'

export class ThankYouPage {
  constructor(private page: Page) {}
  public header = this.page.locator('xpath=//h1')
  public subheader = this.page.locator(
    "xpath=//div[contains(@class, 'container')]//span",
  )
}
