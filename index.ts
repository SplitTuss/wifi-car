import { Board, Led } from 'johnny-five';
import keypress from 'keypress';

const board = new Board();

board.on('ready', () => {
  const led = new Led(13);

  keypress(process.stdin);

  process.stdin.on('keypress', (_, key) => {
    switch (key.name) {
      case 'up':
        led.blink(500);
        break;
      case 'down':
        led.strobe(300);
        break;
      case 'left':
        led.fadeOut();
        break;
      case 'right':
        led.blink(200);
        break;
      default:
        console.log('key not recognized');
    }
  });
});
