import BoardAside from "../../../components/app/board/BoardAside";
import MainBoard from "../../../components/app/board/MainBoard";
import { useSidebar } from "../../../hooks/app/UseSidebar";
import AppLayout from "../../../layouts/app/AppLayout";

import "../../../styles/app/board/Board.scss";
import "../../../styles/app/board/BoardAside.scss";

export default function MainBoardPage() {
    const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용
  
    return (
      <AppLayout onToggleSidebar={toggleSidebar}>
        <BoardAside isVisible={isSidebarVisible} />
        <main
          className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}scrollable`}
        >
          <MainBoard />
        </main>
      </AppLayout>
    );
  }
