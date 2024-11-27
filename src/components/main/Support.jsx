import React, { useState } from "react";

const Support = () => {
  // 상태 관리: 각 폼 필드의 값을 저장
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    position: "",
    email: "",
    industry: "",
    people: "",
    inquiry: "",
    additionalInquiry: "",
    agreement: false,
  });

  // 폼 필드 값 변경 처리 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 체크박스 상태 처리 함수
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      agreement: checked,
    }));
  };

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 데이터 전송 로직 (예: API 호출 등)
    console.log("폼 제출:", formData);
  };

  return (
    <div className="form-container Support-content">
      <div class="main-title">
        <div class="sub-title">
          <h1>HUB FLOW <span>문의</span></h1>
          <p>협업툴 전문 컨설턴트가 빠르게 안내드립니다.</p>
        </div>
      </div>
      <div className="feature-block">
        <div className="feature-content">
          <h1>신청자 정보</h1>
          <form className="application-form" onSubmit={handleSubmit}>
            {/* 이름과 연락처 */}
            <div className="wrap">
              <div className="form-row">
                <label htmlFor="name">이름 *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="이름을 입력해 주세요"
                />
              </div>
              <div className="form-row">
                <label htmlFor="phone">연락처 *</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="예) 010-1234-5678"
                />
              </div>
            </div>

            {/* 회사 또는 단체명과 직책 */}
            <div className="wrap">
              <div className="form-row">
                <label htmlFor="company">회사 또는 단체명 *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="회사 또는 단체명 입력"
                />
              </div>
              <div className="form-row">
                <label htmlFor="position">직책</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="담당하고 계시는 직책"
                />
              </div>
            </div>

            {/* 이메일과 산업군 */}
            <div className="wrap">
              <div className="form-row">
                <label htmlFor="email">이메일 *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="예) hubflow@hubflow.com"
                />
              </div>
              <div className="form-row">
                <label htmlFor="industry">산업군 *</label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                >
                  <option value="">산업군 선택</option>
                  {/* 선택 가능한 산업군 옵션들 */}
                  <option value="IT">IT</option>
                  <option value="금융">금융</option>
                  <option value="제조업">제조업</option>
                  {/* 다른 옵션들 추가 */}
                </select>
              </div>
            </div>

            {/* 인원수와 문의 사항 */}
            <div className="wrap">
              <div className="form-row">
                <label htmlFor="people">인원수 *</label>
                <select
                  id="people"
                  name="people"
                  value={formData.people}
                  onChange={handleInputChange}
                >
                  <option value="">인원수 선택</option>
                  <option value="1">1명</option>
                  <option value="2">2명</option>
                  <option value="3">3명</option>
                  {/* 다른 인원수 옵션들 */}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="inquiry">문의 사항 *</label>
                <select
                  id="inquiry"
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleInputChange}
                >
                  <option value="">문의 사항 선택</option>
                  <option value="기술지원">기술 지원</option>
                  <option value="계약문의">계약 문의</option>
                  <option value="기타">기타</option>
                  {/* 다른 문의 사항 옵션들 */}
                </select>
              </div>
            </div>

            {/* 추가 문의 사항 */}
            <div className="form-row">
              <textarea
                rows="4"
                name="additionalInquiry"
                value={formData.additionalInquiry}
                onChange={handleInputChange}
                placeholder="업무 환경에 대한 문의 사항을 입력하세요."
              ></textarea>
            </div>

            {/* 개인정보 처리 동의 */}
            <div className="form-row checkbox-row">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={formData.agreement}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="agreement">
                [필수] 요청하신 문의 내용에 대한 서비스 제공을 위해 개인정보
                처리에 동의합니다.
              </label>
            </div>

            {/* 제출 버튼 */}
            <button type="submit" className="submit-btn">
              문의하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
