import {
  _decorator,
  AudioClip,
  AudioSource,
  Button,
  Component,
  director,
  Node,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Store")
export class Store extends Component {
  @property({ type: Button })
  backBtn: Button = null;

  @property({
    type: [AudioSource],
  })
  public audioSource: AudioSource = null!;

  onLoad() {
    this.backBtn.node.on(Button.EventType.CLICK, () => {
      director.loadScene("menu");
    });
    this.audioSource.play();
  }

  start() {
    console.log("starttt");
  }
}
