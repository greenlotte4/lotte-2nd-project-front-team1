import { useState } from "react";
import { Link } from "react-router-dom";

export default function EmailFind() {
  
    return (
        <div className="emailFindBox">
            <table>
                <tbody>
                        <span>이메일</span>
                    <tr>
                        <td>
                            <div className="form-row">
                                <input type="text" placeholder="이메일입력" />
                                <button className="authBtn">인증</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="form-row">
                                <input type="text" placeholder="인증번호" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
