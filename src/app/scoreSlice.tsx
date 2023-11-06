import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ScoreState {
  score: number;
  quizComplet: boolean;
}

const initialState: ScoreState = {
  score: 0,
  quizComplet: false,
};

export const scoreSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    incrementScore: (state) => {
      state.score += 1;
    },
    decrementScore: (state) => {
      state.score !== 0 ? state.score-- : state.score;
    },
    completQuiz: (state) => {
      state.quizComplet = true;
    },
  },
});

export const { incrementScore, decrementScore, completQuiz } =
  scoreSlice.actions;
export const selectScore = (state: RootState) => state.score;
export default scoreSlice.reducer;
