import { Link } from "react-router-dom";

export default function IdView() {
    return (
        <div className="findIdBox">
            <div className="idViewBox">
                <div className="findHeader">
                    <img src="/images/logo.png" alt="로그인 화면 이미지" />
                    <h3>ID찾기 수단을 선택해주세요</h3>
                </div>
                <table border={1}>
                    <tbody>
                        <tr>
                            <td className="idColumn">
                                아이디
                            </td>
                            <td className="resultColumn">
                                결과
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="findBtnBox">
                    <Link to="/user/login" className="btnCancle">로그인</Link>
                    <Link to="/user/" className="btnCancle">비밀번호찾기</Link>
                </div>
            </div>
        </div>
    );
}