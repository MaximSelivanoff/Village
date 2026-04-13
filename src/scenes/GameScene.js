/**
 * GameScene - главная игровая сцена
 * Отображает карту поместья, интерактивные объекты
 * Тонкая сцена: только инициализация, рендер, маппинг ввода
 */
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    // Получаем менеджеры через registry (Dependency Injection)
    this.gameState = this.registry.get('gameState');
    this.eventBus = this.registry.get('eventBus');
    
    console.log('[GameScene] Init', this.gameState.getState());
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    console.log('[GameScene] Create');

    // Фон (земля)
    this.add.rectangle(width / 2, height / 2, width, height, 0x3a5f0b);

    // Заголовок
    const title = this.add.text(width / 2, 40, 'Помещичье Имение', {
      font: '32px Georgia',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    });
    title.setOrigin(0.5, 0.5);

    // Инфо-панель (сезон, год, казна)
    this.createInfoPanel();

    // Игровые объекты (заглушки)
    this.createHouse();
    this.createFields();
    this.createForest();

    // Подписка на события
    this.eventBus.on('STATE_UPDATED', this.updateInfoPanel, this);
  }

  /**
   * Создание информационной панели
   */
  createInfoPanel() {
    const state = this.gameState.getState();
    const seasonNames = ['Весна', 'Лето', 'Осень', 'Зима'];

    this.infoText = this.add.text(20, 70, '', {
      font: '18px Georgia',
      color: '#ffffff',
      backgroundColor: '#1a1a2e',
      padding: { x: 10, y: 5 }
    });

    this.updateInfoPanel();
  }

  /**
   * Обновление информационной панели
   */
  updateInfoPanel() {
    if (!this.infoText) return;

    const state = this.gameState.getState();
    const seasonNames = ['Весна', 'Лето', 'Осень', 'Зима'];

    this.infoText.setText(
      `Год: ${state.year}\n` +
      `Сезон: ${seasonNames[state.season]}\n` +
      `Казна: ${state.treasury} руб.\n` +
      `Склад: пшеница=${state.barn.wheat}, рожь=${state.barn.rye}`
    );
  }

  /**
   * Создание дома помещика
   */
  createHouse() {
    const house = this.add.rectangle(512, 200, 120, 100, 0xcd5c5c);
    house.setInteractive({ cursor: 'pointer' });

    const houseLabel = this.add.text(512, 200, 'Дом\nпомещика', {
      font: '14px Georgia',
      color: '#ffffff',
      align: 'center'
    });
    houseLabel.setOrigin(0.5, 0.5);

    house.on('pointerover', () => {
      house.setFillStyle(0xff6b6b);
    });

    house.on('pointerout', () => {
      house.setFillStyle(0xcd5c5c);
    });

    house.on('pointerdown', () => {
      console.log('[GameScene] House clicked');
      this.eventBus.emit('OBJECT_CLICKED', { type: 'house' });
    });
  }

  /**
   * Создание полей
   */
  createFields() {
    const fieldPositions = [
      { x: 200, y: 400 },
      { x: 512, y: 400 },
      { x: 824, y: 400 }
    ];

    const state = this.gameState.getState();

    fieldPositions.forEach((pos, index) => {
      const fieldData = state.fields[index];
      const color = this.getFieldColor(fieldData);

      const field = this.add.rectangle(pos.x, pos.y, 140, 100, color);
      field.setInteractive({ cursor: 'pointer' });

      const fieldLabel = this.add.text(pos.x, pos.y, `Поле #${index + 1}`, {
        font: '14px Georgia',
        color: '#ffffff',
        align: 'center'
      });
      fieldLabel.setOrigin(0.5, 0.5);

      field.on('pointerover', () => {
        field.setFillStyle(this.getFieldColor(fieldData, true));
      });

      field.on('pointerout', () => {
        field.setFillStyle(color);
      });

      field.on('pointerdown', () => {
        console.log(`[GameScene] Field ${index} clicked`, fieldData);
        this.eventBus.emit('OBJECT_CLICKED', { type: 'field', fieldId: index });
      });

      // Сохраняем ссылку для обновления
      this[`field${index}`] = field;
    });
  }

  /**
   * Получение цвета поля в зависимости от состояния
   */
  getFieldColor(fieldData, isHover = false) {
    const colors = {
      0: 0x8b7355, // пусто - коричневый
      1: 0x90ee90, // посев - светло-зелёный
      2: 0x228b22, // рост - зелёный
      3: 0xffd700  // готово - золотой
    };

    let color = colors[fieldData.growthStage] || colors[0];

    if (isHover) {
      // Осветляем цвет при наведении
      color = parseInt(color.toString(16) + 'aa', 16) | 0x202020;
    }

    return color;
  }

  /**
   * Создание леса
   */
  createForest() {
    const forest = this.add.rectangle(850, 150, 120, 140, 0x006400);
    forest.setInteractive({ cursor: 'pointer' });

    const forestLabel = this.add.text(850, 150, 'Лес', {
      font: '14px Georgia',
      color: '#ffffff',
      align: 'center'
    });
    forestLabel.setOrigin(0.5, 0.5);

    forest.on('pointerover', () => {
      forest.setFillStyle(0x008000);
    });

    forest.on('pointerout', () => {
      forest.setFillStyle(0x006400);
    });

    forest.on('pointerdown', () => {
      console.log('[GameScene] Forest clicked');
      this.eventBus.emit('OBJECT_CLICKED', { type: 'forest' });
    });
  }

  shutdown() {
    // Отписка от событий
    this.eventBus.off('STATE_UPDATED', this.updateInfoPanel, this);
    console.log('[GameScene] Shutdown');
  }
}
