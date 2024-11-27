import React from 'react';
import AppHeader from "../../components/app/include/AppHeader";
import "../../styles/App/AppCommon.scss";
import "../../styles/App/AppHeader.scss";
// eslint-disable-next-line react/prop-types
export default function AppLayout({ children, onToggleSidebar }) {
    return (
        <div id="container" className="Appcontainer">
            {/* AppHeader에 사이드바 토글 함수를 prop으로 전달 */}
            <AppHeader onToggleSidebar={onToggleSidebar} />
            <div className="content-container">{children}</div>
        </div>
    );
}