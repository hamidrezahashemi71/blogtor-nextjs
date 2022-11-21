import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../Store";

const initialState = {
  currentUser: null,
  number: 0,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      if (action.payload._id) state.currentUser = action.payload;
    },
    setAddNumber: (state, action) => {
      state.number = state.number + action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCurrentUser, setAddNumber} = currentUserSlice.actions;

export const selectUser = (state) => state.currentUser.currentUser;
export const selectNumber = (state) => state.currentUser.number;

export default currentUserSlice.reducer;
