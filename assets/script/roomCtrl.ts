import {
  _decorator,
  Button,
  Component,
  director,
  instantiate,
  Label,
  Node,
  Prefab,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("roomCtrl")
export class roomCtrl extends Component {
  // play button
  @property({ type: Button })
  playBtn: Button = null;

  // tank prefab
  @property({ type: Prefab })
  public tank: Prefab = null;

  // user list container
  @property({ type: Node })
  public userListContainer: Node = null;

  onLoad() {
    // render my tank
    this.renderUserList();

    // on click play button
    this.playBtn.node.on(Button.EventType.CLICK, () => {
      (window as any).socketManager.send(
        JSON.stringify({
          event: "startGame",
          data: {
            id: (window as any).myTankId,
          },
        })
      );
    });

    // socket listeners
    (window as any).socketManager.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // on startGame event
      if (data?.event === "startGame") {
        director.loadScene("play");
        return;
      }
      // on leave room event
      if (data?.event === "disconnect") {
        console.log("disconnect", data);
        this.removeUserFromList(data);
      }
      // on joinRoom event
      if (data?.event === "joinRoom") {
        this.tank && this.addUserToList(data);
      }
    };
  }

  addUserToList(data: any) {
    this.userListContainer.removeAllChildren();
    (window as any).userListArr.push(data);
    this.renderUserList();
  }

  removeUserFromList(data: any) {
    this.userListContainer.removeAllChildren();
    const newArr = (window as any).userListArr.filter(
      (item: any) => item.id !== data?.id
    );
    (window as any).userListArr = newArr;
    this.renderUserList();
  }

  renderUserList() {
    (window as any).userListArr.forEach((item: any) => {
      const userNode = instantiate(this.tank);
      const labelNode = new Node();
      const labelComponent = labelNode.addComponent(Label);
      labelComponent.string =
        item?.id?.slice(0, 3) +
        (item?.id === (window as any).myTankId ? " (You)" : "");
      labelNode.setPosition(new Vec3(0, 70, 0));
      userNode.addChild(labelNode);
      userNode.name = item?.id;

      const userCount = this.userListContainer.children.length;
      const row = Math.floor(userCount / 4);
      const col = userCount % 4;
      const xOffset = 150;
      const yOffset = 150;
      const newPosition = new Vec3(
        -220 + col * xOffset,
        100 + -row * yOffset,
        0
      );
      userNode.setPosition(newPosition);
      this.userListContainer.addChild(userNode);
    });
  }
}
