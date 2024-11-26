import MessageAside from "../../../components/app/message/messageAside";
import MessageBox from "../../../components/app/message/messageBox";
import AppLayout from "../../../layouts/app/AppLayout";
import "../../../styles/App/message/Message.scss";
import "../../../styles/App/message/MessageAside.scss";

export default function Message() {
  return (
    <AppLayout>
      <MessageAside />
      <MessageBox />
    </AppLayout>
  );
}
