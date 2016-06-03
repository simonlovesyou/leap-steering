import AbstractSteering from './AbstractSteering';

export default class AchtungSteering extends AbstractSteering {
  constructor(left, right, options) {
    
    super(left, right, options);

    this.pass = true;

    //Bind class functions to the prototype of this class.
    this.turn = this.turn.bind(this);
  }

  turn(rawFrame) {

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
}