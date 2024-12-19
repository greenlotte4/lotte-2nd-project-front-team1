import { useState } from 'react';
import axios from 'axios';
import { savePlanHistoryAPI } from '../../../api/mypage/mypageAPI';

export default function MyPageMemberShip() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [pricePerMember, setPricePerMember] = useState(0);
  const [months, setMonths] = useState(1);
  
  const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
      const userId = user.id || user.userid; // 가능한 키를 모두 확인

  console.log("userId(유저아이디) : ", userId);

  // 요금제 선택 핸들러
  const handlePlanSelect = (plan, price) => {
    setSelectedPlan(plan);
    setPricePerMember(price);
  };

  // 개월 수 변경 핸들러
  const handleMonthsChange = (e) => {
    setMonths(parseInt(e.target.value, 10));
  };

  // 오늘 날짜부터 개월 수에 맞는 종료 날짜 계산
  const calculateEndDate = (startDate, months) => {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + months);
    return endDate;
  };

  // 결제 및 저장 요청 핸들러
  const handlePayment = async () => {
    if (!selectedPlan) {
      alert('요금제를 선택해 주세요.');
      return;
    }

    const startDate = new Date();
    const endDate = calculateEndDate(new Date(startDate), months);
    
    const planData = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      planId: selectedPlan, // plan 객체 대신 planId 키로 전송
      userId: userId,       // user 객체 대신 userId 키로 전송
    };
    
    
    
    console.log("Sending data:", planData);

    try {
      await savePlanHistoryAPI(planData);
      alert('결제가 완료되었습니다!');
    } catch (error) {
      console.error('결제 요청 실패:', error);
      alert('결제 중 오류가 발생했습니다.');
    }
  };

  // 최종 결제 금액 계산
  const totalAmount = pricePerMember * months;

  return (
    <main className="Subs-content">
      {/* 요금제 선택 */}
      <div className="plans-gallery">
        <div className="plan-card" onClick={() => handlePlanSelect('1', 0)}>
          <h2>FREE</h2>
          <p>기본 기능을 무료로 이용하세요.</p>
          <strong>멤버당 0원 /월</strong>
          <ul>
            <li>최대 3명의 사용자</li>
            <li>기본 분석 도구</li>
            <li>1GB 저장 공간</li>
          </ul>
          <button>적용중</button>
        </div>

        <div className="plan-card" onClick={() => handlePlanSelect('2', 8000)}>
          <h2>PREMIUM</h2>
          <p>팀 협업과 고급 기능을 제공합니다.</p>
          <strong>멤버당 8,000원 /월</strong>
          <ul>
            <li>최대 10명의 사용자</li>
            <li>고급 분석 도구</li>
          </ul>
          <button>지금 업그레이드</button>
        </div>

        <div className="plan-card" onClick={() => handlePlanSelect('3', 11000)}>
          <h2>ENTERPRISE</h2>
          <p>대규모 기업을 위한 맞춤 솔루션.</p>
          <strong>멤버당 11,000원 /월</strong>
          <ul>
            <li>무제한 사용자</li>
            <li>맞춤형 지원</li>
          </ul>
          <button>지금 업그레이드</button>
        </div>
      </div>

      {/* 개월 수 선택 */}
      <div className="months-selection">
        <h3>이용할 개월 수 선택</h3>
        <select value={months} onChange={handleMonthsChange}>
          <option value="1">1개월</option>
          <option value="3">3개월</option>
          <option value="6">6개월</option>
          <option value="12">12개월</option>
        </select>
      </div>

      {/* 결제 금액 */}
      <div className="payment-container">
        <div className="payment-amount">
          <h2>결제 금액</h2>
          <div className="amount-box">
            {selectedPlan ? (
              <span>{totalAmount.toLocaleString()}원</span>
            ) : (
              <span>요금제를 선택하세요</span>
            )}
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <div className="payment-submit">
          <button type="button" className="pay-button" onClick={handlePayment}>
            결제하기
          </button>
        </div>
      </div>
    </main>
  );
}
