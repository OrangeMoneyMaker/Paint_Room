import Brush from "./Brush";

export default class Eraser extends Brush {
  constructor(canvas: any, socket: any, id: string | null) {
    super(canvas, socket, id ?? "");
  }

  draw(x: number, y: number) {
    this.ctx?.lineTo(x, y);
    this.ctx.strokeStyle = "white";
    this.ctx?.stroke();
  }
}
