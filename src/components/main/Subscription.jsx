import React from 'react';

const Subscription = () => {
  return (
    <main className="main-content Subs-content">
      <div className="main-title">
        <div className="sub-title">
          <h1>우리 팀에 맞는 <span>플랜</span> 선택</h1>
          <p>스타트업부터 대기업까지 맞춤형 플랜을 제공합니다.</p>
        </div>
      </div>

      {/* 요금제 갤러리 */}
      <div className="plans-gallery">
        {/* FREE 요금제 */}
        <div className="plan-card">
          <h2>FREE</h2>
          <p>기본 기능을 무료로 이용하세요.</p>
          <ul>
            <li>최대 3명의 사용자</li>
            <li>기본 분석 도구</li>
            <li>5GB 저장 공간</li>
          </ul>
          <button>시작하기</button>
        </div>

        {/* PREMIUM 요금제 */}
        <div className="plan-card premium">
          <h2>PREMIUM</h2>
          <p>팀 협업과 고급 기능을 제공합니다.</p>
          <ul>
            <li>최대 50명의 사용자</li>
            <li>고급 분석 도구</li>
            <li>50GB 저장 공간</li>
          </ul>
          <button>지금 업그레이드</button>
        </div>

        {/* ENTERPRISE 요금제 */}
        <div className="plan-card">
          <h2>ENTERPRISE</h2>
          <p>대규모 기업을 위한 맞춤 솔루션.</p>
          <ul>
            <li>무제한 사용자</li>
            <li>맞춤형 지원</li>
            <li>무제한 저장 공간</li>
          </ul>
          <button>문의하기</button>
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
              <td>최대 50명</td>
              <td>무제한</td>
            </tr>
            <tr>
              <td>저장 공간</td>
              <td>5GB</td>
              <td>50GB</td>
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

      {/* 자주 묻는 질문 말풍선 형식 */}
      <div className="faq-chat">
        <h2>자주 묻는 질문</h2>

        <div className="faq-message user-message">
          <div className="message-bubble">
            <p>허브플로우의 무료와 유료 버전의 차이는 무엇인가요?</p>
          </div>
        </div>

        <div className="faq-message admin-message">
          <div className="message-bubble">
            <p>무료 버전은 기본적인 기능을 제공하며, 유료 버전은 추가적인 저장 공간과 고급 분석 기능을 제공합니다.</p>
          </div>
        </div>

        <div className="faq-message user-message">
          <div className="message-bubble">
            <p>팀 멤버 수를 유동적으로 관리하는 방법은 무엇인가요?</p>
          </div>
        </div>

        <div className="faq-message admin-message">
          <div className="message-bubble">
            <p>사용 인원의 변동에 따라 유연하게 팀을 관리할 수 있으며, 추가 사용자에 대한 과금은 자동으로 적용됩니다.</p>
          </div>
        </div>

        <div className="faq-message user-message">
          <div className="message-bubble">
            <p>허브플로우에서 제공하는 할인 혜택에 대해 알고 싶어요.</p>
          </div>
        </div>

        <div className="faq-message admin-message">
          <div className="message-bubble">
            <p>교육기관, NGO, 비영리단체 및 사회적 기업에게는 특별 할인이 제공됩니다. 세부 사항은 별도로 문의해 주세요.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Subscription;
