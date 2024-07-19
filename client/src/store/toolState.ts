import { makeAutoObservable } from "mobx";

class ToolState {
  tool: any;
  constructor() {
    this.tool = null;
    makeAutoObservable(this);
  }
  setTool(tool: any) {
    this.tool = tool;
  }
  setFillColor(color: string) {
    this.tool.fillColor = color;
  }
  setStrokeColor(color: string) {
    this.tool.strokeColor = color;
  }
  setLineSize(width: number) {
    if (this.tool) {
      this.tool.lineWidth = width;
    }
  }
}

export default new ToolState();
