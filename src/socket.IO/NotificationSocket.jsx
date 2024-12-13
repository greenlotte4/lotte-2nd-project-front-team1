// NotificationSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";

// 소켓 연결을 담당하는 컴포넌트
function NotificationSocket({ onAlertReceived }) {
  useEffect(() => {
    // 현재 환경에 맞는 소켓 서버 주소 선택
    const socketUrl = window.location.hostname === "localhost" 
      ? "http://localhost:8080" 
      : "https://hubflow.store";

    // 소켓 인스턴스 생성
    const socket = io(socketUrl);

    // 알림 수신 이벤트 리스너 등록
    const handleAlert = (data) => {
      console.log("알림 수신:", data);
      onAlertReceived(data); // 부모 컴포넌트에 알림 전달
    };

    socket.on("alert", handleAlert);

    // 클린업: 소켓 연결 해제 및 이벤트 리스너 제거
    return () => {
      socket.off("alert", handleAlert);
      socket.disconnect();
    };
  }, [onAlertReceived]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}

export default NotificationSocket;
