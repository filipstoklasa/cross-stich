import { expect, test } from "@playwright/test";
import path from "path";

test("Pattern configuration should be set by background pattern input and should be configurable by pattern slider", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByTestId("menu-button").click();
  await expect(page.getByTestId("pattern-layer")).not.toBeVisible();

  await page.evaluate(() => {
    document.querySelector<HTMLInputElement>(
      "[data-testid='background-pattern']"
    )!.hidden = false;
  });

  await expect(
    page.locator("[data-testid='background-pattern']")
  ).toBeVisible();

  await page
    .getByTestId("background-pattern")
    .setInputFiles([path.join(__dirname, "assets/canvas.png")]);

  await expect(page.getByTestId("pattern-layer")).toBeVisible();
  await expect(page.getByTestId("pattern-button")).toBeVisible();
  await page.getByTestId("pattern-button").click();
  await expect(page.getByText("Pattern configuration")).toBeVisible();
  await expect(page.getByLabel("Close")).toBeVisible();
  await expect(page.getByTestId("pattern-button")).toBeVisible();
  await expect(page.getByText("Zoom %")).toBeVisible();
  await expect(page.getByText("X axis %")).toBeVisible();
  await expect(page.getByText("Y axis %")).toBeVisible();
  await expect(page).toHaveScreenshot();
});
