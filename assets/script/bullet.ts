import { _decorator, Component } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bullet")
export class Bullet extends Component {
  start() {}

  update(deltaTime: number) {
    let pos = this.node.getPosition();
    let speed = this.node.up.multiplyScalar(10);
    pos.add(speed);
    this.node.setPosition(pos);
  }
}
