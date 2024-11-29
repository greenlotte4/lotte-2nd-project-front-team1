import React from "react";

const Intro = () => {
  return (
    <main className="main-content Intro-content">
      <div className="image-container">
        <img src="/images/intro1.png" alt="배경 이미지" className="intro1" />
      </div>

      <div className="timeline-container">
        <div className="timeline-title">
          <span className="highlight-green">Hub Flow</span>는<br />
          허브와 흐름으로
          <br />
          유연한 협업을 이끕니다.
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <h3>2026년</h3>
            <p>AWS 코리아 올해의 라이징 스타 파트너상 수상</p>
            <p>허브플로우 흑자 전환, 누적 유료 고객 5000개 사 돌파</p>
          </div>
          <div className="timeline-item">
            <h3>2025년</h3>
            <p>허브플로우 사용자 200만 돌파</p>
            <p>일하기 좋은 부산형 강소기업 선정</p>
          </div>
          <div className="timeline-item">
            <h3>2024.12.20</h3>
            <p>허브플로우(Hub Flow) 서비스 런칭</p>
          </div>
          <div className="timeline-item">
            <h3>2024.11.18</h3>
            <p>허브플로우(Hub Flow) 팀 설립</p>
          </div>
        </div>
      </div>

      <h2>Management</h2>
      <div className="management-container">
        <div className="card">
          <img src="/images/ceo1.jpg" alt="Profile Image" />
          <h3>강중원 CEO</h3>
          <p>문제 해결의 핵심은 연결입니다. 우리는 그 연결을 만듭니다.</p>
        </div>
        <div className="card">
          <img src="/images/ceo2.jpg" alt="Profile Image" />
          <h3>강유정 COO</h3>
          <p>기술은 도구일 뿐입니다. 진짜 혁신은 사람에서 시작됩니다.</p>
        </div>
        <div className="card">
          <img src="/images/ceo3.jpg" alt="Profile Image" />
          <h3>박수정 COO</h3>
          <p>협업은 개별의 힘을 넘어서 시너지를 창출합니다.</p>
        </div>
        <div className="card">
          <img src="/images/ceo4.jpg" alt="Profile Image" />
          <h3>원기연 CEO</h3>
          <p>복잡함을 단순하게, 단순함을 더 강력하게 만드는 것!</p>
        </div>
        <div className="card">
          <img src="/images/ceo5.jpg" alt="Profile Image" />
          <h3>이도영 CTO</h3>
          <p>미래를 예측하는 가장 좋은 방법은 그것을 만드는 것입니다.</p>
        </div>
        <div className="card">
          <img src="/images/ceo6.jpg" alt="Profile Image" />
          <h3>최영진 CTO</h3>
          <p>우리가 만든 기술은 사람들의 더 나은 하루를 만듭니다.</p>
        </div>
      </div>

      <h2>찾아오시는 길</h2>
      <div className="map-info">
        <img src="/images/map.png" alt="배경 이미지" className="intro2" />
        <p>부산 부산진구 중앙대로 749</p>
      </div>
    </main>
  );
};

export default Intro;
