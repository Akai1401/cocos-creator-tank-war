import { _decorator, AudioSource, Button, Component, director } from "cc";

const { ccclass, property } = _decorator;

@ccclass("GameOver")
export class GameOver extends Component {
  @property({ type: Button })
  back: Button = null;

  @property({
    type: [AudioSource],
  })
  public audioSource: AudioSource = null!;

  onLoad() {
    this.back.node.on(Button.EventType.CLICK, () => {
      director.loadScene("menu");
    });
    this.audioSource.play();
  }
}
