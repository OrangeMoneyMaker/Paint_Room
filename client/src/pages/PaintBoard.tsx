import Canvas from "../components/canvas/Canvas";
import SettingBar from "../components/settingBar/SettingBar";
import Toolbar from "../components/toolbar/Toolbar";

const PaintBoard = () => {
  return (
    <>
      <Toolbar />
      <SettingBar />
      <Canvas />
    </>
  );
};

export default PaintBoard;
