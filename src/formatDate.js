'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const splited = date.split(fromFormat[3]);
  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (!dateObj[fromFormat[i]]) {
      dateObj[fromFormat[i]] = splited[i];
    }
  }

  const newDateObj = {};

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDateObj[toFormat[i]] = dateObj[toFormat[i]];

    if (toFormat[i] === 'YYYY' && !dateObj[toFormat[i]]) {
      if (parseInt(dateObj.YY) < 30) {
        newDateObj[toFormat[i]] = `20${dateObj.YY}`;
      } else {
        newDateObj[toFormat[i]] = `19${dateObj.YY}`;
      }
    }

    if (toFormat[i] === 'YY' && !dateObj[toFormat[i]]) {
      newDateObj[toFormat[i]] = dateObj.YYYY.slice(2);
    }
  }

  const newDate = Object.values(newDateObj);

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
