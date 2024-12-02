import Page from "../../../components/app/page/Page";
import PageAside from "../../../components/app/page/PageAside";
import { useSidebar } from "../../../hooks/app/UseSidebar";
import AppLayout from "../../../layouts/app/AppLayout";

import "../../../styles/app/page/Page.scss";

export default function PagePage() {
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용
  return (
    <AppLayout onToggleSidebar={toggleSidebar} thisPage="page">
      <PageAside isVisible={isSidebarVisible} />
      <div
        className={`main-content pagecontent ${
          isSidebarVisible ? "" : "hidden-sidebar"
        }`}
        id="main-container"
      >
        <Page />
      </div>
    </AppLayout>
  );
}
