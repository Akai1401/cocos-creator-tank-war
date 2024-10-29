import {
  _decorator,
  Button,
  Collider2D,
  Component,
  Contact2DType,
  director,
  EventKeyboard,
  Input,
  input,
  instantiate,
  IPhysics2DContact,
  KeyCode,
  Node,
  Prefab,
  UIOpacity,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Tank")
export class Tank extends Component {
  direction: Vec3 = new Vec3(0, 0, 0);
  angle: Vec3 = new Vec3(0, 0, 0);
  speed: number = 300;

  @property({ type: Button })
  upBtn: Button = null;

  @property({ type: Button })
  downBtn: Button = null;

  @property({ type: Button })
  leftBtn: Button = null;

  @property({ type: Button })
  rightBtn: Button = null;

  @property({ type: Button })
  fireBtn: Button = null;

  @property(Prefab)
  bullet: Prefab;

  private previousPosition: Vec3 = new Vec3();
  public hp: number = 100;

  onBeginContactMyBullet(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (
      selfCollider.node.name === "my_bullet" &&
      otherCollider.node.name === "my_bullet"
    ) {
      return;
    }
    if (
      otherCollider.node.name === "wall" ||
      otherCollider.node.name !== "tank"
    ) {
      // hide bullet
      setTimeout(() => {
        selfCollider.node.destroy();
      }, 1);
    }
  }

  onLoad() {
    this.leftBtn.node.on(
      Node.EventType.TOUCH_START,
      () => {
        this.direction.x = -this.speed;
        this.angle = new Vec3(0, 0, 90);
        return;
      },
      this
    );
    this.rightBtn.node.on(Node.EventType.TOUCH_START, () => {
      this.direction.x = this.speed;
      this.angle = new Vec3(0, 0, -90);
      return;
    });

    this.upBtn.node.on(Node.EventType.TOUCH_START, () => {
      this.direction.y = this.speed;
      this.angle = new Vec3(0, 0, 0);
      return;
    });

    this.downBtn.node.on(Node.EventType.TOUCH_START, () => {
      this.direction.y = -this.speed;
      this.angle = new Vec3(0, 0, 180);
      return;
    });

    this.fireBtn.node.on(Button.EventType.CLICK, () => {
      this.Fire();
      (window as any).socketManager.send(
        JSON.stringify({
          event: "fire",
          data: { id: (window as any).myTankId, angle: this.angle.z },
        })
      );
    });

    this.leftBtn.node.on(Node.EventType.TOUCH_END, () => {
      this.direction = new Vec3(0, 0, 0);
      return;
    });
    this.rightBtn.node.on(Node.EventType.TOUCH_END, () => {
      this.direction = new Vec3(0, 0, 0);
      return;
    });
    this.upBtn.node.on(Node.EventType.TOUCH_END, () => {
      this.direction = new Vec3(0, 0, 0);
      return;
    });
    this.downBtn.node.on(Node.EventType.TOUCH_END, () => {
      this.direction = new Vec3(0, 0, 0);
      return;
    });
  }

  start() {
    console.log("PlayerController start");
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  update(deltaTime: number) {
    let pos = this.node.getPosition();
    pos.add(this.direction.clone().multiplyScalar(deltaTime));
    this.node.setPosition(pos);
    this.node.setRotationFromEuler(this.angle);

    const currentPosition = this.node.getPosition();

    if (!currentPosition.equals(this.previousPosition)) {
      this.sendPosition();
      this.previousPosition.set(currentPosition);
    }

    if (this.hp <= 0) {
      (window as any).socketManager.close();
      setTimeout(() => {
        director.loadScene("gameOver");
      }, 500);
    }
  }

  Fire() {
    let bullet = instantiate(this.bullet);
    const PlayerPos = this.node.getPosition();
    bullet.name = "my_bullet";
    bullet.setPosition(PlayerPos);
    bullet.setRotationFromEuler(this.angle);
    this.node.parent.addChild(bullet);

    let collider = bullet.getComponent(Collider2D);
    if (collider) {
      collider.on(
        Contact2DType.BEGIN_CONTACT,
        this.onBeginContactMyBullet,
        this
      );
    }
  }

  onKeyDown(EventType: EventKeyboard) {
    if (KeyCode.ARROW_LEFT == EventType.keyCode) {
      this.direction.x = -this.speed;
      this.angle = new Vec3(0, 0, 90);
      return;
    }
    if (KeyCode.ARROW_RIGHT == EventType.keyCode) {
      this.direction.x = this.speed;
      this.angle = new Vec3(0, 0, -90);
      return;
    }
    if (KeyCode.ARROW_UP == EventType.keyCode) {
      this.direction.y = this.speed;
      this.angle = new Vec3(0, 0, 0);
      return;
    }
    if (KeyCode.ARROW_DOWN == EventType.keyCode) {
      this.direction.y = -this.speed;
      this.angle = new Vec3(0, 0, 180);
      return;
    }
    if (KeyCode.SPACE == EventType.keyCode) {
      this.Fire();
      (window as any).socketManager.send(
        JSON.stringify({
          event: "fire",
          data: { id: (window as any).myTankId, angle: this.angle.z },
        })
      );
    }
  }

  sendPosition() {
    (window as any).socketManager.send(
      JSON.stringify({
        event: "play",
        data: {
          id: (window as any).myTankId,
          x: this.node.position.x,
          y: this.node.position.y,
          angle: this.angle.z,
        },
      })
    );
  }

  onKeyUp(EventType: EventKeyboard) {
    this.direction = new Vec3(0, 0, 0);
  }
}
