import React from "react";
import AppHeader from "../../components/app/include/AppHeader";
import "../../styles/app/AppCommon.scss";
import "../../styles/app/AppHeader.scss";

{
  /*
  
  추가내역
  ------------
  2024.11.29 - 강중원 - noneAside추가  
  */
}

// eslint-disable-next-line react/prop-types
export default function AppLayout({ children, onToggleSidebar, noneAside }) {
  return (
    <div id="container" className="Appcontainer">
      {/* AppHeader에 사이드바 토글 함수를 prop으로 전달 */}
      <AppHeader onToggleSidebar={onToggleSidebar} noneAside={noneAside} />
      <div className="content-container">{children}</div>
    </div>
  );
}
