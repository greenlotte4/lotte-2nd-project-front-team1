import { useState } from "react";
import StatusMessage from "./StatusMessage";
import ContactRow from "./ContactRow";
import EmailRow from "./EmailRow";
import { Link, useNavigate } from "react-router-dom";

export default function MyPage() {
    const [isEditing, setIsEditing] = useState({ contact: false, email: false });
    const [contact, setContact] = useState("010-1234-5678");
    const [email, setEmail] = useState("example@example.com");
    const [statusMessage, setStatusMessage] = useState("오늘 하루도 열심히! 👏");
    const navigate = useNavigate();

    const changePassHandle = () => {
        navigate("/user/find/findView", { state: { method: "PassFind" } });
    }


    return (
        <div className="main-content">
            <div className="userInfoBox">
                <h3>내정보 변경</h3>
                <table className="userInfoTable">
                    <tbody>
                        <tr>
                            <td>프로필사진</td>
                            <td>
                                <img src="/images/다운로드.jfif" alt="프로필사진" />
                                <button>프로필변경</button>
                            </td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td>김아무개</td>
                        </tr>
                        <tr>
                            <td>직급</td>
                            <td>사원</td>
                        </tr>
                        <tr>
                            <td>부서(팀)</td>
                            <td>백엔드</td>
                        </tr>
                        <tr>
                            <td>등급/결제일</td>
                            <td>일반/2024-11-11</td>
                        </tr>
                        {/* 연락처 컴포넌트 */}
                        <ContactRow contact={contact} setContact={setContact} />

                        {/* 이메일 컴포넌트 */}
                        <EmailRow email={email} setEmail={setEmail} />
                        <tr>
                            <td>가입 날짜</td>
                            <td>2024-01-01</td>
                        </tr>
                        <tr>
                            <td>최근 로그인</td>
                            <td>2024-11-27</td>
                        </tr>
                        <StatusMessage
                            statusMessage={statusMessage}
                            setStatusMessage={setStatusMessage}
                        />
                        <tr className="btnBox">
                            <td></td>
                            <td><button onClick={changePassHandle}>비밀번호 변경</button></td>
                        </tr>
                    </tbody>
                        
                </table>
            </div>
        </div>
    );
}
