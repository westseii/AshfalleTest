/**
 * Returns a random element from the given array.
 *
 * @template T - The type of the elements in the array.
 * @param {Array<T>} arr - The input array containing elements of type T.
 * @returns {T} A random element from the input array.
 */
function getRandomElement<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default getRandomElement;
