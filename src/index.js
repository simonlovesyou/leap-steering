import LeapSteering from './lib/';
import robot from 'robotjs';

const test = process.env.NODE_ENV ? (process.env.NODE_ENV.match(/test/) ? true : false) : false;


let options = {
  keypressDuration: 40,
  keyToggle: test ? () => {} : robot.keyToggle
}

let steering = new LeapSteering('left', 'right', process.argv[2] || 'Achtung', options);

steering.initialize();
steering.start();