import { _decorator, AudioSource, Button, Component, director } from "cc";

const { ccclass, property } = _decorator;

@ccclass("Menu")
export class Menu extends Component {
  // multiPlayer button
  @property({ type: Button })
  multiPlayer: Button = null;

  // store button
  @property({ type: Button })
  store: Button = null;

  // audio source
  @property({
    type: [AudioSource],
  })
  public audioSource: AudioSource = null!;

  // websocket
  socket: WebSocket = null;

  onLoad() {
    // play background music
    this.audioSource.play();
    // init websocket connection
    this.socket = new WebSocket("ws://a1ac-27-72-104-163.ngrok-free.app");

    // global variable
    (window as any).socketManager = this.socket;
    (window as any).userListArr = [];

    // on click multiplayer button
    this.multiPlayer.node.on(Button.EventType.CLICK, () => {
      (window as any).socketManager.send(
        JSON.stringify({
          event: "joinRoom",
          data: {
            id: (window as any).myTankId,
          },
        })
      );
    });
    // on click store button
    this.store.node.on(Button.EventType.CLICK, () => {
      director.loadScene("store");
    });

    // socket listeners
    (window as any).socketManager.onopen = (event) => {
      console.log("Connected to server");
    };
    (window as any).socketManager.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // on connect event
      if (data?.event === "connect") {
        // set myTankId
        if (data?.type === "ME") (window as any).myTankId = data?.id;
      }
      // on joinRoom event
      if (data?.event === "joinRoom") {
        // check if the game is already started
        if (data?.gameState === "playing") {
          alert("Please wait for the current game to finish");
          return;
        } else {
          (window as any).userListArr.push(data);
          director.loadScene("room");
        }
      }
    };
    (window as any).socketManager.onclose = (event) => {
      console.log("Closed connection to server");
    };
  }
}
