import { Board, Led, Motor } from 'johnny-five';
import keypress from 'keypress';

const board = new Board();

board.on('ready', () => {
  const led = new Led(13);

  const motorLeft = new Motor({
    pins: {
      pwm: 3,
      dir: 12,
    },
    invertPWM: true,
  });
  const motorRight = new Motor({
    pins: {
      pwm: 4,
      dir: 8,
    },
    invertPWM: true,
  });

  keypress(process.stdin);

  process.stdin.on('keypress', (_, key) => {
    switch (key.name) {
      case 'up':
        led.fadeIn();
        motorRight.fwd(255);
        motorLeft.fwd(255);
        break;
      case 'down':
        led.fadeOut();
        motorRight.isOn ? motorRight.stop() : motorRight.rev(255);
        motorLeft.isOn ? motorLeft.stop() : motorLeft.rev(255);
        break;
      case 'left':
        led.blink(500);
        break;
      case 'right':
        led.strobe(300);
        break;
      default:
        console.log('key not recognized');
    }
  });
});
