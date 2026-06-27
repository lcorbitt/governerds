import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility audits for the public pages. Our audience makes WCAG 2.1 AA a
 * hard requirement, so we fail the build on serious or critical violations.
 */
const pages = ["/", "/login", "/signup", "/forgot-password"];

for (const path of pages) {
  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}
