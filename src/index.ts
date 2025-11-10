import 'dotenv/config';
import { Board, Led, Motor } from 'johnny-five';
import Photon from 'particle-io';
import keypress from 'keypress';

const photon = new Photon({
  token: process.env.PARTICLE_TOKEN,
  deviceId: process.env.PARTICLE_DEVICE_ID,
});

const board = new Board({
  io: photon,
});

board.on('ready', () => {
  const led = new Led('D7');

  const motorLeft = new Motor({
    pins: {
      pwm: 0,
      dir: 5,
    },
    invertPWM: true,
  });
  const motorRight = new Motor({
    pins: {
      pwm: 1,
      dir: 6,
    },
    invertPWM: true,
  });

  keypress(process.stdin);

  process.stdin.on('keypress', (_, key) => {
    switch (key.name) {
      case 'up':
        led.stop();
        led.on();
        motorRight.fwd(150);
        motorLeft.fwd(150);
        break;
      case 'down':
        led.stop();
        led.off();
        if (motorLeft.isOn || motorRight.isOn) {
          motorLeft.stop();
          motorRight.stop();
        } else {
          motorLeft.rev(150);
          motorRight.rev(150);
        }
        break;
      case 'left':
        led.stop();
        led.blink(500);
        motorLeft.rev(150);
        motorRight.fwd(250);
        break;
      case 'right':
        led.stop();
        led.strobe(300);
        motorLeft.fwd(250);
        motorRight.rev(150);
        break;
      case 'escape':
        process.exit(0);
      default:
        console.log('key not recognized');
    }
  });
});
