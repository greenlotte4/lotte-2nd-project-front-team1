import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* CI 로고 */}
        <div className="logo">
          <a href="/main/main.html"><img src="#" alt="CI 로고" /></a>
        </div>

        {/* 메뉴 항목 */}
        <nav className="nav">
          <ul>
            <li><a href="/main/intro.html">소개</a></li>
            <li><a href="/main/function.html">기능</a></li>
            <li><a href="/main/price.html">요금안내</a></li>
            <li><a href="/main/consult.html">지원문의</a></li>
          </ul>
        </nav>

        {/* 버튼 */}
        <div className="buttons">
          <button className="home">HOME</button>
          <button className="login">로그인</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
