import Tool from "./Tools";

export default class Brush extends Tool {
  mouseDown: boolean;
  constructor(canvas: any, socket: any, id: string | null) {
    super(canvas, socket, id ?? "");
    this.mouseDown = false;
    this.listen();
  }
  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler(e: any) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        id: this.id,
        method: "draw",
        figure: {
          type: "finish",
        },
      })
    );
  }
  mouseDownHandler(e: any) {
    this.mouseDown = true;
    this.ctx?.beginPath();
    this.ctx?.moveTo(
      e.clientX - e.target.offsetLeft,
      e.clientY - e.target.offsetTop
    );
  }
  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          id: this.id,
          method: "draw",
          figure: {
            type: "brush",
            x: e.clientX - e.target.offsetLeft,
            y: e.clientY - e.target.offsetTop,
          },
        })
      );
    }
  }
  static draw(ctx: any, x: number, y: number) {
    ctx?.lineTo(x, y);
    ctx?.stroke();
  }
}
