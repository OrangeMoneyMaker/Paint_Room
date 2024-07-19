import Tool from "./Tools";

export default class Circle extends Tool {
  mouseDown: boolean;
  startX: number;
  startY: number;
  saved: any;
  constructor(canvas: any, socket: any, id: string | null) {
    super(canvas, socket, id ?? "");
    this.mouseDown = false;
    this.startX = 0;
    this.startY = 0;
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
    this.startX = e.clientX - e.target.offsetLeft;
    this.startY = e.clientY - e.target.offsetTop;
    this.ctx?.beginPath();
    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      let currentX = e.clientX - e.target.offsetLeft;
      let currentY = e.clientY - e.target.offsetTop;
      let width = currentX - this.startX;
      let heigth = currentY - this.startY;
      this.draw(this.startX, this.startY, width, heigth);
    }
  }

  draw(x: number, y: number, width: number, height: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(
        x,
        y,
        Math.sqrt(width * width + height * height),
        0,
        2 * Math.PI
      );
      this.ctx.stroke();
    };
    // img.onload = () => {
    //   this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //   this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    //   this.ctx.beginPath();
    //   this.ctx.rect(x, y, width, height);
    //   this.ctx.stroke();
    // };
  }
}
