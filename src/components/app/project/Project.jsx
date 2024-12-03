{
  /* 
    날짜 : 2024/11/21
    이름 : 이도영
    내용 : 프로젝트 html 작성

    추가내역
    -------------
    00.00 이름 - 내용
    
*/
}
import { useState } from "react";
import MainPage from "./ProjectMainPage";
import TimelinePage from "./ProjectTimelinePage";
import { useParams } from "react-router-dom";

export default function Project() {
  const { projectId } = useParams();
  const [activePage, setActivePage] = useState("main");

  const renderPage = () => {
    switch (activePage) {
      case "main":
        return <MainPage projectId={projectId} />; 
      case "timeline":
        return <TimelinePage projectId={projectId} />; 
      default:
        return <MainPage projectId={projectId} />;
    }
  };

  return (
    <div>
      <div className="project-container">
        <div className="table-actions">
          <button
            className={`action-btn ${activePage === "main" ? "active" : ""}`}
            onClick={() => setActivePage("main")}
          >
            기본 화면
          </button>
          <button
            className={`action-btn ${activePage === "timeline" ? "active" : ""}`}
            onClick={() => setActivePage("timeline")}
          >
            타임라인
          </button>
        </div>
        {renderPage()}
      </div>
    </div>
  );
}
