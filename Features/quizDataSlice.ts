import { createSlice } from "@reduxjs/toolkit";
import { userDataTypes } from "../Screens/Home";

type initialStateTypes = {
  userDetails: userDataTypes;
  Questions: any;
};

const initialState: initialStateTypes = {
  userDetails: { name: "", email: "", phoneNo: "", language: "" },
  Questions: {},
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    getQuestions(state, action) {
      state.Questions = action.payload;
    },
    setAnswer(state, action) {
      state.Questions[action.payload.id].selectedAnswer =
        action.payload.selectedAnswer;
      state.Questions[action.payload.id].score = action.payload.score;
      state.Questions[action.payload.id].answered = true;
      if (state.Questions[action.payload.id].match) {
        let bool = false;
        for (let i = 0; i < 4; i++) {
          if (
            state.Questions[action.payload.id].selectedAnswer[i].text !==
            state.Questions[action.payload.id].answer[i].text
          ) {
            bool = true;
            break;
          }
        }
        if (!bool) {
          state.Questions[action.payload.id].score = 1;
        } else {
          state.Questions[action.payload.id].score = 0;
        }
      }
    },
  },
});

export const { setAnswer, setUserDetails, getQuestions } =
  userDataSlice.actions;
export default userDataSlice.reducer;
