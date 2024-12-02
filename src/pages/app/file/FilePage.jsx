/*
   날짜 : 2024/11/25
   이름 : 이도영
   내용 : 파일 페이지

   추가내역
   -------------
 */
import AppLayout from "../../../layouts/app/AppLayout";
import { useSidebar } from "../../../hooks/app/UseSidebar"; // 커스텀 훅 사용
import "../../../styles/app/file/File.scss";
import "../../../styles/app/AppAside.scss";
import FileAside from "../../../components/app/file/FileAside";
import File from "../../../components/app/file/File";

export default function FilePage() {
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용

  return (
    <AppLayout onToggleSidebar={toggleSidebar} thisPage="file">
      <FileAside isVisible={isSidebarVisible} />
      <div
        className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
      >
        <File />
      </div>
    </AppLayout>
  );
}
