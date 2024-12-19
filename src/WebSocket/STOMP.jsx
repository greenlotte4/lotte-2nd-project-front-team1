import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

// const url = "http://localhost:8080/socket"
export const connectStomp = (url, onConnected, onMessageReceived) => {
  const socket = new SockJS(url);
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log("STOMP 연결 성공");

    // 연결 후 호출할 콜백 함수
    if (onConnected) onConnected();
  });

  // 메시지 수신 이벤트 처리
  stompClient.onmessage = (message) => {
    if (onMessageReceived) onMessageReceived(JSON.parse(message.body));
  };
};

export const subscribe = (destination, callback) => {
  if (stompClient && stompClient.connected) {
    return stompClient.subscribe(destination, (message) => {
      callback(JSON.parse(message.body));
    });
  }
};

export const publish = (destination, body) => {
  if (stompClient && stompClient.connected) {
    console.log("발행!");
    stompClient.send(destination, {}, JSON.stringify(body));
  }
};
