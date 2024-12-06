import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

{
  /* 
    날짜 : 2024/11/26
    이름 : 강중원
    내용 : 앱 홈 구성

    추가내역
    -------------
    2024.11.29 - 뒷배경 추가
*/
}

export default function AppHome() {
  const [image, setImage] = useState();

  const fetchData = async () => {
    const data = await fetch("https://picsum.photos/1920/1080?blur");
    const picture = data.url;
    console.log(picture);
    setImage(picture);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main
      id="AppHomeMain"
      style={{ backgroundImage: `url(${image})`, backgroundSize: `cover` }}
    >
      <Link to="/">
        <div className="logo-container">
          <img
            src="/images/logo-2.png"
            alt="로고 이미지"
            className="logo-image"
          />
        </div>
      </Link>
      <div className="main-page">
        <Link to="/app/page" className="icon-button">
          <DescriptionOutlinedIcon className="icon-image" />
          <div className="button-text">페이지</div>
        </Link>

        <Link to="/app/calendar" className="icon-button">
          <CalendarMonthOutlinedIcon className="icon-image" />
          <div className="button-text">캘린더</div>
        </Link>
        <Link to="/app/message" className="icon-button">
          <ChatBubbleOutlineOutlinedIcon className="icon-image" />
          <div className="button-text">메신저</div>
        </Link>

        <Link to="/app/mainboard" className="icon-button">
          <AssignmentOutlinedIcon className="icon-image" />
          <div className="button-text">게시판</div>
        </Link>
        <Link to="/app/project" className="icon-button">
          <AccountTreeOutlinedIcon className="icon-image" />
          <div className="button-text">프로젝트</div>
        </Link>
        <Link to="/app/file" className="icon-button">
          <DnsOutlinedIcon className="icon-image" />
          <div className="button-text">드라이브</div>
        </Link>

        <Link to="/app/setting" className="icon-button">
          <SettingsOutlinedIcon className="icon-image" />
          <div className="button-text">설정</div>
        </Link>
        <button className="plus-button">
          <img
            src="/images/plus-small.png"
            alt="추가 아이콘"
            className="plus-image"
          />
        </button>
      </div>
    </main>
  );
}
