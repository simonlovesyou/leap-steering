import AbstractSteering from './AbstractSteering';

let min = Infinity
let max = -Infinity;

export default class AngleSteering extends AbstractSteering {
  constructor(left, right, options) {

    super(left, right, options);

    this.pass = true;
    this.block = false;

    //Bind class functions to the prototype of this class.
    this.turn = this.turn.bind(this);
  }

  turn(rawFrame) {

    super.calibrateHand(rawFrame, (frame, zeroes) => {

      let zero = zeroes.roll,

          handRoll = frame.hands[0].roll(),

          //Normalize roll
          roll = handRoll > zero ? Math.min(handRoll, 1) : Math.max(handRoll, -2)/2,

          key = roll < zero ? super.right() : super.left();

      if(this.pass) {

        this.pass = false;

        let waitTime = Math.floor((Math.abs((1-Math.pow(roll, 2))*200)));

        super.keyPress(key, this.block, () => {

          let wait = Math.floor((Math.abs((1-Math.pow(roll, 2))*200)));

          setTimeout(() => {
            this.pass = true;
          }, wait);
          
        });
      }
    });
  }
}