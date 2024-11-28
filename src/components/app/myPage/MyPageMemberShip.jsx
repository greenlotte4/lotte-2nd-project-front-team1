/*
   날짜 : 2024/11/28
   이름 : 이도영
   내용 : 마이페이지 맴버십 구매 화면 출력

   추가내역
   -------------
   
 */
export default function MyPageMemberShip() {
  return (
    <main className="Subs-content">
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
          <button>시작하기</button>
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
          <button>지금 업그레이드</button>
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
      <div className="payment-container">
        {/* <!-- 결제 금액 --> */}
        <div className="payment-amount">
          <h2>결제 금액</h2>
          <div className="amount-box">
            <span>금액확인</span>
          </div>
        </div>

        {/* <!-- 결제 방법 --> */}
        <div className="payment-methods">
          <h3>결제방법</h3>
          <div className="methods-grid">
            <label>
              <input type="radio" name="payment-method" value="credit-card" />
              신용카드
            </label>
            <label>
              <input type="radio" name="payment-method" value="debit-card" />
              체크카드
            </label>
            <label>
              <input type="radio" name="payment-method" value="bank-transfer" />
              계좌이체
            </label>
            <label>
              <input type="radio" name="payment-method" value="phone-payment" />
              휴대폰결제
            </label>
            <label>
              <input type="radio" name="payment-method" value="no-bank" />
              무통장입금
            </label>
            <label>
              <input type="radio" name="payment-method" value="kakao-pay" />
              카카오페이
            </label>
          </div>
        </div>

        {/* <!-- 결제하기 버튼 --> */}
        <div className="payment-submit">
          <button type="button" className="pay-button">
            결제하기
          </button>
        </div>
      </div>
    </main>
  );
}
