import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ChatMessagesType } from "../../API/Api";

const initialState = {
  messages: [] as ChatMessagesType[],
};

console.log(initialState.messages);
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
