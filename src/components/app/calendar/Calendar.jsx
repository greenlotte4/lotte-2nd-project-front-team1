// Calendar.jsx
import { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import Modal from "../../modal/Modal";
import { useSelector } from "react-redux";
import {
  addevent,
  deleteevent,
  editevent,
} from "../../../api/calendar/CalendarAPI";
import { addDays } from "@fullcalendar/core/internal";
import { publish } from "../../../WebSocket/STOMP";

// Helper 함수: 날짜 포맷팅 (YYYY-MM-DD)
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper 함수: 시간 포맷팅 (HH:MM)
const formatTime = (date) => {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Helper 함수: All-Day 이벤트의 종료 날짜 조정
const adjustEndDate = (end, allDay) => {
  if (!end) {
    return {
      endDate: "",
      endTime: allDay ? "23:59" : "23:59",
    };
  }

  if (allDay) {
    const adjustedEnd = new Date(end);
    adjustedEnd.setDate(adjustedEnd.getDate() - 1);
    return {
      endDate: formatDate(adjustedEnd),
      endTime: "23:59",
    };
  } else {
    return {
      endDate: formatDate(end),
      endTime: formatTime(end),
    };
  }
};

// Helper 함수: 이벤트 데이터 처리
const processEvent = (event) => {
  const start = event.start;
  const end = event.end;
  const allDay = event.allDay;

  const startDate = formatDate(start);
  const startTime = allDay ? "00:00" : formatTime(start);

  const { endDate, endTime } = adjustEndDate(end, allDay);

  return {
    title: event.title,
    startDate,
    startTime,
    endDate,
    endTime,
    allDay,
    calendarId: event.extendedProps?.calendarId,
    content: event.extendedProps?.content || "",
  };
};

export default function Calendar({
  events = [], // 기본값 설정
  checkedCalendars = [],
  calendars = [],
  onRefetch,
}) {
  const calendarRef = useRef(null);
  const [filteredEvents, setFilteredEvents] = useState([]); // 검색된 일정 데이터
  const [searchDate, setSearchDate] = useState(""); // 날짜 검색 조건
  const [searchTitle, setSearchTitle] = useState(""); // 제목 검색 조건
  const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트
  const [selectedDateEvents, setSelectedDateEvents] = useState([]); // 선택된 날짜의 일정
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const user = useSelector((state) => state.userSlice);

  // FullCalendar에 맞게 이벤트 데이터 매핑 및 allDay 사용
  const calendarEvents = (events || []).map((event) => ({
    id: event.calendarEventId,
    title: event.name,
    start: event.startDate,
    end: event.allDay
      ? addDays(new Date(event.endDate), 1).toISOString().split("T")[0]
      : event.endDate,
    allDay: event.allDay,
    calendarId: event.calendarId,
    calendarname: event.calendarname,
    content: event.content || "",
  }));

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    startTime: "00:00",
    endDate: "",
    endTime: "23:59",
    allDay: false,
    targetCalendarIds: [], // 다중 선택 달력 ID 저장
    content: "", // content 필드 추가
  });

  // 날짜 클릭 핸들러: 새 일정 추가
  const handleDateClick = (info) => {
    const clickedDate = new Date(info.dateStr);
    setSelectedDate(info.dateStr);

    const dayEvents = events.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
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
      content: "",
    });

    setIsModalOpen(true);
  };

  // 이벤트 클릭 핸들러
  const handleEventClick = (info) => {
    const event = info.event;

    // 이벤트 데이터 로깅

    // 이벤트의 start과 end가 정의되어 있는지 확인
    if (!event.start) {
      console.error("Event start is undefined");
      return;
    }

    const eventData = processEvent(event);

    setSelectedDate(
      eventData.allDay
        ? eventData.startDate
        : `${eventData.startDate} ${eventData.startTime}`
    );
    const clickedDate = new Date(eventData.startDate);
    const dayEvents = events.filter((e) => {
      const eventStart = new Date(e.startDate);
      const eventEnd = new Date(e.endDate);
      return clickedDate >= eventStart && clickedDate <= eventEnd;
    });
    setSelectedDateEvents(dayEvents);
    setSelectedEvent(event);
    setFormData({
      title: eventData.title,
      startDate: eventData.startDate,
      startTime: eventData.startTime,
      endDate: eventData.endDate,
      endTime: eventData.endTime,
      allDay: eventData.allDay,
      targetCalendarIds: [eventData.calendarId].filter(Boolean),
      content: eventData.content,
    });

    setIsModalOpen(true);
  };

  // 날짜 검색 핸들러
  const handleDateSearch = () => {
    if (!searchDate) {
      alert("검색할 날짜를 입력하세요.");
      return;
    }

    const filtered = events.filter(
      (event) =>
        new Date(searchDate) >= new Date(event.startDate.split("T")[0]) &&
        new Date(searchDate) <= new Date(event.endDate.split("T")[0])
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
    setSelectedEvent(dayEvent);
    setFormData({
      title: dayEvent.name,
      startDate: dayEvent.startDate.split("T")[0], // YYYY-MM-DD 형식 추출
      endDate: dayEvent.endDate.split("T")[0],
      startTime: dayEvent.allDay
        ? "00:00"
        : dayEvent.startDate.split("T")[1].substring(0, 5),
      endTime: dayEvent.allDay
        ? "23:59"
        : dayEvent.endDate.split("T")[1].substring(0, 5),
      allDay: dayEvent.allDay,
      targetCalendarIds: [dayEvent.calendarId], // 수정할 달력 ID 설정
      content: dayEvent.content || "",
    });
    setIsModalOpen(true); // 모달 열기
  };

  // 이벤트 드롭 핸들러
  const handleEventDrop = async (info) => {
    const event = info.event;
    const eventId = event.id;

    const eventData = processEvent(event);

    // 날짜 및 시간 유효성 검증
    const startDateTime = new Date(
      `${eventData.startDate}T${eventData.allDay ? "00:00" : eventData.startTime}`
    );
    const endDateTime = new Date(
      `${eventData.endDate}T${eventData.allDay ? "23:59" : eventData.endTime}`
    );

    if (startDateTime > endDateTime) {
      alert("시작 날짜 및 시간이 종료 날짜 및 시간보다 늦을 수 없습니다.");
      info.revert();
      return;
    }

    // 업데이트할 이벤트 데이터 구성
    const updatedEvent = {
      calendarEventId: parseInt(eventId, 10),
      name: eventData.title,
      startDate: `${eventData.startDate}T${eventData.allDay ? "00:00:00" : `${eventData.startTime}:00`}`,
      endDate: `${eventData.endDate}T${eventData.allDay ? "23:59:00" : `${eventData.endTime}:00`}`,
      allDay: eventData.allDay,
      content: eventData.content,
      calendarId: eventData.calendarId,
    };

    // 백엔드 API 호출하여 이벤트 업데이트
    try {
      const response = await editevent([updatedEvent]); // editevent는 배열을 받는 것으로 가정
      publish("/pub/addevent/send", [updatedEvent]);
      console.log("이벤트 업데이트 성공:", response);
      alert("이벤트가 성공적으로 업데이트되었습니다.");

      // 필요 시, 상위 컴포넌트에 업데이트를 알리기 위해 onRefetch 호출
      if (onRefetch) {
        onRefetch();
      }
    } catch (error) {
      console.error("이벤트 업데이트 실패:", error);
      alert("이벤트 업데이트에 실패했습니다. 다시 시도해주세요.");
      // 오류 발생 시 원래 위치로 되돌림
      info.revert();
    }
  };

  // 일정 추가 핸들러
  const handleSaveEvent = async () => {
    if (!formData.title.trim() || !formData.startDate || !formData.endDate) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    if (formData.targetCalendarIds.length === 0) {
      alert("이벤트를 추가할 달력을 최소 한 개 이상 선택해주세요!");
      return;
    }

    // 날짜 및 시간 유효성 검증
    const startDateTime = new Date(
      `${formData.startDate}T${formData.allDay ? "00:00" : formData.startTime}`
    );
    const endDateTime = new Date(
      `${formData.endDate}T${formData.allDay ? "23:59" : formData.endTime}`
    );

    if (startDateTime > endDateTime) {
      alert("시작 날짜 및 시간이 종료 날짜 및 시간보다 늦을 수 없습니다.");
      return;
    }

    // 'HH:MM' 형식을 'HH:MM:00'으로 변환하여 ISO 형식 문자열 생성
    const fullStart = `${formData.startDate}T${
      formData.allDay ? "00:00:00" : `${formData.startTime}:00`
    }`;
    const fullEnd = `${formData.endDate}T${
      formData.allDay ? "23:59:00" : `${formData.endTime}:00`
    }`;

    let eventlist;

    if (selectedEvent) {
      // **수정 모드**
      eventlist = formData.targetCalendarIds.map((calendarId) => ({
        calendarEventId: selectedEvent.id, // 기존 이벤트 ID
        calendarId: calendarId,
        assigneeId: user.userid, // Redux나 props에서 가져온 사용자 ID
        name: formData.title,
        content: formData.content || "",
        startDate: fullStart,
        endDate: fullEnd,
        allDay: formData.allDay,
        notification: false,
      }));
    } else {
      // **추가 모드**
      eventlist = formData.targetCalendarIds.map((calendarId) => ({
        calendarId: calendarId,
        assigneeId: user.userid, // Redux나 props에서 가져온 사용자 ID
        name: formData.title,
        content: formData.content || "",
        startDate: fullStart,
        endDate: fullEnd,
        allDay: formData.allDay,
        notification: false,
      }));
    }

    try {
      if (selectedEvent) {
        // **수정 시 editevent 함수 호출**
        const response = await editevent(eventlist);
        console.log("일정 수정 성공:", response);
        console.log("eventlist1234", eventlist);
        publish("/pub/addevent/send", eventlist);
        alert("일정이 성공적으로 수정되었습니다.");
      } else {
        // **추가 시 addevent 함수 호출**
        const response = await addevent(eventlist);
        console.log("일정 추가 성공:", response);
        console.log("eventlist1234", eventlist);
        publish("/pub/addevent/send", eventlist);
        alert("일정이 성공적으로 추가되었습니다.");
      }

      // 일정 추가 후 모달 닫기, 상태 초기화 등 원하는 처리
      setIsModalOpen(false);
      onRefetch(); // 상위 컴포넌트에 데이터 재요청
    } catch (error) {
      console.error(
        selectedEvent ? "일정 수정 실패:" : "일정 추가 실패:",
        error
      );
      alert(
        selectedEvent
          ? "일정 수정에 실패했습니다. 다시 시도해주세요."
          : "일정 추가에 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  // 하루종일 여부 검사 및 시간 변경 핸들러
  const handleTimeChange = (key, value) => {
    let updatedForm = { ...formData, [key]: value };

    // "HH:MM" 형식으로 분리
    const [hours, minutes] = value.split(":").map(Number);

    // "00:00"과 "23:59" 기준으로 체크하여 allDay 여부 판단
    const isAllDayCondition =
      key === "startTime" && value === "00:00" && formData.endTime === "23:59";
    updatedForm.allDay = isAllDayCondition;

    setFormData(updatedForm);
  };

  // 제목 검색 핸들러
  const handleTitleSearch = () => {
    if (!searchTitle.trim()) {
      alert("검색할 제목을 입력하세요.");
      return;
    }
    const filtered = events.filter((event) =>
      event.name.includes(searchTitle.trim())
    );
    setFilteredEvents(filtered); // 검색 결과 저장
  };

  // 검색 초기화
  const handleResetSearch = () => {
    setFilteredEvents([]);
    setSearchDate("");
    setSearchTitle("");
  };

  // 이벤트 삭제 핸들러
  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    const confirmDelete = window.confirm("정말로 이 일정을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const calendarId = selectedEvent.extendedProps?.calendarId;
      await deleteevent(selectedEvent.id);
      const eventlist = [
        {
          calendarId: calendarId,
          calendarEventId: selectedEvent.id,
          name: selectedEvent.title,
          startDate: selectedEvent.start.toISOString().slice(0, 16),
          endDate: selectedEvent.end.toISOString().slice(0, 16),
          // 필요한 필드 추가
        },
      ];

      publish("/pub/addevent/send", eventlist);
      alert("일정이 성공적으로 삭제되었습니다.");

      // 일정 삭제 후 모달 닫기 및 상태 초기화
      setIsModalOpen(false);
      setFormData({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "00:00",
        endTime: "23:59",
        allDay: false,
        targetCalendarIds: [],
        content: "",
      });
      setSelectedEvent(null);
      onRefetch(); // 상위 컴포넌트에 데이터 재요청
    } catch (error) {
      console.error("일정 삭제 실패:", error);
      alert("일정 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="calendar-page">
      {/* 날짜 검색 섹션 */}
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
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          multiMonthPlugin,
        ]}
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
        timeZone="local" // 로컬 시간대 설정
      />

      {/* 제목 검색 섹션 */}
      <div className="search-section">
        <h3>제목 검색</h3>
        <input
          type="text"
          placeholder="제목 입력"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button onClick={handleTitleSearch}>검색</button>
        <button onClick={handleResetSearch}>초기화</button>
      </div>

      {/* 검색 결과 섹션 */}
      <div className="search-results">
        <h3>검색 결과</h3>
        <ul>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <li key={event.calendarEventId}>
                <strong>{event.name}</strong> - {event.startDate.split("T")[0]}
                <button
                  onClick={() => {
                    if (calendarRef.current) {
                      const calendarApi = calendarRef.current.getApi();
                      calendarApi.gotoDate(event.startDate.split("T")[0]); // 해당 날짜로 이동
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
          {/* 디버깅 로그 */}
          <div>
            <p>Modal All Day: {formData.allDay ? "True" : "False"}</p>
          </div>

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
          <h3>해당 날짜의 다른 일정</h3>
          <ul className="event-list">
            {selectedDateEvents?.length > 0 ? (
              selectedDateEvents.map((dayEvent) => {
                // 조건에 따라 표시할 시간 문자열 설정
                const displayTime = dayEvent.allDay
                  ? "하루종일"
                  : `${dayEvent.startTime} ~ ${dayEvent.endTime}`;

                return (
                  <li key={dayEvent.calendarEventId} className="event-item">
                    <strong>{dayEvent.name}</strong> : {displayTime}
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
              onChange={(e) => {
                const isChecked = e.target.checked;
                setFormData({
                  ...formData,
                  allDay: isChecked,
                  startTime: isChecked ? "00:00" : formData.startTime,
                  endTime: isChecked ? "23:59" : formData.endTime,
                });
              }}
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
