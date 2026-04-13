/**
 * EventBus - глобальная шина событий для коммуникации между модулями
 * Все модули общаются только через EventBus, прямых вызовов нет
 */
import Phaser from 'phaser';

class EventBus extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }
}

// Singleton instance
export const eventBus = new EventBus();

export default eventBus;
