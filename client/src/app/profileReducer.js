import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  trades: [],
  money: 0,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    atLogin: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.trades = action.payload.trades;
      state.money = action.payload.money;
    },
  },
});

// Action creators are generated for each case reducer function
export const { atLogin } = profileSlice.actions;

export default profileSlice.reducer;
