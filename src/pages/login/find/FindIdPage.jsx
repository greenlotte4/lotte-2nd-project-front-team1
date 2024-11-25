import '../../../styles/login.scss'
import FindId from "../../../components/user/find/FindId";

export default function FindIdPage() {
    return (
        <section className="loginBody">

            <div className="findBox mainBox">
                <FindId />
            </div>
        </section>
    );
}