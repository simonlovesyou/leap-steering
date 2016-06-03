import AchtungSteering from './AchtungSteering';
import JoystickSteering from './JoystickSteering';
import AngleSteering from './AngleSteering';
import GrabSteering from './GrabSteering';
import leap from 'leapjs';

export default class LeapSteering {
  constructor(left, right, mode, options) {

    if(mode === undefined) {
      throw new Error('A steering mode needs to be provided. Got ' + typeof mode)
    }
    if(typeof mode !== 'string') {
      throw new Error('Steering mode parameter needs to be a string. Got ' + typeof mode);
    }

    this.initialize = this.initialize.bind(this);
    this.start = this.start.bind(this);

    this.mode = mode === 'Achtung'  ? new AchtungSteering(left, right, options.keyToggle, options.keypressDuration) : 
                mode === 'Joystick' ? new JoystickSteering(left, right, options.keyToggle, options.keypressDuration) :
                mode === 'Angle'    ? new AngleSteering(left, right, options) : 
                mode === 'Grab'    ? new GrabSteering(left, right, options) : 
                new Error('No matching mode');

  }

  initialize() {

    console.log("Initializing...");
    this.controller = new leap.Controller({frameEventName: "deviceFrame"});

    console.log("Trying to connect...");
    this.controller.connect();

    this.controller.on('connect', () => {
      console.log("Connected!")
    });
  }

  start(frame) {

    if(this.mode instanceof Error) {
      throw this.mode;
    }

    console.log("Start");
    this.controller.on('frame', this.mode.turn);
  }
}