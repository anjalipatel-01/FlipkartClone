/**
 * Shared utility functions used across the application.
 */

/** Returns a formatted delivery date string, `daysAhead` days from today. */
export function getDeliveryDate(daysAhead: number = 3): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" });
}

/** Formats a number as an Indian-locale price string (e.g. 1,00,000). */
export function formatPrice(n: number): string {
  return n.toLocaleString("en-IN");
}
