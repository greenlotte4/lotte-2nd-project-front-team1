export default function HpFind() {
    return (
        <div>
            <table>
                <tbody>
                    <span>성/이름</span>
                    <tr>
                        <td class="inputName">
                            <input type="text" placeholder="성" />
                        </td>
                        <td class="inputName">
                            <input type="text" placeholder="이름" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <span>휴대폰 번호</span>
                    <tr>
                        <td>
                            <div class="form-row">
                                <select name="" id="">
                                    <option value="">+82(한국)</option>
                                    <option value="">+81(일본)</option>
                                </select>
                                <input type="text" placeholder="1012345678" />
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