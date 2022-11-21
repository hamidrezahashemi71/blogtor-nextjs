import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../Store";
import {Writer} from "../../lib/interfaces";

export interface CurrentUserState {
  currentUser: null | Writer;
}

const initialState: CurrentUserState = {
  currentUser: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      if (action.payload._id) state.currentUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCurrentUser} = currentUserSlice.actions;

export const selectUser = (state: RootState) => state.currentUser.currentUser;

export default currentUserSlice.reducer;
