import { expect, test } from "@playwright/test";

test("Scales the canvas and axis accordingly", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page.getByTestId("scene")).toHaveAttribute("width", "500");
  await expect(page.getByTestId("scene")).toHaveAttribute("height", "500");

  await page.getByTestId("scale-down").click();

  await expect(page.getByTestId("scene")).toHaveAttribute("width", "250");
  await expect(page.getByTestId("scene")).toHaveAttribute("height", "250");

  await page.getByTestId("scale-down").click();

  await expect(page.getByTestId("scene")).toHaveAttribute("width", "250");
  await expect(page.getByTestId("scene")).toHaveAttribute("height", "250");

  await page.getByTestId("scale-up").click();
  await page.getByTestId("scale-up").click();
  await page.getByTestId("scale-up").click();

  await expect(page.getByTestId("scene")).toHaveAttribute("width", "1000");
  await expect(page.getByTestId("scene")).toHaveAttribute("height", "1000");

  await page.getByTestId("menu-button").click();

  await page.getByTestId("square-size-input").selectOption("10");
  await page.getByTestId("scene-width-input").selectOption("150");
  await page.getByTestId("scene-height-input").selectOption("150");

  await page.mouse.click(20, 100);

  await expect(page.getByTestId("scene")).toHaveAttribute("width", "1500");
  await expect(page.getByTestId("scene")).toHaveAttribute("height", "1500");

  await page.getByTestId("scale-up").click();
  await page.getByTestId("scale-up").click();
  await page.getByTestId("scale-up").click();
  await page.getByTestId("scale-up").click();

  await expect(page.getByTestId("scene")).toHaveAttribute("width", "4500");
  await expect(page.getByTestId("scene")).toHaveAttribute("height", "4500");

  await expect(page).toHaveScreenshot();
});
