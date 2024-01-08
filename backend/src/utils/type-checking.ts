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

/**
 * TODO:
 */
export function isEmpty<T>(value: ArrayLike<T>): boolean {
  return value.length === 0
}

/**
 * TODO:
 */
export function hasNullish<T>(collection: T[]): collection is Array<NonNullable<T>>{
  return collection.some((value) => isNullish(value));
}
