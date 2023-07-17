import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { ChatApi } from "../../API/webSocket";
import { messageDelete, messageRecieved } from "./Messages-slice";
import { ChatMessagesType } from "../../API/Api";

let _handlerNewMessage: ((message: ChatMessagesType[]) => void) | null = null;

const handlerNewMessage = (dispatch: Dispatch) => {
  if (_handlerNewMessage === null) {
    _handlerNewMessage = (messages) => {
      dispatch(messageRecieved(messages));
    };
  }
  return _handlerNewMessage;
};

export const startWebSocketChannel = createAsyncThunk(
  "message/startWebSocketChannel",
  async (_, { dispatch }) => {
    ChatApi.start();
    ChatApi.subscribe(handlerNewMessage(dispatch));
  }
);

export const stopWebSocketChannel = createAsyncThunk(
  "message/stopWebSocketChannel",
  async (__, { dispatch }) => {
    ChatApi.stop();
    ChatApi.unsubscribe(handlerNewMessage(dispatch));
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
