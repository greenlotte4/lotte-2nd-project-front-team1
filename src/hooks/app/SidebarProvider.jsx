import React, { createContext, useState, useContext } from 'react';

// SidebarContext 생성
const SidebarContext = createContext();

export function SidebarProvider({ children }) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    // 사이드바 표시 여부 토글 함수
    const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    return (
        <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}

// Context를 사용하기 위한 커스텀 훅
export function useSidebar() {
    return useContext(SidebarContext);
}
