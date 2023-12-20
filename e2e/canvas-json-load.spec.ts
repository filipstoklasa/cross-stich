import { expect, test } from "@playwright/test";
import path from "path";

test("Loads configuration from json and renders it to canvas scene", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByTestId("menu-button").click();

  await expect(page.locator("[data-testid='file-config']")).toHaveAttribute(
    "hidden"
  );

  await page.evaluate(() => {
    document.querySelector<HTMLInputElement>(
      "[data-testid='file-config']"
    )!.hidden = false;
  });

  await expect(page.locator("[data-testid='file-config']")).toBeVisible();

  await page
    .getByTestId("file-config")
    .setInputFiles([path.join(__dirname, "assets/config.json")]);

  await expect(page).toHaveScreenshot();
});
