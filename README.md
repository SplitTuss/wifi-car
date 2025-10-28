# Arduino Car
a simple car made with `Arduino Nano 33 BLE` and TypeScript

## board setup
From Arduino IDE make sure you select the right board and port, then upload `StandardFirmataPlus`.

Make sure you select compatible pins for the `PWM` and `dir` (direction).

## quickstart
make sure you're using the right version of JavaScript:
```bash
nvm use
```

install dependencies:
```bash
yarn
```

start script:
```bash
yarn start
```

lint code:
```bash
yarn lint
yarn lint:fix
```