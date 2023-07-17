import {
  useAppDispatch,
  useAppSelector,
} from "../../../Redux-Toolkit/Redux-Toolkit-Store";
import style from "./MessagesArea.module.css";
import { Input, Button } from "antd";
import { useEffect, useState } from "react";

import Message from "./Message/Message";
import {
  sendMessageThunk,
  startWebSocketChannel,
  stopWebSocketChannel,
} from "../../../Redux-Toolkit/Messages-Reducer/Messages-Thunk";

const { TextArea } = Input;

export function MessageArea() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(startWebSocketChannel());
    return () => {
      dispatch(stopWebSocketChannel());
    };
  }, [dispatch]);

  const messagesData = useAppSelector((state) => state.message.messages);
  console.log(messagesData);
  const [message, setMessage] = useState("");

  function sendMessage() {
    if (!message) {
      return;
    }
    dispatch(sendMessageThunk(message));
    setMessage("");
  }
  function handleMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.currentTarget.value);
  }

  const messages = messagesData?.map(
    ({ message, photo, userId, userName }, index) => {
      return <Message key={index} message={message} />;
    }
  );

  return (
    <div className={style.wrapper}>
      <div className={style.messageBlock}>{messages}</div>
      <div className={style.textArea}>
        <TextArea
          placeholder="Inter your email"
          autoSize={{ minRows: 1, maxRows: 1 }}
          onChange={handleMessage}
          value={message}
        />
        <Button type="primary" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}
