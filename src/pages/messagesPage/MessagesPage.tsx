import { MessageArea } from "./components/messageArea/MessageArea";
import style from "./messages.module.css";

export default function MessagesPage() {
  return (
    <div className={style.wrapper}>
      <MessageArea />
    </div>
  );
}
