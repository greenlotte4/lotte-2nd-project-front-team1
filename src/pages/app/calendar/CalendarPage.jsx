import React from 'react';
import AppLayout from "../../../layouts/app/AppLayout";
import { useSidebar } from '../../../hooks/app/useSidebar'; // 커스텀 훅 사용
import '../../../styles/App/calendar/Calendar.scss';
import '../../../styles/App/AppAside.scss';
import CalendarAside from '../../../components/app/calendar/CalendarAside';
import Calendar from '../../../components/app/calendar/Calendar';


export default function CalendarPage() {
    const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용

    return (
        <AppLayout onToggleSidebar={toggleSidebar}>
            {isSidebarVisible && <CalendarAside />}
            <div className={`main-content ${isSidebarVisible ? '' : 'hidden-sidebar'}`}>
                <Calendar />
            </div>
        </AppLayout>
    );
}
