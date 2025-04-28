


// Функция подсчитывает количество повторений элементов массива A в массиве B
// param A - массив чисел, элементы которых нужно найти
// param B - массив чисел, в котором происходит поиск
// returns Объект: ключ - элемент из A, значение - количество раз, сколько он встречается в B

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
  