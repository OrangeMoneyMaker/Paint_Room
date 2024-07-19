import { useEffect, useRef, useState } from "react";
import "./Canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Canvas = observer(() => {
  const canvasRef = useRef<any>();
  const inputRef = useRef<any>();
  const socket = useRef<any>(null);
  const params = useParams();
  const [modalIsShow, setModalIsShow] = useState<boolean>(true);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.username && params.id) {
      socket.current = new WebSocket("ws://localhost:8080");
      canvasState.setSocket(socket.current);
      canvasState.setSessionId(params.id);
      toolState.setTool(
        new Brush(canvasRef.current, socket.current, params.id)
      );
      socket.current.onopen = () => {
        const message = {
          id: params.id,
          username: canvasState.username,
          method: "connection",
        };
        socket.current.send(JSON.stringify(message));
      };

      socket.current.onmessage = (event: any) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case "connection":
            console.log(`Users ${msg.username}is connected!`);
            break;
          case "draw":
            drawHandler(msg);
            break;
        }
      };

      return () => {
        socket.current.close();
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg: any) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case "finish":
        ctx.beginPath();
        break;
    }
  };

  const mouseDownHandler = function () {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const userNameHandler = () => {
    canvasState.setUsername(inputRef.current.value);
    if (inputRef.current.value) {
      setModalIsShow(false);
    }
  };

  return (
    <div className="canvas">
      <Modal show={modalIsShow} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Enter username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input ref={inputRef} type="text" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => userNameHandler()}>
            Enter
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef}
        width={600}
        height={400}
      />
    </div>
  );
});

export default Canvas;
