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
        motorRight.fwd(100);
        motorLeft.fwd(100);
        break;
      case 'down':
        led.fadeOut();
        if (motorLeft.isOn || motorRight.isOn) {
          motorLeft.stop();
          motorRight.stop();
        } else {
          motorLeft.rev(150);
          motorRight.rev(150);
        }
        break;
      case 'left':
        led.blink(500);
        motorLeft.stop();
        motorRight.fwd(100);
        break;
      case 'right':
        led.strobe(300);
        motorLeft.fwd(100);
        motorRight.stop();
        break;
      default:
        console.log('key not recognized');
    }
  });
});
