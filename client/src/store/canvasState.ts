import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: any | null;
  undoList: Array<any>;
  redoList: Array<any>;
  username: string;
  socket: any;
  sessionid: string | null;
  constructor() {
    makeAutoObservable(this);
    this.undoList = [];
    this.redoList = [];
    this.canvas = null;
    this.username = "";
    this.socket = null;
    this.sessionid = null;
  }
  setCanvas(canvas: any) {
    this.canvas = canvas;
  }
  setSessionId(id: string) {
    this.sessionid = id;
  }
  setSocket(socket: any) {
    this.socket = socket;
  }
  pushToUndo(data: any) {
    this.undoList.push(data);
  }
  pushToRedo(data: any) {
    this.redoList.push(data);
  }
  setUsername(username: string) {
    this.username = username;
  }
  undo() {
    let ctx = this.canvas.getContext("2d");
    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    let ctx = this.canvas.getContext("2d");
    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
