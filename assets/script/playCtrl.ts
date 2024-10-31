import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  director,
  instantiate,
  IPhysics2DContact,
  Label,
  Node,
  Prefab,
  Sprite,
  UIOpacity,
  Vec3,
} from "cc";
import { Tank } from "./tank";
import { colorMapping } from "./utils";

const { ccclass, property } = _decorator;

@ccclass("playCtrl")
export class playCtrl extends Component {
  @property({
    type: Tank,
  })
  public tank: Tank;

  @property({ type: Prefab })
  public tankPrefab: Prefab = null;

  @property({ type: Prefab })
  public bullet: Prefab = null;

  @property({ type: Node })
  public userListContainer: Node = null;

  onBeginContactMyBullet(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (
      otherCollider.node.name === "wall" ||
      otherCollider.node.name === "tank"
    ) {
      // hide bullet
      setTimeout(() => {
        selfCollider.node.destroy();
      }, 1);
    }

    if (otherCollider.node.name === "tank") {
      // reduce HP
      this.tank.hp -= 10;

      (window as any).socketManager.send(
        JSON.stringify({
          event: "reduceHP",
          data: { id: (window as any).myTankId, HP: this.tank.hp },
        })
      );
    }
  }

  onLoad() {
    (window as any).userListArr
      // .filter((item: any) => item?.id !== (window as any).myTankId)
      .forEach((data: any) => {
        // my tank
        if (data.id === (window as any).myTankId) {
          // create name
          const labelNode = new Node();
          const labelComponent = labelNode.addComponent(Label);
          labelComponent.string = data.id.slice(0, 3) + " (You)";
          labelNode.setPosition(new Vec3(0, 70, 0));
          this.tank.node.addChild(labelNode);

          // create HP
          const hpNode = new Node();
          const hpComponent = hpNode.addComponent(Label);
          hpComponent.string = "HP: " + this.tank.hp;
          hpNode.name = "HP";
          hpNode.setPosition(new Vec3(0, 110, 0));
          this.tank.node.addChild(hpNode);

          if (colorMapping[data.color]) {
            this.tank.node.getChildByName("image").getComponent(Sprite).color =
              colorMapping[data.color];
          }
          return;
        }
        // other tank name
        const userNode = instantiate(this.tankPrefab);
        const labelNode = new Node();
        const labelComponent = labelNode.addComponent(Label);
        labelComponent.string = data?.id?.slice(0, 3);
        labelNode.setPosition(new Vec3(0, 70, 0));
        // other tank HP
        const hpNode = new Node();
        const hpComponent = hpNode.addComponent(Label);
        hpComponent.string = "HP: " + this.tank.hp;
        hpNode.name = "HP";
        hpNode.setPosition(new Vec3(0, 110, 0));
        // other tank color
        if (colorMapping[data.color]) {
          userNode.getChildByName("image").getComponent(Sprite).color =
            colorMapping[data.color];
        }

        userNode.addChild(labelNode);
        userNode.addChild(hpNode);
        userNode.name = data?.id;

        this.userListContainer.addChild(userNode);
      });

    (window as any).socketManager.onmessage = (event: any) => {
      // console.log("Message from server:", event.data);
      const data = JSON.parse(event.data);
      if (data?.event === "play") {
        const userNode = this.userListContainer.getChildByName(data.id);
        if (userNode) {
          userNode.setPosition(data.x, data.y);
          userNode.setRotationFromEuler(new Vec3(0, 0, data.angle));
        }
      }
      if (data?.event === "fire") {
        const userNode = this.userListContainer.getChildByName(data.id);
        if (userNode) {
          let bullet = instantiate(this.bullet);
          const PlayerPos = userNode.getPosition();
          if (bullet) {
            bullet.setPosition(PlayerPos);
            bullet.setRotationFromEuler(new Vec3(0, 0, data.angle));
            this.userListContainer.addChild(bullet);
            bullet.name = "enemy_bullet";

            let collider = bullet.getComponent(Collider2D);
            if (collider) {
              collider.on(
                Contact2DType.BEGIN_CONTACT,
                this.onBeginContactMyBullet,
                this
              );
            }
          }
        }
      }
      if (data?.event === "reduceHP") {
        const userNode = this.userListContainer.getChildByName(data.id);
        if (userNode) {
          const hpNode = userNode.getChildByName("HP");
          if (hpNode) {
            hpNode.getComponent(Label).string = "HP: " + data.HP;
          }
        }
        if (data.id === (window as any).myTankId) {
          this.tank.hp = data.HP;
          const hpNode = this.tank.node.getChildByName("HP");
          if (hpNode) {
            hpNode.getComponent(Label).string = "HP: " + data.HP;
          }
        }
        if (data.HP <= 0) {
          this.userListContainer.removeChild(
            this.userListContainer.getChildByName(data.id)
          );
          (window as any).userListArr = (window as any).userListArr.filter(
            (item: any) => item.id !== data.id
          );
        }
      }

      if (data?.event === "disconnect") {
        this.userListContainer.removeChild(
          this.userListContainer.getChildByName(data.id)
        );
        const newUserListArr = (window as any).userListArr.filter(
          (item: any) => item.id !== data.id
        );
        (window as any).userListArr = newUserListArr;

        if ((window as any).userListArr.length === 1) {
          (window as any).socketManager.close();
          setTimeout(() => {
            alert("You win!");
            director.loadScene("menu");
          }, 500);
        }
      }
    };
  }
}
