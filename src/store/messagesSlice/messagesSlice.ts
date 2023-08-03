import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "./constants";
import { ChatMessagesType } from "./types";

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    messageRecieved: (state, action: PayloadAction<ChatMessagesType[]>) => {
      action.payload.forEach((el) => state.messages.push(el));
    },
    messageDelete: (state) => {
      state.messages = [];
    },
  },
});

export const { messageRecieved, messageDelete } = messageSlice.actions;
export default messageSlice.reducer;
