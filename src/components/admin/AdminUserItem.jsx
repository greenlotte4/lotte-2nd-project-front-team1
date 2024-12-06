/*
    날짜 : 2024/12/03
    이름 : 이도영
    내용 : 관리자 회원관리 정보 + 상세정보 

    추가내역
    -------------
    2024/12/05 이도영 사용자 정보 수정,삭제
*/
import Modal from "../modal/Modal";
import { useState } from "react";

export default function AdminUserItem({ user, isChecked, onCheck, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onUpdate(user.userId, name, value); // 부모 컴포넌트로 전달
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0]; // "2024-12-03T08:45:26.000+00:00" → "2024-12-03"
  };
  function convertGrage(grade) {
    switch (grade) {
      case 1:
        return "1";
      case 2:
        return "2";
      case 3:
        return "3";
    }
  }
  function convertUserGrage(usergrade) {
    switch (usergrade) {
      case "USER":
        return "USER";
      case "ADMIN":
        return "ADMIN";
    }
  }
  function convertStatus(status) {
    switch (status) {
      case "NORMAL":
        return "NORMAL";
      case "BANED":
        return "BANED";
      case "DELETED":
        return "DELETED";
      case "SLEEP":
        return "SLEEP";
      default:
        return "NORMAL"; // 기본값
    }
  }

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onCheck(e.target.checked)}
          />
        </td>
        <td>{user.username}</td>
        <td>{user.userId}</td>
        <td>
          <select
            name="usergrade"
            defaultValue={convertUserGrage(user.role)}
            onChange={handleInputChange}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </td>
        <td>
          <select
            name="pricegrade"
            defaultValue={convertGrage(user.plan.planId)}
            onChange={(e) =>
              handleInputChange({
                target: {
                  name: "planId",
                  value: { planId: parseInt(e.target.value, 10) },
                },
              })
            }
          >
            <option value="1">FREE</option>
            <option value="2">PREMIUM</option>
            <option value="3">ENTERPRISE</option>
          </select>
        </td>

        <td>{formatDate(user.updatedAt)}</td>
        <td>
          <select
            name="status"
            defaultValue={convertStatus(user.status)}
            onChange={handleInputChange}
          >
            <option value="NORMAL">정상</option>
            <option value="BANED">정지</option>
            <option value="DELETED">탈퇴</option>
            <option value="SLEEP">휴먼</option>
          </select>
        </td>
        <td>
          <button
            onClick={() => setIsModalOpen(true)}
            className="details-button"
          >
            자세히
          </button>
        </td>
      </tr>
      <div className="adminuserinfo-modal">
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="사용자 상세 정보"
          className="user-details-modal"
        >
          <div>
            <table>
              <thead>
                <tr>
                  <th>가입날짜</th>
                  <th>주소</th>
                  <th>상세 주소</th>
                  <th>이메일</th>
                  <th>전화번호</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    {user.zipcode}
                    {user.addr1}
                  </td>
                  <td>{user.addr2}</td>
                  <td>{user.email}</td>
                  <td>{user.hp}</td>
                </tr>
              </tbody>
            </table>
            <h3>플랜 히스토리</h3>
            <table>
              <thead>
                <tr>
                  <th>플랜 이름</th>
                  <th>시작일</th>
                  <th>종료일</th>
                  <th>결제 예정일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.planHistory?.plan?.name || "N/A"}</td>
                  <td>{formatDate(user.planHistory?.startDate)}</td>
                  <td>{formatDate(user.planHistory?.endDate)}</td>
                  <td>{formatDate(user.planHistory?.updatedAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      </div>
    </>
  );
}
