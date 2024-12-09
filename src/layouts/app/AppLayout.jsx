/* eslint-disable react/prop-types */
import { Avatar, Fab } from "@mui/material";
import AppHeader from "../../components/app/include/AppHeader";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "../../styles/app/AppCommon.scss";
import "../../styles/app/AppHeader.scss";
import UserListButton from "../../components/app/include/UserListButton";
import { useState } from "react";

{
  /*
  
  추가내역
  ------------
  2024.11.29 - 강중원 - noneAside추가  
  */
}

export default function AppLayout({
  children,
  onToggleSidebar,
  noneAside,
  thisPage,
}) {
  const [userListOpen, setUserListOpenState] = useState(false);
  const openUserList = () => {
    setUserListOpenState(true);
  };

  const closeUserList = () => setUserListOpenState(false);
  return (
    <div id="container" className="Appcontainer">
      {/* AppHeader에 사이드바 토글 함수를 prop으로 전달 */}
      <AppHeader
        onToggleSidebar={onToggleSidebar}
        noneAside={noneAside}
        thisPage={thisPage}
      />
      <div className="content-container">{children}</div>
      {!userListOpen && (
        <Fab
          color="#99bc85"
          aria-label="userBtn"
          className="userButton"
          onClick={openUserList}
        >
          <PersonOutlineIcon
            sx={{ width: "40px", height: "40px", color: "white" }}
          />
        </Fab>
      )}
      <UserListButton isOpen={userListOpen} onClose={closeUserList} />
    </div>
  );
}
