import IdView from "../../../components/user/find/FindView";
import '../../../styles/login.scss'

export default function FindViewPage() {
    return (
        <section className="loginBody">

            <div className="findBox mainBox">
                <IdView />
            </div>
        </section>
    );
}