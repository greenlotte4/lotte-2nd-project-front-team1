import React from "react";
import Project from "../../../components/app/project/Project";
import ProjectAside from "../../../components/app/project/ProjectAside";
import AppLayout from "../../../layouts/app/AppLayout";
import { useSidebar } from "../../../hooks/app/UseSidebar"; // 커스텀 훅 사용
import "../../../styles/app/project/Project.scss";
import "../../../styles/app/AppAside.scss";

export default function ProjectPage() {
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용

  return (
    <AppLayout onToggleSidebar={toggleSidebar}>
      {isSidebarVisible && <ProjectAside />}
      <div
        className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
      >
        <Project />
      </div>
    </AppLayout>
  );
}
