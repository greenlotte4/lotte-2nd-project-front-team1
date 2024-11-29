import Page from '../../../components/app/page/Page';
import AppLayout from "../../../layouts/app/AppLayout";

import PageAside from "../../../components/app/page/PageAside";

import '../../../styles/app/page/Page.scss';
import { useSidebar } from '../../../hooks/app/UseSidebar';


export default function PagePage(){
  const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용
    return(
        <AppLayout onToggleSidebar={toggleSidebar}>
        <PageAside isVisible={isSidebarVisible} />
        <main
          className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
        >
          <Page />
        </main>
      </AppLayout>
    );
}
