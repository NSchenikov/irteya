

// Тип данных одной метрики
export interface MetricData {
    [metricName: string]: number;
  }
  
  // Пакет данных для одного момента времени
  export interface DataPacket {
    time: string; // ISO формат времени (например, "2025-04-28T20:15:00Z")
    metrics: MetricData[];
  }
  
  // Конфигурация одного графика
  export interface ChartConfig {
    title: string;           // Название графика
    type: 'linear' | 'area' | 'bar';  // Тип графика
    colors: string[];        // Цвета линий
    metrics: string[];       // Метрики для отображения
  }
  
  // Основной DSL — массив графиков
  export interface DashboardDSL {
    charts: ChartConfig[];
  }
  