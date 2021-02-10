import React, { useEffect, useRef, useState } from "react";

function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef({});
  const pingTimerRef = useRef({});

  useEffect(() => {
    //  connect();
    return () => {
      isConnected && disconnect();
      clearTimeout(pingTimerRef.current);
    };
  }, []);

  const _onopen = () => {
    console.log("Web Socket Open");
    setIsConnected(true);
    //this is the message to which lambda function
    //so this can be hello'
    send({ message: "hello" });
    _startPing();
  };

  const _onclose = (e) => {
    console.log("Web Socket Closed");
  };

  const _onerror = (e) => {
    console.log(e);
  };

  const _onmessage = (e) => {
    let payload = "";
    if (e.data.includes("{")) {
      payload = JSON.parse(e.data);
    }
    if (payload.message !== "pong") {
      //update redux state
    }
    console.log(payload);
  };

  const _startPing = () => {
    pingTimerRef.current = setInterval(() => {
      send({ message: "ping" });
    }, 15000);
  };

  const connect = () => {
    socketRef.current = new WebSocket(
      "wss://99txl6l03i.execute-api.us-east-1.amazonaws.com/development"
    );
    socketRef.current.onopen = _onopen;
    socketRef.current.onclose = _onclose;
    socketRef.current.onmessage = _onmessage;
    socketRef.current.onerror = _onerror;
  };

  const disconnect = () => {
    socketRef.current.close();
    setIsConnected(false);
  };

  const send = (props) => {
    socketRef.current.send(JSON.stringify(props));
  };

  return {
    connect,
    disconnect,
    isConnected,
    send,
  };
}
export default useSocket;
