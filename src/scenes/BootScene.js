/**
 * BootScene - загрузочная сцена
 * Инициализирует базовые настройки, создаёт UI для загрузки
 */
import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // В MVP нет внешних ассетов, используем заглушки
    // Здесь будет загрузка спрайтов, шрифтов и т.д.
    
    // Показываем индикатор загрузки (в будущем)
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(
      this.cameras.main.width / 2 - 160,
      this.cameras.main.height / 2 - 50,
      320,
      50
    );

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Текст загрузки
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 75,
      text: 'Загрузка...',
      style: {
        font: '24px Georgia',
        color: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    // Прогресс бар
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xe94560, 1);
      progressBar.fillRect(
        this.cameras.main.width / 2 - 150,
        this.cameras.main.height / 2 - 40,
        300 * value,
        30
      );
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    console.log('[BootScene] Preload started');
  }

  create() {
    console.log('[BootScene] Create - boot complete');
    
    // Переходим к главной сцене
    this.scene.start('GameScene');
  }
}
