
{/* 
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 프로젝트 html 작성

    추가내역
    -------------
    00.00 이름 - 내용
    <script src="/javascript/app/project/project.js"></script>
    <script src="/javascript/include/aside.js"></script>
*/}
import React, { useState } from "react";
import MainPage from "./ProjectMainPage";
import TimelinePage from "./ProjectTimelinePage";
import SettingPage from "./ProjectSettingPage";
import ProjectSidebar from "./ProjectSidebar";

export default function Project() {
    const [activePage, setActivePage] = useState("main");

    const renderPage = () => {
        switch (activePage) {
            case "main":
                return <MainPage />;
            case "timeline":
                return <TimelinePage />;
            case "settings":
                return <SettingPage />;
            default:
                return <MainPage />;
        }
    };

    return (
        <div id="container">
            <div className="content-container">
                <ProjectSidebar />
                <main className="main-content">
                    {/* 버튼 그룹 */}
                    <div className="table-actions">
                        <button
                            className={`action-btn ${
                                activePage === "main" ? "active" : ""
                            }`}
                            onClick={() => setActivePage("main")}
                        >
                            기본 화면
                        </button>
                        <button
                            className={`action-btn ${
                                activePage === "timeline" ? "active" : ""
                            }`}
                            onClick={() => setActivePage("timeline")}
                        >
                            타임라인
                        </button>
                        <button
                            className={`action-btn ${
                                activePage === "settings" ? "active" : ""
                            }`}
                            onClick={() => setActivePage("settings")}
                        >
                            설정
                        </button>
                    </div>

                    {/* 동적 페이지 렌더링 */}
                    <div className="project-container">{renderPage()}</div>
                </main>
            </div>
        </div>
    );
}
