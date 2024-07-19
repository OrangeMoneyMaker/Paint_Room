import { Spinner } from "react-bootstrap";

export const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" />
    </div>
  );
};
