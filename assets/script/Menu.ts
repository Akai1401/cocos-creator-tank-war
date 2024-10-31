import { _decorator, AudioSource, Button, Component, director } from "cc";
import { SOCKET_URL } from "./constants";
import { loginByBot } from "./apis";

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
    this.socket = new WebSocket(SOCKET_URL);

    try {
      const webApp = (window as any).Telegram.WebApp;
      webApp.expand();
      console.log("Telegram.WebApp:", webApp);
      const userData = webApp?.initDataUnsafe?.user;
      const data = {
        auth_date: webApp?.initDataUnsafe?.auth_date,
        query_id: webApp?.initDataUnsafe?.query_id,
        user: JSON.stringify(userData),
        hash: webApp?.initDataUnsafe?.hash,
      };
      console.log("login data:", data);
      (window as any).userData = userData;

      loginByBot(data)
        .then((res) => {
          localStorage.setItem("token", res?.token);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    } catch (error) {
      console.log("error", error);
      // localStorage.setItem(
      //   "token",
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInRlbGVncmFtSWQiOiI1NTE3OTgyNzM2IiwidXNlcm5hbWUiOiJBa2FpXzE0MDEiLCJpYXQiOjE3MzAyMTY3MzcsImV4cCI6MTczMDMwMzEzN30._rw8oLRDWrPfFRJyfkJgdOw7Tp4x3zPa2wdLgr-Y488"
      // );
    }

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
            telegramId: (window as any)?.Telegram?.WebApp
              ? (window as any).Telegram.WebApp?.initDataUnsafe?.user?.id
              : "5517982736",
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
          // (window as any).myTankColor = data?.color;
          director.loadScene("room");
        }
      }
    };
    (window as any).socketManager.onclose = (event) => {
      console.log("Closed connection to server");
    };
  }
}
