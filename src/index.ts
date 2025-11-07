import 'dotenv/config';
import { Board, Led } from 'johnny-five';
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

  // const motorLeft = new Motor({
  //   pins: {
  //     pwm: 3,
  //     dir: 12,
  //   },
  //   invertPWM: true,
  // });
  // const motorRight = new Motor({
  //   pins: {
  //     pwm: 4,
  //     dir: 8,
  //   },
  //   invertPWM: true,
  // });

  keypress(process.stdin);

  process.stdin.on('keypress', (_, key) => {
    switch (key.name) {
      case 'up':
        led.stop();
        led.on();
        // motorRight.fwd(100);
        // motorLeft.fwd(100);
        break;
      case 'down':
        led.stop();
        led.off();
        // if (motorLeft.isOn || motorRight.isOn) {
        //   motorLeft.stop();
        //   motorRight.stop();
        // } else {
        //   motorLeft.rev(150);
        //   motorRight.rev(150);
        // }
        break;
      case 'left':
        led.stop();
        led.blink(500);
        // motorLeft.rev(150);
        // motorRight.fwd(150);
        break;
      case 'right':
        led.stop();
        led.strobe(300);
        // motorLeft.fwd(150);
        // motorRight.rev(150);
        break;
      default:
        console.log('key not recognized');
    }
  });
});
