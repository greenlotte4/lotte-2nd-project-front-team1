/*
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 프로젝트 html 작성

    추가내역
    -------------
    2024.11.29 - 세로 길이 조절
*/

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // 드래그 & 드롭 플러그인
import Modal from "../../modal/Modal";

export default function Calendar() {
  const [events, setEvents] = useState([]); // 일정 데이터
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태
  const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
  }); // 입력 폼 데이터

  // 날짜 클릭 핸들러 (새 일정 추가)
  const handleDateClick = (info) => {
    setSelectedEvent(null); // 기존 선택 초기화
    setFormData({ title: "", startDate: info.dateStr, endDate: info.dateStr }); // 기본 날짜 설정
    setModalOpen(true); // 모달 열기
  };

  // 이벤트 클릭 핸들러 (기존 일정 수정)
  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event) {
      setSelectedEvent(event); // 수정할 이벤트 설정
      setFormData({
        title: event.title,
        startDate: event.start,
        endDate: event.end, // 기존 종료 날짜 그대로 사용
      });
      setModalOpen(true); // 모달 열기
    }
  };

  // 드래그 & 드롭 핸들러
  const handleEventDrop = (info) => {
    setEvents(
      events.map((event) =>
        event.id === info.event.id
          ? { ...event, start: info.event.startStr, end: info.event.endStr }
          : event
      )
    );
  };

  // 폼 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 저장 핸들러 (추가 또는 수정)
  const handleSaveEvent = () => {
    if (formData.title.trim() && formData.startDate && formData.endDate) {
      if (selectedEvent) {
        // 일정 수정: 날짜 수정 없이 그대로 저장
        setEvents(
          events.map((event) =>
            event.id === selectedEvent.id
              ? {
                  ...event,
                  title: formData.title,
                  start: formData.startDate,
                  end: formData.endDate,
                }
              : event
          )
        );
      } else {
        // 새로운 일정 추가: 종료 날짜에 1일 추가
        const adjustedEndDate = new Date(formData.endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1); // 종료 날짜에 하루 추가

        setEvents([
          ...events,
          {
            id: Date.now().toString(),
            title: formData.title,
            start: formData.startDate,
            end: adjustedEndDate.toISOString().split("T")[0], // 종료 날짜 설정
          },
        ]);
      }
      setModalOpen(false); // 모달 닫기
    } else {
      alert("모든 필드를 입력해주세요!");
    }
  };

  // 삭제 핸들러
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
      setModalOpen(false); // 모달 닫기
    }
  };

  return (
    <div className="calendar-page">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick} // 날짜 클릭 시 동작
        eventClick={handleEventClick} // 이벤트 클릭 시 동작
        eventDrop={handleEventDrop} // 드래그 & 드롭 동작
        editable={true} // 드래그 & 드롭 활성화
        height="auto"
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="일정 관리"
        >
          <h2>{selectedEvent ? "일정 수정" : "새 일정 추가"}</h2>
          <input
            type="text"
            name="title"
            placeholder="일정 제목"
            value={formData.title}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveEvent}>
            {selectedEvent ? "수정 완료" : "추가"}
          </button>
          {selectedEvent && <button onClick={handleDeleteEvent}>삭제</button>}
          <button onClick={() => setModalOpen(false)}>취소</button>
        </Modal>
      )}
    </div>
  );
}
