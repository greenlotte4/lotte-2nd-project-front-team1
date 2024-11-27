import LoginFooter from "../../components/layout/LoginFooter";
import Login from "../../components/user/login/Login";
import '../../styles/login.scss'

export default function LoginPage() {
    return (

        <>
        <section className="loginBody">
            <div className="loginBox mainBox">
                <Login />
                <LoginFooter />
            </div>
        </section>
        </>

    );
}