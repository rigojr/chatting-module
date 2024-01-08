/**
 * Indicates whether the value is HTMLInputElement or not.
 *
 * @param _value The unknown value.
 *
 * @return <t>true</t> if the given value is HTMLInputElement, otherwise <t>false</t>.
 */
export function isHTMLInputElement(_value: unknown): _value is HTMLInputElement { // TODO: DRY, move this to be reuse.
  return true; // TODO: add type checking.
}

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
 * TODO: pending to add.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
