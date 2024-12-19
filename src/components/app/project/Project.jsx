import React, { useState, useEffect } from "react";
import MainPage from "./ProjectMainPage";
import TimelinePage from "./ProjectTimelinePage";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
} from "@mui/material";

export default function Project() {
  const { projectId, tab } = useParams(); 
  const [activePage, setActivePage] = useState(tab || "main"); 
  const navigate = useNavigate();

  useEffect(() => {
    if (tab) setActivePage(tab);
  }, [tab]);

  const handlePageChange = (page) => {
    setActivePage(page);
    navigate(`/app/project/${projectId}/${page}`); 
  };

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
      <div className="project-header">
        <Button
          className={`action-btn ${activePage === "main" ? "active" : ""}`}
          onClick={() => handlePageChange("main")}
        >
          기본 화면
        </Button>
        <Button
          className={`action-btn ${activePage === "timeline" ? "active" : ""}`}
          onClick={() => handlePageChange("timeline")}
        >
          타임라인
        </Button>
      </div>
      <div className="project-content">{renderPage()}</div>
    </div>
  );
}
