/**
 * Converts a number between 1 and 9 to its Roman numeral representation.
 *
 * @param {number} num - A number from 1 to 9.
 * @returns {string} The corresponding Roman numeral.
 *
 * @example
 * toRoman(4); // "IV"
 * toRoman(7); // "VII"
 */
const toRoman = (num: number): string => {
  // Lookup table for Roman numerals 0–9
  const map = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

  return map[num];
};

export default toRoman;
