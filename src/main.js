/**
 * main.js - точка входа приложения
 * Инициализирует Phaser, внедряет зависимости через registry
 */
import Phaser from 'phaser';
import GameState from './core/GameState.js';
import { eventBus } from './core/EventBus.js';
import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';

// Конфигурация Phaser
const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#1a1a1a',
  scene: [BootScene, GameScene],
  render: {
    pixelArt: false,
    antialias: true
  }
};

// Инициализация игры
class Main {
  constructor() {
    this.game = null;
    this.init();
  }

  init() {
    console.log('[Main] Initializing game...');

    // Создаём глобальные менеджеры
    const gameState = new GameState();
    
    // Если это новая игра, инициализируем состояние
    if (!gameState.getState()) {
      gameState.init();
    }

    // Создаём игру Phaser
    this.game = new Phaser.Game(config);

    // Внедряем зависимости через registry (доступно во всех сценах)
    this.game.registry.set('gameState', gameState);
    this.game.registry.set('eventBus', eventBus);

    console.log('[Main] Game initialized');
    console.log('[Main] GameState:', gameState.getState());

    // Глобальная обработка ошибок
    window.addEventListener('error', (e) => {
      console.error('[Main] Global error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('[Main] Unhandled promise rejection:', e.reason);
    });
  }
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  new Main();
});

export default Main;
