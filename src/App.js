import React, { useEffect, useState } from "react";

// Vendor
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";

// Custom API
import { signInApi, signUpApi } from "./api/auth";

// Custom Hooks
import useSocket from "./dist/js/hooks/useSocket";

// Custom CSS
import "./App.css";

function App() {
  const [form] = Form.useForm();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const socket = useSocket();

  //Step . Establish socket upon login
  useEffect(() => {
    if (isAuthenticated) {
      socket.connect();
    }
  }, [isAuthenticated]);

  const _authError = (e) => {
    console.log(e);

    if (e.message === "has_account") {
      console.log(e.message);
    } else if (e.message === "no_account") {
      console.log(e.message);
    } else if (e.message === "wrong_password") {
      console.log(e.message);
    } else {
      console.log(e.message);
    }
  };

  const _authSuccess = (e) => {
    setIsAuthenticated(true);
  };

  const actions = {
    getValues: async () => form.getFieldsValue(),
    signin: () => {
      actions.getValues().then(signInApi).then(_authSuccess).catch(_authError);
    },
    signup: () => {
      actions.getValues().then(signUpApi).then(_authSuccess).catch(_authError);
    },
    switchscreen: () => setIsSignIn(!isSignIn),
  };

  return (
    <div className="App">
      <section>
        <Row
          align="middle"
          gutter={[12, 12]}
          justify="center"
          style={{ flexDirection: "column", height: "100vh" }}
        >
          <Col style={{ width: 350 }}>
            <Card title="CleverlyDone">
              <Form form={form} layout="vertical" name="SignIn">
                <Form.Item label="Email" name="email">
                  <Input placeholder="elon@tesla.com" />
                </Form.Item>
                <Form.Item label="Password" name="pasword">
                  <Input placeholder="********" type="password" />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                </Form.Item>
                <Button block onClick={actions.signin}>
                  {isSignIn ? "Sign In" : "Sign Up"}
                </Button>
              </Form>
            </Card>
          </Col>
          <Col style={{ width: 350 }}>
            <Card>
              <div>
                <span style={{ color: "hotpink" }}>
                  {isSignIn
                    ? "New to CleverlyDone?"
                    : "Already have an account?"}
                </span>
                <Button onClick={actions.switchscreen} type="text">
                  {isSignIn ? "Create an account." : "Sign In"}
                </Button>
              </div>
            </Card>
            <div>Websocket is Connected: {`${socket.isConnected}`}</div>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default App;
