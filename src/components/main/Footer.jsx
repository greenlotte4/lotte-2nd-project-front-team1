import React from "react";

const Footer = () => {
  return (
    <footer className="footer main-footer">
      <div className="footer-container">
        {/* 푸터 상단 */}
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/images/logo.png" alt="HubFlow 로고" />
          </div>
          <div className="footer-links">
            <a href="/main/intro">소개</a>
            <a href="/main/func">기능</a>
            <a href="/main/subscription">요금안내</a>
            <a href="/main/support">지원문의</a>
          </div>
        </div>
        <div className="footer-bottom">
          {/* prettier-ignore */}
          <p>
            VERSION - 1.0.0-SNAPSHOT
            사업자등록번호: 2024-1100-1800 통신판매업신고번호: 2024-부산진구-1118호<br />
            대표이사: 강중원 주소: 부산광역시 부산진구 중앙대로 749(범향빌딩), 그린컴퓨터아카데미 서면2별관<br />
            © Hub Flow. <a href="#"> 개인정보처리방침 </a> | <a href="#">이용약관</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
