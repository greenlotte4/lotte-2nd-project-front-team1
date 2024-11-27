
import React from 'react';
const Header = () => {
  return (
    <header className="header main-header">
      <div className="header-container">
        <div className="logo">
          <a href="/main/index">
            <img src="/images/logo.png" alt="CI 로고" />
          </a>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a href="/main/intro">소개</a>
            </li>
            <li>
              <a href="/main/func">기능</a>
            </li>
            <li>
              <a href="/main/subscription">요금안내</a>
            </li>
            <li>
              <a href="/main/support">지원문의</a>
            </li>
          </ul>
        </nav>
        <div className="buttons">
          <button className="home">HOME</button>
          <button className="login">로그인</button>
        </div>
      </div>
    </header>
  );

};


export default Header;
