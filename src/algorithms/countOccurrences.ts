/**
 * Подсчитывает количество повторений элементов массива A в массиве B.
 *
 * @param A - Массив чисел, элементы которого нужно найти.
 * @param B - Массив чисел, в котором происходит поиск.
 * @returns Объект, где ключ — элемент из A, а значение — сколько раз он встречается в B.
 */
export function countOccurrences(A: number[], B: number[]): Record<number, number> {
  const countMap: Record<number, number> = {};

  // Подсчет количества каждого числа в B
  for (const num of B) {
    countMap[num] = (countMap[num] || 0) + 1;
  }

  // Формирование результата на основе массива A
  const result: Record<number, number> = {};

  for (const num of A) {
    result[num] = countMap[num] || 0;
  }

  return result;
}
