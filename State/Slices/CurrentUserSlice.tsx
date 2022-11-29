import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../Store";
import {Writer} from "../../lib/interfaces";
import Cookies from "universal-cookie";

const cookie = new Cookies();

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
    signOut: (state) => {
      cookie.remove("ut", {path: "/"});
      state.currentUser = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCurrentUser, signOut} = currentUserSlice.actions;

export const selectUser = (state: RootState) => state.currentUser.currentUser;

export default currentUserSlice.reducer;
