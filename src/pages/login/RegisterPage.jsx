import Register from "../../components/user/login/register";
import '../../styles/login.scss'

export default function RegisterPage() {
    return (
        <section className="loginBody">

            <div class="registerBox mainBox">
                <Register />
            </div>
        </section>
    );
}