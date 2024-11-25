export default function IdFind() {
    return (
        <div className="findPassBox">
            <table>
                <tbody>
                    <span>아이디</span>
                    <tr>
                        <td className="form-row">

                            <input type="text" placeholder="아이디입력" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <span>이메일</span>
                    <tr>
                        <td>
                            <div className="form-row">

                                <input type="text" placeholder="이메일입력" />
                                <button class="authBtn">인증</button>
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