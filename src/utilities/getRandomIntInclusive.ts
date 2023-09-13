/**
 * Returns a random integer between the specified minimum (inclusive) and maximum (inclusive) values.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer between the min and max values, inclusive.
 */
function getRandomIntInclusive(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default getRandomIntInclusive;
