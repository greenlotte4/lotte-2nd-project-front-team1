import { useEffect, useState } from "react";
import MessageAside from "../../../components/app/message/MessageAside";
import MessageBox from "../../../components/app/message/MessageBox";
import { useSidebar } from "../../../hooks/app/UseSidebar";
import AppLayout from "../../../layouts/app/AppLayout";
import "../../../styles/app/message/Message.scss";
import "../../../styles/app/message/MessageAside.scss";

export default function Message() {
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용
  const [selectedChatId, setSelectedChatId] = useState(0);

  return (
    <AppLayout onToggleSidebar={toggleSidebar} thisPage="message">
      <MessageAside
        isVisible={isSidebarVisible}
        onSelectChat={setSelectedChatId}
      />
      <main
        className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
      >
        <MessageBox roomId={JSON.stringify(selectedChatId)} />
      </main>
    </AppLayout>
  );
}
