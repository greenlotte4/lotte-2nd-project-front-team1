{
  /* 
    날짜 : 2024/11/26
    이름 : 강중원
    내용 : 앱 홈 구성

    추가내역
    -------------
*/
}

export default function AppHome() {
  return (
    <main id="AppHomeMain">
      <div className="logo-container">
        <img
          src="/images/logo-2.png"
          alt="로고 이미지"
          className="logo-image"
        />
      </div>

      <div className="main-page">
        <button className="icon-button">
          <img
            src="/images/book.png"
            alt="페이지 아이콘"
            className="icon-image"
          />
          <div className="button-text">페이지</div>
        </button>
        <button className="icon-button">
          <img src="image2.png" alt="게시판 아이콘" className="icon-image" />
          <div className="button-text">게시판</div>
        </button>
        <button className="icon-button">
          <img src="image3.png" alt="프로젝트 아이콘" className="icon-image" />
          <div className="button-text">프로젝트</div>
        </button>
        <button className="icon-button">
          <img src="image4.png" alt="드라이브 아이콘" className="icon-image" />
          <div className="button-text">드라이브</div>
        </button>
        <button className="icon-button">
          <img src="image5.png" alt="메신저 아이콘" className="icon-image" />
          <div className="button-text">메신저</div>
        </button>
        <button className="icon-button">
          <img
            src="/images/calendar.png"
            alt="켈린더 아이콘"
            className="icon-image"
          />
          <div className="button-text">켈린더</div>
        </button>
        <button className="icon-button">
          <img
            src="/images/settings.png"
            alt="설정 아이콘"
            className="icon-image"
          />
          <div className="button-text">설정</div>
        </button>
      </div>
    </main>
  );
}
