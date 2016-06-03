import AbstractSteering from './AbstractSteering';

export default class JoystickSteering extends AbstractSteering {
  constructor(left, right, options) {
    super(left, right, options);

    this.pass = true;

    //Bind class functions to the prototype of this class.
    this.turn = this.turn.bind(this);
  }

  turn(rawFrame) {

    super.calibrateHand(rawFrame, (frame, zeroes) => { 

      let zero = zeroes.palmPosition[0],

          direction = frame.hands[0].palmPosition[0],
          
          key = direction < this.zero ? super.left() : super.right(),
          
          abs = Math.abs,
          min = Math.min;

      if(this.pass) {
        this.pass = false;

        super.keyPress(key, () => {

          let waitTime = abs(min(100 - abs(zero - direction), 150)); 

          console.log("waitTime: " + waitTime);

          setTimeout(() => {
            this.pass = true;
          }, waitTime);
        });
      }
    });
  }
}