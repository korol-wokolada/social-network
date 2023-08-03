import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { ChatApi } from "../../api/webSocket";
import { messageDelete, messageRecieved } from "./messagesSlice";
import { ChatMessagesType } from "./types";

const handlerNewMessage = (dispatch: Dispatch, messages: any) => {
  return dispatch(messageRecieved(messages));
};

export const startWebSocketChannel = createAsyncThunk(
  "message/startWebSocketChannel",
  async (_, { dispatch }) => {
    ChatApi.start();
    ChatApi.subscribe((message: ChatMessagesType[]) =>
      handlerNewMessage(dispatch, message)
    );
  }
);

export const stopWebSocketChannel = createAsyncThunk(
  "message/stopWebSocketChannel",
  async (__, { dispatch }) => {
    ChatApi.stop();
    ChatApi.unsubscribe((message: ChatMessagesType[]) =>
      handlerNewMessage(dispatch, message)
    );

    dispatch(messageDelete());
  }
);

export const sendMessageThunk = createAsyncThunk(
  "message/sendMessageThunk",
  async (message: string): Promise<void> => {
    try {
      ChatApi.sendMessage(message);
    } catch (error) {
      console.log(error);
    }
  }
);
