import React from "react";
import { useNavigate } from "react-router-dom";  // 페이지 이동을 위한 useNavigate

const Subscription = () => {
  const navigate = useNavigate();  // 페이지 이동을 위한 navigate 함수

  // 로그인 상태 체크
  const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

  // 버튼 클릭 시 실행되는 함수
  const handlePlanClick = (planType) => {
    if (user) {
      // 로그인 상태일 경우 MyPageMemberShip 페이지로 이동
      navigate('../user/mypage/membership');
    } else {
      // 로그인되지 않은 상태일 경우 로그인 페이지로 이동
      navigate('../user/login');
    }
  };

  return (
    <main className="main-content Subs-content">
      <div className="main-title">
        <div className="sub-title">
          <h1>
            우리 팀에 맞는 <span>플랜</span> 선택
          </h1>
          <p>스타트업부터 대기업까지 맞춤형 플랜을 제공합니다.</p>
        </div>
      </div>

      {/* 요금제 갤러리 */}
      <div className="plans-gallery">
        {/* FREE 요금제 */}
        <div className="plan-card">
          <h2>FREE</h2>
          <p>기본 기능을 무료로 이용하세요.</p>
          <strong>
            멤버당 <span> 0원 </span>/월
          </strong>
          <ul>
            <li>최대 3명의 사용자</li>
            <li>기본 분석 도구</li>
            <li>1GB 저장 공간</li>
          </ul>
          <button onClick={() => handlePlanClick('free')}>시작하기</button>
        </div>

        {/* PREMIUM 요금제 */}
        <div className="plan-card premium">
          <h2>PREMIUM</h2>
          <p>팀 협업과 고급 기능을 제공합니다.</p>
          <strong>
            멤버당 <span> 8,000원 </span>/월
          </strong>
          <ul>
            <li>최대 10명의 사용자</li>
            <li>고급 분석 도구</li>
            <li>2GB 저장 공간</li>
          </ul>
          <button onClick={() => handlePlanClick('premium')}>지금 업그레이드</button>
        </div>

        {/* ENTERPRISE 요금제 */}
        <div className="plan-card">
          <h2>ENTERPRISE</h2>
          <p>대규모 기업을 위한 맞춤 솔루션.</p>
          <strong>
            멤버당 <span> 11,000원 </span>/월
          </strong>
          <ul>
            <li>무제한 사용자</li>
            <li>맞춤형 지원</li>
            <li>무제한 저장 공간</li>
          </ul>
          <button onClick={() => handlePlanClick('enterprise')}>문의하기</button>
        </div>
      </div>

      {/* 플랜별 상세 기능 비교 */}
      <div className="plans-comparison">
        <h2>플랜별 기능 비교</h2>
        <table>
          <thead>
            <tr>
              <th>기능</th>
              <th>FREE</th>
              <th>PREMIUM</th>
              <th>ENTERPRISE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>사용자 수</td>
              <td>최대 3명</td>
              <td>최대 10명</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>저장 공간</td>
              <td>1GB</td>
              <td>2GB</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>고급 분석 도구</td>
              <td>제공 안됨</td>
              <td>제공</td>
              <td>제공</td>
            </tr>
            <tr>
              <td>맞춤형 지원</td>
              <td>제공 안됨</td>
              <td>제공 안됨</td>
              <td>24/7 지원</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 자주 묻는 질문 */}
      <div className="faq-chat">
        <h2>자주 묻는 질문</h2>
        {/* FAQ 내용 */}
      </div>
    </main>
  );
};

export default Subscription;
