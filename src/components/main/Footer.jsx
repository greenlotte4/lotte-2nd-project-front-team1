import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="#" alt="HubFlow 로고" />
          </div>
          <div className="footer-links">
            <a href="/main/intro.html">소개</a>
            <a href="/main/function.html">기능</a>
            <a href="/main/price.html">요금안내</a>
            <a href="/main/consult.html">지원문의</a>
          </div>
        </div>
        <div className="footer-bottom">
          {/* prettier-ignore */}
          <p>
            사업자등록번호: 2024-1100-1800 통신판매업신고번호: 2024-부산진구-1118호<br />
            대표이사: 강중원 주소: 부산광역시 부산진구 중앙대로 749(범향빌딩), 그린컴퓨터아카데미 서면2별관<br />
            © Hub Flow. <a href="#">개인정보처리방침</a> | <a href="#">이용약관</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
