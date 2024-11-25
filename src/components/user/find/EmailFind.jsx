import { useState } from "react";
import { Link } from "react-router-dom";

export default function EmailFind() {
    const [method, setMethod] = useState("hpFind");
    const findHandle = (methodType) => {
        setMethod(methodType);
    }
    return (
        <div className="emailFindBox">
            <table>
                <tbody>
                        <span>이메일</span>
                    <tr>
                        <td>
                            <div class="form-row">
                                <input type="text" placeholder="이메일입력" />
                                <button class="authBtn">인증</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-row">
                                <input type="text" placeholder="인증번호" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
