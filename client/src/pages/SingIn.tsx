import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SingIn.scss";
import { observer } from "mobx-react-lite";
import userStore from "../store/userStore";

export const SingIn = observer(() => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    userStore.login(email, password);
  };

  const debounce = (callback: any) => {
    let time: any;
    return (...args: any) => {
      clearTimeout(time);
      time = setTimeout(() => {
        callback(...args);
      }, 500);
    };
  };
  const debounceEmail = debounce(handleEmail);
  const debouncePassword = debounce(handlePassword);
  return (
    <div className="background_auth">
      <Form className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={debounceEmail}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={debouncePassword}
          />
        </Form.Group>

        <Button onClick={handleLogin} variant="primary" type="submit">
          Sing In
        </Button>
        <div>
          <a href="/registration">registartion</a>
        </div>
      </Form>
    </div>
  );
});
