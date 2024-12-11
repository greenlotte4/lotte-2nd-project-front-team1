import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      img: "/images/main_card1.png",
      text: "HUB FLOW는 실시간으로 공유하기 때문에 빠르게 문제 해결이 가능합니다.",
      author: "AMOREPACIFIC",
    },
    {
      img: "/images/main_card2.png",
      text: "허브 플로우로 협업이 쉬워졌습니다.",
      author: "롯데백화점",
    },
    {
      img: "/images/main_card3.jpg",
      text: "팀 전체의 생산성이 놀랍도록 향상되었습니다.",
      author: "박철수 · 철수테크 PM",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // 3초 간격으로 슬라이드 변경
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
  }, [slides.length]);

  return (
    <main className="Index-Content">
      <div className="main1">
        <h1>유연하고 생산적인 협업</h1>
        <h1>HUB FLOW</h1>
        <div className="btn">
          <Link to="/main/support">
            <button className="btn1">도입문의</button>
          </Link>
          <Link to="/user/terms">
            <button className="btn2">회원가입</button>
          </Link>
        </div>
        <div className="text1">
          <input type="text" placeholder="이번 주 진행한 업무를 요약해줘" />
          <img src="/images/search.png" className="search1" alt="검색" />
        </div>
        <img src="/images/main_img1.png" className="main1" alt="메인 이미지" />
      </div>

      <div className="main2">
        <div className="main2-content">
          <div className="main2-buttons">
            <h2 className="main2-title">
              <span className="highlight-green">허브 플로우</span>를 선택하는
              이유
            </h2>
            <p className="main2-desc">
              협업을 허브플로우를 사용하면 소통이 빨라지고
              <br />
              업무 생산성이 올라갑니다.
            </p>
            <div className="main2-btn">업무 소통에 효율적임</div>
            <div className="main2-btn">손쉬운 멤버 관리</div>
            <div className="main2-btn">안전하고 체계적인 정보 자산화</div>
          </div>
          <img
            src="/images/main_img2.png"
            alt="Hub Flow 캐릭터 이미지"
            className="main2-img"
          />
        </div>
      </div>

      <div className="main3">
        <div className="main3-content">
          <div className="main3-text">
            <h2 className="main3-title">
              <span className="highlight-green">허브 플로우</span>로 시작된 변화
            </h2>
            <p className="main3-desc">
              스타트업부터 대기업까지, 40만 팀이 말하는 협업툴 허브 플로우를
              선택한 이유
            </p>
          </div>
          <div className="main3-slider">
            <button
              className="slider-btn prev-btn"
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + slides.length) % slides.length
                )
              }
            >
              &lt;
            </button>
            <button
              className="slider-btn next-btn"
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % slides.length)
              }
            >
              &gt;
            </button>
            <div className="main3-card">
              <div className="main3-step">
                <img
                  src={slides[currentSlide].img}
                  alt={`Hub Flow card${currentSlide + 1}`}
                  className="main3-img"
                />
                <div className="main3-overlay">
                  <p className="step-text">
                    HUB FLOW는 실시간으로 공유하기 때문에 빠르게 문제 해결이
                    가능합니다.
                  </p>
                </div>
              </div>
              <div className="main3-author">
                <p>{slides[currentSlide].author}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main4">
        <div className="main4-content">
          <div className="left-content">
            <h2 className="main4-title">
              <span className="highlight-green">허브 플로우</span>에서 협업하는
              40만 기업
            </h2>
            <p className="main4-desc">
              스타트업부터 대기업, 커머스·제조·IT·F&B·미디어 등
              <br />
              성장하는 기업이 협업툴 잔디로 일하고 있습니다.
            </p>
          </div>
          <img
            src="/images/main_company.png"
            alt="Hub Flow 캐릭터 이미지"
            className="main4-img"
          />
        </div>
      </div>

      <div className="main5">
        <div className="main5-content">
          <h3 className="main5-title">
            <br></br>협업툴을 이용하고 싶다면?
          </h3>
          <p className="main5-desc">
            도입문의를 남겨주시면 허브플로우 컨설턴트가 24시간 이내에
            연락드립니다.
          </p>
          <div className="btn3">
            <Link to="/main/support">
              <button>도입문의</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
