

import { countOccurrences } from './countOccurrences';

describe('countOccurrences', () => {
  it('should correctly count occurrences', () => {
    const A = [1, 2, 3, 4];
    const B = [1, 2, 2, 3, 5, 5, 2, 4];

    const result = countOccurrences(A, B);

    expect(result).toEqual({
      1: 1,
      2: 3,
      3: 1,
      4: 1,
    });
  });

  it('should return 0 for elements not found in B', () => {
    const A = [10, 20];
    const B = [1, 2, 3, 4, 5];

    const result = countOccurrences(A, B);

    expect(result).toEqual({
      10: 0,
      20: 0,
    });
  });
});
