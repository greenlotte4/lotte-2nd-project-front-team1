import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changePassword } from "../../../api/user/userAPI";

export default function NewPass() {
  const location = useLocation();
  const navigate = useNavigate();

  const { email, userId } = location.state || {};

  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;



  useEffect(() => {
    console.log("NewPass에서 전달받은 데이터:", location.state); // state 전체 확인
    console.log("NewPass에서 userId:", userId); // userId 확인
    console.log("NewPass에서 email:", email); // email 확인
  }, [location.state, userId, email]);

  // 비밀번호 확인 여부 실시간 검사
  const validatePasswords = () => {
    if (newPassword && confirmPass && newPassword !== confirmPass) {
      setPassError("비밀번호가 일치하지 않습니다.");
    } else if (newPassword && !passRegex.test(newPassword)) {
      setPassError("비밀번호는 최소 8자 이상, 알파벳, 숫자, 특수문자를 포함해야 합니다.");
    } else {
      setPassError(""); // 일치하고 유효한 비밀번호이면 오류 메시지 초기화
    }
  };

  // 비밀번호 입력 및 확인 시 실시간 검증
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    validatePasswords();
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPass(e.target.value);
    validatePasswords();
  };
  const PassChangHandler = async (e) => {
    e.preventDefault();
    console.log("클릭됨")


    setLoading(true);
    try {
      // 상황에 따라 적절한 토큰 선택

      console.log("전송할 데이터1(userId): ", userId);
      console.log("전송할 데이터2(newPassword): ", newPassword);
      const response = await changePassword(userId, newPassword);

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/user/login");
      } else {
        alert("비밀번호 변경 중 오류가 발생했습니다.")
      }
    } catch (error) {
      alert("보내지도 안음 비밀번호 변경 중 오류가 발생했습니다.")
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="passViewBox">
      <div className="passViewTop">
        <span style={{ display: "block", fontSize: "12px", marginTop: "10px" }}>
          {newPassword && confirmPass
            ? newPassword === confirmPass
              ? passRegex.test(newPassword)
                ? <div style={{ color: "green" }}>비밀번호가 일치합니다.</div>  // 비밀번호가 일치하고 유효함
                : <div style={{ color: "red" }}>일치하지만, 비밀번호는 유효하지 않습니다.</div>  // 일치하지만 유효하지 않음
              : <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>  // 일치하지 않음
            : newPassword && !passRegex.test(newPassword)
              ? <div style={{ color: "red" }}>비밀번호 특수문자/영문 대소문자 구별없이 8글자 이상 입력.</div>  // 유효하지 않음
              : null  // 아무 것도 없거나 유효하면 아무 메시지도 없음
          }
        </span>

        <table>
          <tbody>
            <tr>
              <td>비밀번호</td>
              <td>
                <input
                  type="password"
                  placeholder="비밀번호입력"
                  onChange={handleNewPasswordChange}
                  value={newPassword}
                  required
                />

              </td>

            </tr>

            <tr>
              <td>비밀번호 확인</td>
              <td>
                <input
                  type="password"
                  placeholder="비밀번호확인"
                  onChange={handleConfirmPasswordChange}
                  value={confirmPass}
                  required
                />
              </td>
            </tr>
          </tbody>

        </table>

        <div className="passViewBottom">
          <div className="NewPassBtn">
            <button
              type="submit"
              className="blueButton"
              onClick={PassChangHandler}
              disabled={loading || !passError || !newPassword || !confirmPass} // 로딩 중이거나 비밀번호 불일치하면 비활성화
            >
              {loading ? "변경 중..." : "비밀번호 변경"} {/* 로딩 중에는 텍스트 변경 */}
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loading-spinner">
          <span>로딩 중...</span>
        </div>
      )}
    </div>
  );
}
