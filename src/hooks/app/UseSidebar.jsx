import { useState } from 'react';

export function useSidebar() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    return { isSidebarVisible, toggleSidebar };
}
