import Setting from "../../../components/app/setting/Setting";
import SettingAsied from "../../../components/app/setting/SettingAsied";
import { useSidebar } from "../../../hooks/app/UseSidebar";
import AppLayout from "../../../layouts/app/AppLayout";
import '../../../styles/app/setting/Setting.scss';
import '../../../styles/app/AppAside.scss';
import { useEffect, useState } from "react";

export default function SettingPage() {
    const { isSidebarVisible, toggleSidebar } = useSidebar(); // 사이드바 상태 및 토글 함수 사용
    const [selectedItem, setSelectItem] = useState(() => {
        return localStorage.getItem("selectedItem") || "사용자 설정";
    });

    const clickHandle = (item) => {
        setSelectItem(item);
        localStorage.setItem("selectedItem", item);
    }

    useEffect(() => {
        const savedItem = localStorage.getItem("selectedItem");
        if(savedItem){
            setSelectItem(savedItem)
        }
    }, []);
    return (
        <AppLayout onToggleSidebar={toggleSidebar}>

            {isSidebarVisible && (<SettingAsied onitemClick={clickHandle} />)}
            <main
                className={`main-content ${isSidebarVisible ? "" : "hidden-sidebar"}`}
            >
                <Setting selectedItem={selectedItem} />
            </main>
        </AppLayout>
    )
}
