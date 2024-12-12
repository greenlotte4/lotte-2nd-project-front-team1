import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import TimeGrid from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import Modal from "../../modal/Modal";
import { useSelector } from "react-redux";
import { addevent } from "../../../api/calendar/CalendarAPI";

export default function Calendar({
  events,
  checkedCalendars = [],
  calendars = [],
  onRefetch,
}) {
  const calendarRef = useRef(null);
  const [allEvents, setAllEvents] = useState([]); // 전체 일정 데이터
  const [filteredEvents, setFilteredEvents] = useState([]); // 검색된 일정 데이터
  const [searchDate, setSearchDate] = useState(""); // 날짜 검색 조건
  const [searchTitle, setSearchTitle] = useState(""); // 제목 검색 조건
  const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트
  const [selectedDateEvents, setSelectedDateEvents] = useState([]); // 선택된 날짜의 일정
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const user = useSelector((state) => state.userSlice);
  const calendarEvents = events.map((event) => ({
    id: event.calendarEventId,
    title: event.name,
    start: event.startDate,
    end: event.endDate,
    calendarId: event.calendarId, // 캘린더 ID 포함
    calendarname: event.calendar.name,
  }));
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    startTime: "00:00",
    endDate: "",
    endTime: "23:59",
    allDay: false,
    targetCalendarIds: [], // 다중 선택 달력 ID 저장
  });

  // 날짜 클릭 핸들러
  const handleDateClick = (info) => {
    // 클릭한 날짜
    const clickedDate = new Date(info.dateStr);
    setSelectedDate(info.dateStr);

    // 해당 날짜 일정 필터링
    const dayEvents = calendarEvents.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return clickedDate >= eventStart && clickedDate <= eventEnd;
    });

    setSelectedDateEvents(dayEvents);

    // 새 일정 추가 모드이므로 selectedEvent를 null로 설정하고 formData 초기화
    setSelectedEvent(null);
    setFormData({
      title: "",
      startDate: info.dateStr,
      startTime: "00:00",
      endDate: info.dateStr,
      endTime: "23:59",
      allDay: false,
      targetCalendarIds: [],
    });

    setIsModalOpen(true);
  };
  //삭제
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setAllEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selectedEvent.id)
      );
      setIsModalOpen(false);
      setSelectedEvent(null);
      // formData 초기화도 필요할 수 있음
    }
  };
  const resetForm = () => {
    setFormData({
      title: "",
      startDate: "",
      startTime: "00:00",
      endDate: "",
      endTime: "23:59",
      allDay: false,
      targetCalendarIds: [],
    });
    setSelectedEvent(null);
  };
  // 이벤트 클릭 핸들러
  const handleEventClick = (info) => {
    // 클릭한 이벤트 정보
    const event = info.event;
    const [startDate, startTime] = event.startStr.split("T");
    const [endDate, endTime] = event.endStr.split("T");

    // 해당 이벤트 날짜를 selectedDate로 설정
    setSelectedDate(startDate);

    // 해당 날짜 일정 필터링 (이벤트 클릭이므로 event.start 기준)
    const clickedDate = new Date(startDate);
    const dayEvents = allEvents.filter((e) => {
      const eventStart = new Date(e.start);
      const eventEnd = new Date(e.end);
      return clickedDate >= eventStart && clickedDate <= eventEnd;
    });
    setSelectedDateEvents(dayEvents);

    // 수정 모드이므로 selectedEvent 설정, formData를 해당 이벤트 정보로 채움
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      startDate,
      startTime: event.allDay ? "00:00" : startTime,
      endDate,
      endTime: event.allDay ? "23:59" : endTime,
      allDay: event.allDay,
      targetCalendarIds: [event.extendedProps?.calendarId].filter(Boolean),
    });

    setIsModalOpen(true);
  };

  // 날짜 검색 핸들러
  const handleDateSearch = () => {
    if (!searchDate) {
      alert("검색할 날짜를 입력하세요.");
      return;
    }

    const filtered = allEvents.filter(
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
  // 선택된 날짜 이벤트 수정 핸들러
  const handleDateEventEdit = (dayEvent) => {
    // dayEvent는 selectedDateEvents에서 가져온 raw 이벤트 객체라고 가정
    const [startDate, startTime] = dayEvent.start.split("T");
    const [endDate, endTime] = dayEvent.end.split("T");

    setSelectedEvent(dayEvent);
    setFormData({
      title: dayEvent.title,
      startDate,
      startTime: dayEvent.allDay ? "00:00:00" : startTime,
      endDate,
      endTime: dayEvent.allDay ? "23:59:00" : endTime,
      allDay: dayEvent.allDay,
      targetCalendarIds: [dayEvent.calendarId],
    });
  };
  // 이벤트 드롭 핸들러
  const handleEventDrop = (info) => {
    const updatedEvent = {
      ...allEvents.find((e) => e.id === info.event.id),
      start: info.event.startStr, // 새로 드롭된 시작 날짜
      end: info.event.endStr, // 새로 드롭된 종료 날짜
    };

    setAllEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === info.event.id ? updatedEvent : event
      )
    );
  };

  //일정 추가
  const handleSaveEvent = async () => {
    if (!formData.title.trim() || !formData.startDate || !formData.endDate) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    if (formData.targetCalendarIds.length === 0) {
      alert("이벤트를 추가할 달력을 최소 한 개 이상 선택해주세요!");
      return;
    }

    // startDate, endDate, time 정보 합쳐서 ISO 형태의 문자열 만들기
    const fullStart = `${formData.startDate}T${formData.allDay ? "00:00:00" : formData.startTime}`;
    const fullEnd = `${formData.endDate}T${formData.allDay ? "23:59:00" : formData.endTime}`;

    // eventlist 구성
    const eventlist = formData.targetCalendarIds.map((calendarId) => ({
      calendarId: calendarId,
      assigneeId: user.userid, // 예: Redux나 props에서 가져온 사용자 ID
      name: formData.title,
      content: formData.content || "",
      startDate: fullStart,
      endDate: fullEnd,
      notification: false,
    }));

    try {
      const response = await addevent(eventlist);
      console.log("일정 추가 성공:", response);

      // 일정 추가 후 모달 닫기, 상태 초기화 등 원하는 처리
      setIsModalOpen(false);
      resetForm();
      onRefetch();
    } catch (error) {
      console.error("일정 추가 실패:", error);
    }
  };
  //하루종일 여부 검사
  const handleTimeChange = (key, value) => {
    let updatedForm = { ...formData, [key]: value };

    // 시간 변경 후 allDay 여부 판단
    const fullStart = updatedForm.startTime;
    const fullEnd = updatedForm.endTime;

    // "00:00"과 "23:59" 기준으로 체크
    const isAllDayCondition =
      fullStart === "00:00:00" && fullEnd === "23:59:00";
    updatedForm.allDay = isAllDayCondition;

    setFormData(updatedForm);
  };
  // 제목 검색 핸들러
  const handleTitleSearch = () => {
    if (!searchTitle.trim()) {
      alert("검색할 제목을 입력하세요.");
      return;
    }
    const filtered = allEvents.filter((event) =>
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
        events={calendarEvents}
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
          onClose={() => setIsModalOpen(false)}
          title="일정 관리"
        >
          <h3>이벤트를 추가할 달력 선택</h3>
          {calendars
            .filter((cal) => checkedCalendars.includes(cal.calendarId))
            .map((cal) => (
              <div key={cal.calendarId}>
                <label>
                  <input
                    type="checkbox"
                    name="targetCalendars"
                    value={cal.calendarId}
                    checked={formData.targetCalendarIds.includes(
                      cal.calendarId
                    )}
                    onChange={(e) => {
                      const selectedId = cal.calendarId;
                      let updatedIds = [...formData.targetCalendarIds];
                      if (e.target.checked) {
                        // 체크되면 배열에 추가
                        updatedIds.push(selectedId);
                      } else {
                        // 체크 해제면 배열에서 제거
                        updatedIds = updatedIds.filter(
                          (id) => id !== selectedId
                        );
                      }
                      setFormData({
                        ...formData,
                        targetCalendarIds: updatedIds,
                      });
                    }}
                  />
                  {cal.name}
                </label>
              </div>
            ))}

          <h2>{selectedDate} 일정</h2>
          <h3>선택된 캘린더</h3>

          <h3>해당 날짜의 다른 일정</h3>
          <ul>
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((dayEvent) => {
                const [evtDate, evtTimeStart] = dayEvent.start.split("T");
                const [, evtTimeEnd] = dayEvent.end.split("T");
                return (
                  <li key={dayEvent.id}>
                    <strong>{dayEvent.title}</strong> - {evtTimeStart} ~{" "}
                    {evtTimeEnd}
                    <button onClick={() => handleDateEventEdit(dayEvent)}>
                      수정
                    </button>
                  </li>
                );
              })
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
                step="600"
                value={formData.startTime}
                onChange={(e) => handleTimeChange("startTime", e.target.value)}
              />
              <label>종료 시간</label>
              <input
                type="time"
                name="endTime"
                step="600"
                value={formData.endTime}
                onChange={(e) => handleTimeChange("endTime", e.target.value)}
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
