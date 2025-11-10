// Utility helpers used across components

/**
 * Concatenate class names conditionally. Similar to clsx or classNames.
 * Filters out falsey values and joins the rest with spaces.
 *
 * @param classes array of class names or falsey values
 * @returns concatenated class names
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}