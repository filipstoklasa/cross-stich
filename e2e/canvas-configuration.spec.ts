import { expect, test } from "@playwright/test";

test("Canvas configuration elements should exist", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByTestId("menu-button")).toBeVisible();
  await page.getByTestId("menu-button").click();
  await expect(page.getByText("Canvas configuration")).toBeVisible();
  await expect(page.getByText("Width255075")).toBeVisible();
  await expect(page.getByText("Height255075")).toBeVisible();
  await expect(page.getByText("Square size102050")).toBeVisible();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Marker$/ })
      .locator("div")
      .first()
  ).toBeVisible();

  await expect(page.getByText("Input")).toBeVisible();
  await expect(page.getByRole("button", { name: "File config" })).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Background pattern" })
  ).toBeVisible();

  await expect(page.getByText("Output")).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Save to browser" })
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Save as file" })
  ).toBeVisible();

  await expect(page.getByRole("button", { name: "Print grid" })).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Print canvas" })
  ).toBeVisible();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Auto save mode$/ })
      .first()
  ).toBeVisible();

  await expect(
    page.getByText(`© ${new Date().getFullYear()} Filip Stoklasa`)
  ).toBeVisible();

  await expect(page.getByText("version:")).toBeVisible();
  await expect(page).toHaveScreenshot();
});
