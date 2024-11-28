import MyPage from '../../../components/app/myPage/MyPage'
import MyPageAside from '../../../components/app/myPage/MyPageAside'
import { useSidebar } from '../../../hooks/app/UseSidebar';
import AppLayout from '../../../layouts/app/AppLayout'
import '../../../styles/app/myPage/MyPage.scss'

export default function MyPagePage() {
    const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용

    return (
        <AppLayout onToggleSidebar={toggleSidebar}>
            {isSidebarVisible && <MyPageAside />}
            <main
                className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
            >
                <MyPage />
            </main>
        </AppLayout>
    )
}