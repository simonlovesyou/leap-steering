import AbstractSteering from './AbstractSteering';

export default class GrabSteering extends AbstractSteering {
  constructor(left, right, options) {
    
    super(left, right, options);

    this.pass = true;

    //Bind class functions to the prototype of this class.
    this.turn = this.turn.bind(this);
  }

  turn(rawFrame) {

    super.calibrateHand(rawFrame, (frame, zeroes) => {

      let zero = 0;

      let grab = frame.hands[0].grabStrength;

      let key = grab < 0.5 ? super.left() : super.right();

      if(this.pass) {

        this.pass = false;
        super.keyPress(key, () => {

          grab = grab < 0.5 ? grab : grab - 0.5;

          let waitTime = Math.floor((Math.abs((0.5-Math.pow(grab, 2))*200)));

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