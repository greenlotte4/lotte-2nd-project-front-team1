import { Link } from "react-router-dom";

export default function IdView() {
    
    return (
        <div className=" ">
            <div>
                <table>
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
                <div className="findBtnBox">
                    <Link to="/user/login" className="btnCancle">로그인</Link>
                    <Link to="/user/findPass" className="btnCancle">비밀번호찾기</Link>
                </div>
            </div>
        </div>
    );
}