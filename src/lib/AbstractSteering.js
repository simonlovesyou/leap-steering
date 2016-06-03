import robot from 'robotjs';

export default class AbstractSteering {
  constructor(left, right, options = {}) {
    if(left === undefined || right === undefined) {
      throw new Error('Left and right turn keys needs to be specified');
    } 
    this._leftKey = left;
    this._rightKey = right;

    this.keypressDuration = options.keypressDuration || 40;
    this.turn = options.turn || this.turn;
    this.keyPress = options.keyPress || this.keyPress;
    this.keyToggle = options.keyToggle || robot.keyToggle;

    this.calibratePosThreshold = 2;
    this.calibrateDirectionThreshold = 0.02;
    this.calibrateRollThreshold = 0.02;
    this.zero = 0;
    this.stableFrameCount = 0;
    this.stableFramesRequired = 25;
    this.block = false;

    //Bind class functions to the prototype of this class.
    this.turn = this.turn.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    this.calibrateHand = this.calibrateHand.bind(this);


  }

  turn() {
    throw new Error('The turn function needs to be implemented.');
  }

  left() {
    return this._leftKey;
  }

  right() {
    return this._rightKey;
  }

  calibrateHand(frame, cb) {
    
    if (frame.hands.length > 0) {
      //If a stable frame already as been captured.
      if(this.stableFrame) {

        let zero = {
          palmPosition: this.stableFrame.hands[0].palmPosition,
          handDirection: this.stableFrame.hands[0].direction,
          roll: this.stableFrame.hands[0].roll(),
          stableFrame: this.stableFrame
        }
        //Return with the callback.
        return cb(frame, zero);
      }

      //Get the palm position from the frame
      let pos = frame.hands[0].palmPosition,
          
      //Get the direction of the hand from the frame
          dir = frame.hands[0].direction,

      //Get the last known position of the hand
          lastPos = this.lastPosition  || [Infinity, Infinity, Infinity],
          
          lastDir = this.lastDirection || [Infinity, Infinity, Infinity],

      //Retrieve the thresholds
          posThresh = this.calibratePosThreshold,
          dirThresh = this.calibrateDirectionThreshold,

      //Check if the palm position is stable
          stablePos = pos.every((dim, i) => (dim >= lastPos[i] - posThresh && dim <= lastPos[i] + posThresh)),
      //Check if the direction of the hand is stable
          stableDir = dir.every((dim, i) => (dim >= lastDir[i] - dirThresh && dim <= lastDir[i] + dirThresh));

      if (stablePos && stableDir) {
        //Count the number of frames with a stable hand
        console.log(this.stableFrameCount);
        this.stableFrameCount++;
      } else {
        //Restart counting
        this.stableFrameCount = 0;
      }

      //If the number of stable frames have met the requirement.
      if (this.stableFrameCount === this.stableFramesRequired) {
        //Save the stable frame to use as reference.
        this.stableFrame = frame;

        robot.keyToggle('up', 'down');

        console.log("Stable!");
      }

      this.lastPosition = pos;
      this.lastDirection = dir;

    //If the hand is lost, reset the stable hand positions
    } else {
      this.stableFrameCount = 0;
      this.stableFrame = null
    }

  }

  block(value) {
    this.block = value;
  }

  keyPress(key, block, cb) {

    //If block parameter is omitted.
    if(typeof block === 'function' && cb === undefined) {
      cb = block;
      block = undefined;
    }

    //console.log("Blocking: " + block);

    //console.log(block);

    let keyToggle = block === false || block === undefined ? this.keyToggle : () => {};

    //let keyToggle = this.keyToggle;

    //console.log(keyToggle);

    keyToggle(key, 'down');
    //console.log("Pressing down %s", key);

    setTimeout(() => {
          //console.log("Realising %s", key);
          keyToggle(key, 'up');
          cb();
      }, this.keypressDuration);
  }
}