/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 마이페이지 맴버십 컴포넌트 작성

    추가내역
    -------------
    00.00 이름 - 내용
*/
import MyPageAside from "../../../components/app/myPage/MyPageAside";
import MyPageMemberShip from "../../../components/app/myPage/MyPageMemberShip";
import { useSidebar } from "../../../hooks/app/UseSidebar";
import AppLayout from "../../../layouts/app/AppLayout";
import "../../../styles/app/myPage/MyPageMemberShip.scss";
export default function MyPageMembershipPage() {
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용

  return (
    <AppLayout onToggleSidebar={toggleSidebar}>
      {isSidebarVisible && <MyPageAside />}
      <main
        className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
      >
        <MyPageMemberShip />
      </main>
    </AppLayout>
  );
}
