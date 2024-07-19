import toolState from "../../store/toolState";
import "./SettingBar.scss";

const SettingBar = () => {
  return (
    <div className="setting-bar">
      <label htmlFor="line-width">Line Size</label>
      <input
        onChange={(e: any) => toolState.setLineSize(e.target.value)}
        style={{ margin: "0 10px" }}
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
      />
    </div>
  );
};
export default SettingBar;
