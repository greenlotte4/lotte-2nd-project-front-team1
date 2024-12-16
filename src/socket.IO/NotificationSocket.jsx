// NotificationSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";

// 알림을 처리하는 소켓 컴포넌트
function NotificationSocket({ onAlertReceived }) {
  useEffect(() => {
    const socketUrl = window.location.hostname === "localhost"
      ? "http://localhost:8081"
      : "https://hubflow.store";
    console.log("알림 소켓 연결");

    const socket = io(socketUrl);

    const handleAlert = (data) => {
      console.log("알림 수신:", data);
      onAlertReceived(data); // 부모 컴포넌트에 알림 전달
    };

    socket.on("alert", handleAlert);

    // 클린업
    return () => {
      socket.off("alert", handleAlert);
      socket.disconnect();
    };
  }, [onAlertReceived]);

  return null; // UI를 렌더링하지 않음
}

// 메시지를 처리하는 소켓 컴포넌트
function MessageSocket({ onMessageReceived }) {
  useEffect(() => {
    const socketUrl = window.location.hostname === "localhost"
      ? "http://localhost:8081"
      : "https://hubflow.store";
    console.log("메시지 소켓 연결");

    const socket = io(socketUrl);

    const handleMessage = (data) => {
      console.log("메시지 수신:", data);
      onMessageReceived(data); // 부모 컴포넌트에 메시지 전달
    };

    socket.on("message", handleMessage);

    // 클린업
    return () => {
      socket.off("message", handleMessage);
      socket.disconnect();
    };
  }, [onMessageReceived]);

  return null; // UI를 렌더링하지 않음
}

export { NotificationSocket, MessageSocket };
