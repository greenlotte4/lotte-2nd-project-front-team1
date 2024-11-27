import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../slices/userSlice";
import { postUserLogin } from "../../../api/user/userAPI";

const initState = {
    uid: "",
    pass: "",
}
// 토큰이 아직 아보내져서 나중에 따로 다시 해야함
export default function Login() {
    const [user, setUser] = useState({ ...initState });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const subnitHandler = async (e) => {
        e.preventDefault();

        const tokens = await postUserLogin(user);
        if (tokens) {
            dispatch(login(tokens));
            navigate("/");
        } else {
            alert("로그인실패")
        }
    }
    return (
        <div className="login">
            <div className="loginImg">
                <img src="/images/logo.png" alt="로그인 화면 이미지" />
            </div>
            <form onSubmit={subnitHandler}>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img src="/images/user_Icon.png" alt="아이디" />
                                </td>
                                <td>
                                    <input type="text"
                                        name="uid"
                                        placeholder="아이디 입력"
                                        value={user.uid}
                                        onChange={changeHandler} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="/images/pass.jpg" alt="비밀번호" />
                                </td>
                                <td>
                                    <input
                                        type="password"
                                        name="pass"
                                        placeholder="비밀번호 입력"
                                        value={user.pass}
                                        onChange={changeHandler}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="loginDiv">
                        <input type="checkbox" value="기억하기" />기억하기

                        <div class="userFind">
                            <Link to="/user/findId" className="findId">아이디찾기</Link>
                            <Link to="/user/findPass" className="findPass">비밀번호찾기</Link>
                            <div className="findPass"><Link to="/user/terms">회원가입</Link></div>

                        </div>
                        <button className="loginBtn blueButton">로그인</button>
                    </div>
                </div>
            </form>
        </div>

    );
}