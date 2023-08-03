import { useAppDispatch, useAppSelector } from "../../../../store/store";
import style from "./messagesArea.module.css";
import { Input, Button } from "antd";
import { useEffect, useRef, useState } from "react";

import {
  sendMessageThunk,
  startWebSocketChannel,
  stopWebSocketChannel,
} from "../../../../store/messagesSlice/messagesThunk";
import Message from "../../../../components/message/Message";

const { TextArea } = Input;

export function MessageArea() {
  const dispatch = useAppDispatch();

  const messagesData = useAppSelector((state) => state.message.messages);

  const [message, setMessage] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current && messagesData.length) {
      bottomRef.current?.scrollTo({
        top: bottomRef.current.clientHeight,
        behavior: "smooth",
      });
    }
  }, [bottomRef, messagesData.length]);

  useEffect(() => {
    dispatch(startWebSocketChannel());

    return () => {
      dispatch(stopWebSocketChannel());
    };
  }, [dispatch]);

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
      return (
        <Message
          key={index + userId}
          message={message}
          photo={photo}
          userName={userName}
          userId={userId}
        />
      );
    }
  );

  return (
    <div className={style.wrapper}>
      <div className={style.messageBlock} ref={bottomRef}>
        {messages}
      </div>
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
