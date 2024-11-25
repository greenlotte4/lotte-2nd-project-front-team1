import FindPass from "../../../components/user/find/FindPass";
import '../../../styles/login.scss'

export default function FindPassPage() {
    return (
        <section className="loginBody">

            <div className="findBox mainBox">
                <FindPass />
            </div>
        </section>
    );
}