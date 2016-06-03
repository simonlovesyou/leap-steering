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

          //console.log(roll);

          let waitTime = Math.floor((Math.abs((1-Math.pow(roll, 2))*200)));

          console.log("waitTime: " + waitTime)

          //this.block = waitTime > 190;

          let wait = /*this.block || waitTime < 10 ? 0 :*/ waitTime

          setTimeout(() => {
            this.pass = true;
          }, wait);
          
        });
      }
    });
  }
}

/*turn(rawFrame) {

    super.calibrateHand(rawFrame, (frame, zeroes) => {

      let zero = zeroes.handDirection[0];

      let direction = frame.hands[0].direction[0] || undefined;

      let key = direction < this.zero ? super.left() : super.right();

      if(this.pass) {

        this.pass = false;
        super.keyPress(key, () => {

          let waitTime = Math.floor((Math.abs((1-Math.pow(direction, 2))*200)));

          console.log("waitTime: " + waitTime)

          let wait = waitTime < 45 ? 0 : waitTime

          setTimeout(() => {
            this.pass = true;
          }, wait);
          
        });
      }
    });
  }
*/