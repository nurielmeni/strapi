'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */
class ValidationObj {
  constructor(
    isValid = false,
    errMessage = 'The terms of transition must cover 0 to 100 range'
  ) {
    this.isValid = isValid;
    this.errMessage = errMessage;
  }
}

class Range {
  constructor(start, end) {
    if (isNaN(+start) || isNaN(+end))
      throw new Error('Wrong type: Rang accepts only Integer numbers.');
    if (+end < +start)
      throw new Error(
        `Wrong values: Rang "end" (${end}) must be grater or equal to "start"(${start}).`
      );

    this.start = +start;
    this.end = +end;
  }

  inRange(num) {
    return num <= this.end && num >= this.start;
  }

  get range() {
    const res = [];
    for (let i = this.start; i <= this.end; i++) res.push(i);
    return res;
  }

  toString() {
    return `[${this.start}-${this.end}]`;
  }
}

const rangeOverlaps = (ranges, range) => {
  ranges.forEach((r) => {
    if (r.inRange(range.start) || r.inRange(range.end)) return true;
  });
  return false;
};

const validTermsOfTransitionRange = (tot, rangeBegin, rangeEnd) => {
  const ranges = [];

  if (!Array.isArray(tot) || tot.length < 1)
    throw new Error(`You must provide terms of transition.`);

  tot.forEach((term) => {
    const range = new Range(+term.from, +term.to);

    if (rangeOverlaps(ranges, range))
      throw new Error(
        `Wrong values: The terms of transition overlaps. Range: ${range}`
      );

    ranges.push(range);
  });

  ranges.sort((a, b) => (a.start > b.start ? 1 : b.start > a.start ? -1 : 0));

  if (
    ranges[0].start !== rangeBegin ||
    ranges[ranges.length - 1].end !== rangeEnd
  )
    throw new Error(
      `Bad ranges: The terms of transition must cover the range: ${rangeBegin} to ${rangeEnd}`
    );

  for (let i = 0; i < ranges.length - 1; i++) {
    if (ranges[i].end !== ranges[i + 1].start - 1)
      throw new Error(
        `[${
          tot.name
        }] Bad ranges: The terms of transition must cover the whole range: ${rangeBegin} to ${rangeEnd}. Missing: ${
          ranges[i].end + 1
        } - ${ranges[i + 1].start - 1}`
      );
  }

  return true;
};

const validateTermsOfTransitionRange = (
  steps,
  rangeBegin = 0,
  rangeEnd = 100
) => {
  if (!steps || !Array.isArray(steps)) return;

  if (steps.length < 1) return new ValidationObj();

  const termsOfTransitions = steps.map((s) => s.terms_of_transition);
  if (termsOfTransitions.length === 0) return new ValidationObj();

  try {
    termsOfTransitions.forEach((tot) => {
      validTermsOfTransitionRange(tot, rangeBegin, rangeEnd);
    });
  } catch (error) {
    return new ValidationObj(false, error);
  }

  return true;
};

module.exports = {
  validateTermsOfTransitionRange
};
