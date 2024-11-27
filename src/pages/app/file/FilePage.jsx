import React from 'react';
import AppLayout from "../../../layouts/app/AppLayout";
import { useSidebar } from '../../../hooks/app/useSidebar'; // 커스텀 훅 사용
import '../../../styles/App/file/File.scss';
import '../../../styles/App/AppAside.scss';
import FileAside from '../../../components/app/file/FileAside';
import File from '../../../components/app/file/File';


export default function FilePage() {
    const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용

    return (
        <AppLayout onToggleSidebar={toggleSidebar}>
            {isSidebarVisible && <FileAside />}
            <div className={`main-content ${isSidebarVisible ? '' : 'hidden-sidebar'}`}>
                <File />
            </div>
        </AppLayout>
    );
}
