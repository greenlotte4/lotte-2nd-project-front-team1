/*
    날짜 : 2024/11/28
    이름 : 이도영
    내용 : 마이페이지 문의내역 컴포넌트 작성

    추가내역
    -------------
    00.00 이름 - 내용
*/
import MyPageAside from "../../../components/app/myPage/MyPageAside";
import MyPageInquiry from "../../../components/app/myPage/MyPageInquiry";
import { useSidebar } from "../../../hooks/app/useSidebar";
import AppLayout from "../../../layouts/app/AppLayout";
export default function MyPageInquiryPage() {
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용

  return (
    <AppLayout onToggleSidebar={toggleSidebar}>
      {isSidebarVisible && <MyPageAside />}
      <main
        className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
      >
        <MyPageInquiry />
      </main>
    </AppLayout>
  );
}
