import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import TimeGrid from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import Modal from "../../modal/Modal";

export default function Calendar() {
  const calendarRef = useRef(null); // FullCalendar 참조
  const [events, setEvents] = useState([]); // 전체 일정 데이터
  const [filteredEvents, setFilteredEvents] = useState([]); // 검색된 일정 데이터
  const [searchDate, setSearchDate] = useState(""); // 날짜 검색 조건
  const [searchTitle, setSearchTitle] = useState(""); // 제목 검색 조건
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태
  const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트
  const [selectedDateEvents, setSelectedDateEvents] = useState([]); // 선택된 날짜의 일정
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    startTime: "00:00",
    endDate: "",
    endTime: "23:59",
    allDay: false,
  });

  // 날짜 클릭 핸들러
  const handleDateClick = (info) => {
    const date = info.dateStr; // 클릭한 날짜
    const filteredEvents = events.filter(
      (event) =>
        new Date(date) >= new Date(event.start.split("T")[0]) &&
        new Date(date) <= new Date(event.end.split("T")[0])
    );
    setSelectedDateEvents(filteredEvents); // 해당 날짜의 일정 저장
    setSelectedEvent(null); // 새 일정 추가 모드 초기화
    setFormData({
      title: "",
      startDate: date,
      startTime: "00:00",
      endDate: date,
      endTime: "23:59",
      allDay: false,
    });
    setModalOpen(true); // 모달 열기
  };

  // 이벤트 클릭 핸들러
  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event) {
      const [startDate, startTime] = event.start.split("T");
      const [endDate, endTime] = event.end.split("T");
      setFormData({
        title: event.title,
        startDate,
        startTime: event.allDay ? "00:00" : startTime,
        endDate,
        endTime: event.allDay ? "23:59" : endTime,
        allDay: event.allDay,
      });
      setSelectedEvent(event);
      setModalOpen(true);
    }
  };

  // 일정 저장 핸들러
  const handleSaveEvent = () => {
    if (!formData.title.trim() || !formData.startDate || !formData.endDate) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    const newEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      title: formData.title,
      start: `${formData.startDate}T${formData.allDay ? "00:00:00" : formData.startTime}`,
      end: `${formData.endDate}T${formData.allDay ? "23:59:59" : formData.endTime}`,
    };

    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id ? newEvent : event
        )
      );
    } else {
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    setModalOpen(false);
  };

  // 일정 삭제 핸들러
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selectedEvent.id)
      );
      setModalOpen(false);
    }
  };

  // 날짜 검색 핸들러
  const handleDateSearch = () => {
    if (!searchDate) {
      alert("검색할 날짜를 입력하세요.");
      return;
    }

    const filtered = events.filter(
      (event) =>
        new Date(searchDate) >= new Date(event.start.split("T")[0]) &&
        new Date(searchDate) <= new Date(event.end.split("T")[0])
    );
    setFilteredEvents(filtered);

    // 캘린더 이동
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(searchDate); // 검색된 날짜로 이동
    }
  };
  // 이벤트 드롭 핸들러
  const handleEventDrop = (info) => {
    const updatedEvent = {
      ...events.find((e) => e.id === info.event.id),
      start: info.event.startStr, // 새로 드롭된 시작 날짜
      end: info.event.endStr, // 새로 드롭된 종료 날짜
    };

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === info.event.id ? updatedEvent : event
      )
    );
  };
  // 제목 검색 핸들러
  const handleTitleSearch = () => {
    if (!searchTitle.trim()) {
      alert("검색할 제목을 입력하세요.");
      return;
    }
    const filtered = events.filter((event) =>
      event.title.includes(searchTitle.trim())
    );
    setFilteredEvents(filtered); // 검색 결과 저장
  };

  // 검색 초기화
  const handleResetSearch = () => {
    setFilteredEvents([]);
    setSearchDate("");
    setSearchTitle("");
  };

  return (
    <div className="calendar-page">
      {/* 검색 섹션 */}
      <div className="search-section">
        <h3>날짜 검색</h3>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={handleDateSearch}>검색</button>
      </div>

      {/* FullCalendar */}
      <FullCalendar
        ref={calendarRef} // FullCalendar 참조
        plugins={[dayGridPlugin, interactionPlugin, TimeGrid, multiMonthPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={filteredEvents.length > 0 ? filteredEvents : events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop} // 드래그 앤 드롭 핸들러 추가
        editable={true}
        className="calendarstyle"
        aspectRatio={1.2} // 가로 대비 세로 비율
        height="600px" // 고정된 전체 높이
      />
      <div className="search-section">
        <h3>제목 검색</h3>
        <input
          type="text"
          placeholder="제목 입력"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button onClick={handleTitleSearch}>검색</button>
        <button onClick={() => setFilteredEvents([])}>초기화</button>
      </div>
      <div className="search-results">
        <h3>검색 결과</h3>
        <ul>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong> - {event.start.split("T")[0]}
                <button
                  onClick={() => {
                    if (calendarRef.current) {
                      const calendarApi = calendarRef.current.getApi();
                      calendarApi.gotoDate(event.start.split("T")[0]); // 해당 날짜로 이동
                    }
                  }}
                >
                  이동
                </button>
              </li>
            ))
          ) : (
            <p>일치하는 일정이 없습니다.</p>
          )}
        </ul>
      </div>
      {/* 모달 */}
      <div className="calendar-modal">
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="일정 관리"
        >
          <h2>등록된 일정</h2>
          <ul>
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event) => (
                <li key={event.id}>
                  <strong>{event.title}</strong> - {event.start.split("T")[1]} ~{" "}
                  {event.end.split("T")[1]}
                  <button onClick={() => handleEventClick({ event })}>
                    수정
                  </button>
                </li>
              ))
            ) : (
              <p>일정이 없습니다.</p>
            )}
          </ul>
          <h2>{selectedEvent ? "일정 수정" : "새 일정 추가"}</h2>
          <input
            type="text"
            name="title"
            placeholder="일정 제목"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <label>시작 날짜</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
          />
          <label>종료 날짜</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          />
          {!formData.allDay && (
            <>
              <label>시작 시간</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
              />
              <label>종료 시간</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
              />
            </>
          )}
          <label>
            <input
              type="checkbox"
              name="allDay"
              checked={formData.allDay}
              onChange={(e) =>
                setFormData({ ...formData, allDay: e.target.checked })
              }
            />
            하루종일
            <br />
          </label>
          <button onClick={handleSaveEvent} className="save-btn">
            {selectedEvent ? "수정 완료" : "추가"}
          </button>
          {selectedEvent && (
            <button onClick={handleDeleteEvent} className="delete-btn">
              삭제
            </button>
          )}
        </Modal>
      </div>
    </div>
  );
}
