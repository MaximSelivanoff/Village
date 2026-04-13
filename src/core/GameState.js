/**
 * GameState - хранит всё состояние игры
 * Только данные (числа, флаги, объекты), без логики и отображения
 */

// Начальное состояние игры
const createInitialState = () => ({
  // Экономика
  treasury: 1000, // Казна (рубли)
  
  // Склад [культура]: количество
  barn: {
    wheat: 0,
    rye: 0,
    oats: 0,
    barley: 0
  },
  
  // Сезон: 0=Весна, 1=Лето, 2=Осень, 3=Зима
  season: 0,
  
  // Год
  year: 1880,
  
  // Поля: массив объектов
  fields: [
    {
      id: 0,
      crop: null, // null | 'wheat' | 'rye' | 'oats' | 'barley'
      growthStage: 0, // 0-3 (0=пусто, 1=посев, 2=рост, 3=готово)
      soilQuality: 1.0, // множитель урожайности
      isPlanted: false
    },
    {
      id: 1,
      crop: null,
      growthStage: 0,
      soilQuality: 1.0,
      isPlanted: false
    },
    {
      id: 2,
      crop: null,
      growthStage: 0,
      soilQuality: 1.0,
      isPlanted: false
    }
  ],
  
  // Лес
  forest: {
    trees: 50, // количество деревьев
    maxTrees: 100
  },
  
  // Рынок: цены на культуры
  market: {
    wheat: 10,
    rye: 8,
    oats: 6,
    barley: 9
  },
  
  // Флаги событий
  flags: {
    drought: false,
    flood: false,
    peasantRequest: false
  }
});

class GameState {
  constructor() {
    this.state = null;
    this.load();
  }
  
  /**
   * Инициализация нового состояния
   */
  init() {
    this.state = createInitialState();
    return this.state;
  }
  
  /**
   * Получение текущего состояния
   */
  getState() {
    return this.state;
  }
  
  /**
   * Сохранение в localStorage
   */
  save() {
    try {
      const serialized = JSON.stringify(this.state);
      localStorage.setItem('pomeshchik_save', serialized);
      console.log('[GameState] Save successful');
    } catch (e) {
      console.error('[GameState] Save failed:', e);
    }
  }
  
  /**
   * Загрузка из localStorage
   * @returns {boolean} true если загрузка успешна
   */
  load() {
    try {
      const saved = localStorage.getItem('pomeshchik_save');
      if (saved) {
        this.state = JSON.parse(saved);
        console.log('[GameState] Load successful');
        return true;
      }
    } catch (e) {
      console.error('[GameState] Load failed:', e);
    }
    
    // Если нет сохранения, создаём новое
    this.state = createInitialState();
    console.log('[GameState] New game initialized');
    return false;
  }
  
  /**
   * Сброс к начальному состоянию
   */
  reset() {
    this.state = createInitialState();
    this.save();
    console.log('[GameState] Reset to initial state');
  }
}

export default GameState;
