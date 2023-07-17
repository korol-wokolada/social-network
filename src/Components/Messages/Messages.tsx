import { MessageArea } from "./MessageArea/MessageArea";
import style from "./Messages.module.css";
export default function Messges() {
  return (
    <div className={style.wrapper}>
      <MessageArea />
    </div>
  );
}
