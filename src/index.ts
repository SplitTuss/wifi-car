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

  const stopMotors = () => {
    motorLeft.stop();
    motorRight.stop();
  };

  const goForward = () => {
    stopMotors();
    motorRight.fwd(150);
    motorLeft.fwd(150);
  };

  const stopOrReverse = () => {
    if (motorLeft.isOn || motorRight.isOn) {
      stopMotors();
    } else {
      motorLeft.rev(150);
      motorRight.rev(150);
    }
  };

  const turnLeft = () => {
    stopMotors();
    motorLeft.rev(150);
    motorRight.fwd(250);
  };

  const turnRight = () => {
    stopMotors();
    motorLeft.fwd(250);
    motorRight.rev(150);
  };

  keypress(process.stdin);

  process.stdin.on('keypress', (_, key) => {
    switch (key.name) {
      case 'up':
        led.stop();
        led.on();
        goForward();
        break;
      case 'down':
        led.stop();
        led.off();
        stopOrReverse();
        break;
      case 'left':
        led.stop();
        led.blink(500);
        turnLeft();
        break;
      case 'right':
        led.stop();
        led.strobe(300);
        turnRight();
        break;
      case 'escape':
        process.exit(0);
      default:
        console.log('key not recognized');
    }
  });
});
