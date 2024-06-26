/**
 * Compare the given lines for equality.
 *
 * @param {Line2} line1 - first line to compare
 * @param {Line2} line2 - second line to compare
 * @return {boolean} true if lines are equal
 * @alias module:modeling/maths/line2.equals
 */
export const equals = (line1, line2) => (line1[0] === line2[0]) && (line1[1] === line2[1] && (line1[2] === line2[2]))
