import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div className="logo-container">
        <img
          src="/images/logo-2.png"
          alt="로고 이미지"
          className="logo-image"
        />
      </div>

      <div className="main-page">
        <Link to="/app/page" className="icon-button">
          <img
            src="/images/book.png"
            alt="페이지 아이콘"
            className="icon-image"
          />
          <div className="button-text">페이지</div>
        </Link>

        <Link to="/app/calendar" className="icon-button">
          <img
            src="/images/calendar.png"
            alt="켈린더 아이콘"
            className="icon-image"
          />
          <div className="button-text">캘린더</div>
        </Link>
        <Link to="/app/message" className="icon-button">
          <img
            src="/images/messages.png"
            alt="메신저 아이콘"
            className="icon-image"
          />
          <div className="button-text">메신저</div>
        </Link>
        <Link to="/app/mainboard" className="icon-button">
          <img
            src="/images/form.png"
            alt="게시판 아이콘"
            className="icon-image"
          />
          <div className="button-text">게시판</div>
        </Link>
        <Link to="/app/project" className="icon-button">
          <img
            src="/images/master-plan.png"
            alt="프로젝트 아이콘"
            className="icon-image"
          />
          <div className="button-text">프로젝트</div>
        </Link>
        <Link to="/app/file" className="icon-button">
          <img
            src="/images/folder-open.png"
            alt="드라이브 아이콘"
            className="icon-image"
          />
          <div className="button-text">드라이브</div>
        </Link>

        <Link to="/app/setting" className="icon-button">
          <img
            src="/images/settings.png"
            alt="설정 아이콘"
            className="icon-image"
          />
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
