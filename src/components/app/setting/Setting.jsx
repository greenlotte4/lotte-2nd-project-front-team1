import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSetting from "./settingView/UserSetting";
import CalendarSetting from "./settingView/CalendarSetting";
import MessageSetting from "./settingView/MessageSetting";
import ArticleSetting from "./settingView/ArticleSetting";
import ProjectSetting from "./settingView/ProjectSetting";
import PageSetting from "./settingView/PageSetting";
import DriveSetting from "./settingView/DriveSetting";
import TeamspaceSetting from "./settingView/TeamspaceSetting";

export default function Setting({ selectedItem }) {
  const renderContent = () => {
    switch (selectedItem) {
      case "사용자 설정":
        return <UserSetting />;
      case "페이지 설정":
        return <PageSetting />;
      case "캘린더 설정":
        return <CalendarSetting />;
      case "메시지 설정":
        return <MessageSetting />;
      case "게시판 설정":
        return <ArticleSetting />;
      case "프로젝트 설정":
        return <ProjectSetting />;
      case "드라이브 설정":
        return <DriveSetting />;
      case "팀생성/팀참가/참여중인방":
        return <TeamspaceSetting />;
      default:
        return <UserSetting />;
    }
  };
  return (
    <div className="settingBox">
      <h3>설정 페이지</h3>
      <p>여기서는 다양한 설정 페이지를 관리할 수 있습니다.</p>

      <div style={{ marginTop: "20px" }}>
        <h4>{selectedItem ? `${selectedItem}` : "설정을 선택하세요"}</h4>
        {renderContent()} {/* 동적 콘텐츠 렌더링 */}
      </div>
    </div>
  );
}
