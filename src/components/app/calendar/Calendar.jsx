/*
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 프로젝트 html 작성

    추가내역
    -------------
    2024.11.29 - 세로 길이 조절
*/
import FullCalendar from "@fullcalendar/react"; // FullCalendar React component
import dayGridPlugin from "@fullcalendar/daygrid"; // 플러그인
import Modal from "../../modal/Modal";
import { useState } from "react";

export default function Calendar() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className="calendar-page">
      <FullCalendar
        plugins={[dayGridPlugin]} // 필요한 플러그인 추가
        initialView="dayGridMonth" // 초기 화면 설정
        events={[
          // 이벤트 추가
          { title: "Event 1", date: "2024-11-26" },
          { title: "Event 2", date: "2024-11-27" },
        ]}
        height="auto"
      />
      <h1>통합 모달 예시</h1>
      <button onClick={openModal} className="open-modal-btn">
        모달 열기
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="통합 모달">
        <p>이것은 통합 모달의 내용입니다.</p>
        <button onClick={() => alert("추가 기능!")}>추가 버튼</button>
      </Modal>
    </div>
  );
}
