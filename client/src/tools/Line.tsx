import Tool from "./Tools";

export default class Line extends Tool {
  mouseDown: boolean;
  saved: any;
  currentX: number;
  currentY: number;
  constructor(canvas: any, socket: any, id: string | null) {
    super(canvas, socket, id ?? "");
    this.mouseDown = false;
    this.currentX = 0;
    this.currentY = 0;
    this.listen();
  }
  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler(e: any) {
    this.mouseDown = false;
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true;
    this.currentX = e.clientX - e.target.offsetLeft;
    this.currentY = e.clientY - e.target.offsetTop;
    this.ctx?.beginPath();
    this.ctx?.moveTo(this.currentX, this.currentY);
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      this.draw(
        e.clientX - e.target.offsetLeft,
        e.clientY - e.target.offsetTop
      );
    }
  }

  draw(x: number, y: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = async () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx?.moveTo(this.currentX, this.currentY);
      this.ctx?.lineTo(x, y);
      this.ctx?.stroke();
    };
  }
}
