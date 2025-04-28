/**
 * Представляет данные одной метрики
 */
export interface MetricData {
  [metricName: string]: number;
}

/**
 * Представляет пакет данных для одного момента времени
 */
export interface DataPacket {
  /**
   * Время в формате ISO (например, "2025-04-28T20:15:00Z")
   */
  time: string;

  /**
   * Массив метрик для данного времени
   */
  metrics: MetricData[];
}

/**
 * Конфигурация одного графика
 */
export interface ChartConfig {
  /**
   * Название графика
   */
  title: string;

  /**
   * Тип графика: линейный, область или столбчатый
   */
  type: 'linear' | 'area' | 'bar';

  /**
   * Массив цветов для линий графика
   */
  colors: string[];

  /**
   * Массив имён метрик для отображения на графике
   */
  metrics: string[];
}

/**
 * Основной DSL для дашборда — массив графиков
 */
export interface DashboardDSL {
  charts: ChartConfig[];
}
