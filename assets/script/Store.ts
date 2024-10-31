import {
  _decorator,
  AudioClip,
  AudioSource,
  Button,
  Color,
  Component,
  director,
  instantiate,
  Label,
  Node,
  Prefab,
  Sprite,
  Vec3,
} from "cc";
import { buyItem, getAllItems, getMyItem } from "./apis";
import { colorMapping } from "./utils";
const { ccclass, property } = _decorator;

@ccclass("Store")
export class Store extends Component {
  @property({ type: Button })
  backBtn: Button = null;

  @property(Prefab)
  activeItemPrefab: Prefab;

  @property(Prefab)
  itemPrefab: Prefab;

  @property({ type: Node })
  public itemListContainer: Node = null;

  @property({
    type: [AudioSource],
  })
  public audioSource: AudioSource = null!;

  async handleBuyItem(itemId: string) {
    const res = await buyItem(itemId);
    console.log(res);
  }

  onLoad() {
    getAllItems().then((res) => {
      if (this.itemPrefab) {
        res.forEach((item: any) => {
          const userNode = instantiate(this.itemPrefab);
          const starPriceNode = userNode.getChildByName("star-price");
          starPriceNode.getComponent(Label).string = item.startPrice + " Star";
          starPriceNode.addComponent(Button);

          starPriceNode.on(Button.EventType.CLICK, () => {
            // console.log("buy item by star", item);
            (window as any).Telegram.WebApp &&
              (window as any).Telegram.WebApp.close();
            this.handleBuyItem(item.id);
          });
          const strkPriceNode = userNode.getChildByName("strk-price");
          strkPriceNode.getComponent(Label).string =
            item.starknetPrice + " STRK";
          strkPriceNode.addComponent(Button);

          strkPriceNode.on(Button.EventType.CLICK, () => {
            console.log("buy item by STRK", item);
          });

          if (colorMapping[item.color]) {
            userNode.getChildByName("image").getComponent(Sprite).color =
              colorMapping[item.color];
          }

          const userCount = this?.itemListContainer?.children?.length || 0;
          const row = Math.floor(userCount / 2);
          const col = userCount % 2;
          const xOffset = 300;
          const yOffset = 200;
          const newPosition = new Vec3(
            -150 + col * xOffset,
            150 + -row * yOffset,
            0
          );
          userNode.setPosition(newPosition);
          this.itemListContainer.addChild(userNode);
        });
      }
    });

    getMyItem().then((res) => {
      if (this.activeItemPrefab) {
        const userNode = instantiate(this.activeItemPrefab);
        if (colorMapping[res.color]) {
          userNode.getChildByName("image").getComponent(Sprite).color =
            colorMapping[res.color];
        }
        this.node.addChild(userNode);
      }
    });

    this.backBtn.node.on(Button.EventType.CLICK, () => {
      director.loadScene("menu");
    });
    this.audioSource.play();
  }

  start() {
    console.log("starttt");
  }
}
