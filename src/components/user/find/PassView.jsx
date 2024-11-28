import { Link } from "react-router-dom";

export default function PassView() {
  return (
    <div className="passViewBox">
      <div className="passViewTop">
        <table>
          <tbody>
            <tr>
              <td>비밀번호</td>
              <td>
                <input type="pass" placeholder="비밀번호입력" />
              </td>
            </tr>
            <tr>
              <td>확인</td>
              <td>
                <input type="pass" placeholder="비밀번호확인" />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="passViewBottom">
          <div className="NewPassBtn">
            <Link to="/user/login" className="btnCancle">
              비밀번호 변경
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
