// FIXME: DRY, this can be an outer package.

/**
 * Indicates whether the given value is nullish.
 *
 * @param value The unknown value.
 *
 * @return <t>true</t> if the given value is nullish, otherwise <t>false</t>.
 */
export function isNullish(value: unknown): value is undefined | null {
  return value === undefined || value === null;
}