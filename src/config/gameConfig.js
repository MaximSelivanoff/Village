/**
 * Конфигурация игры: константы, баланс, справочные данные
 */

// Названия сезонов
export const SEASON_NAMES = ['Весна', 'Лето', 'Осень', 'Зима'];

// Культуры и их параметры
// growthSeasons: сколько сезонов нужно для созревания
// baseYield: базовый урожай с одного поля
export const CROPS = {
  wheat: {
    name: 'Пшеница',
    growthSeasons: 2,
    baseYield: 50,
    minPrice: 6,
    maxPrice: 15
  },
  rye: {
    name: 'Рожь',
    growthSeasons: 2,
    baseYield: 45,
    minPrice: 5,
    maxPrice: 12
  },
  oats: {
    name: 'Овёс',
    growthSeasons: 1,
    baseYield: 40,
    minPrice: 4,
    maxPrice: 10
  },
  barley: {
    name: 'Ячмень',
    growthSeasons: 2,
    baseYield: 48,
    minPrice: 5,
    maxPrice: 13
  }
};

// Параметры леса
export const FOREST_CONFIG = {
  growRate: 2, // деревьев за сезон
  chopAmount: 5, // деревьев за одну вырубку
  woodPrice: 2 // цена за дерево
};

// Параметры экономики
export const ECONOMY_CONFIG = {
  taxRate: 0.02, // 2% налога в год от казны
  priceVolatility: 0.15 // ±15% колебание цен
};

// Стадии роста поля
export const FIELD_STAGES = {
  EMPTY: 0,
  PLANTED: 1,
  GROWING: 2,
  READY: 3
};

// Цвета для заглушек (вместо арта)
export const COLORS = {
  field: {
    empty: 0x8B7355, // коричневый
    planted: 0x90EE90, // светло-зелёный
    growing: 0x228B22, // зелёный
    ready: 0xFFD700 // золотой
  },
  forest: 0x006400, // тёмно-зелёный
  house: 0xCD5C5C, // кирпичный
  ui: {
    background: 0x1a1a2e,
    panel: 0x16213e,
    button: 0x0f3460,
    text: 0xffffff,
    highlight: 0xe94560
  }
};

// Стартовые данные для новой игры
export const START_DATA = {
  treasury: 1000,
  year: 1880,
  season: 0 // Весна
};
