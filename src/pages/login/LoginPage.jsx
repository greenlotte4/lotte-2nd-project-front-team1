import LoginFooter from "../../components/layout/loginFooter";
import Login from "../../components/user/login/login";
import '../../styles/login.scss'

export default function LoginPage() {
    return (
        <div className="LoginPage">
            <Login/>
            <LoginFooter/>
        </div>
    );
}