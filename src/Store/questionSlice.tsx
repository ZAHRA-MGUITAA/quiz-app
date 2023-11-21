import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Question } from "../types";
import data from "../data/data.json";

interface QuestionsState {
  questions: Question[];
  currentQuestionIndex: number;
  loading: string;
}

const initialState: QuestionsState = {
  questions: [],
  currentQuestionIndex: 0,
  loading: "",
};

export const fetchQuestion = createAsyncThunk<Question[], string | undefined>(
  "data/fetchQuestion",
  async (quizId: string | undefined) => {
    const quiz = await data?.quizzes?.find((quiz) => quiz?.id === quizId);
    const response = await quiz?.questions;
    return response || [];
  }
);

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestion.fulfilled, (state, action) => {
      state.questions = action.payload;
      state.loading = "success";
    });
  },
});

export const { nextQuestion } = questionSlice.actions;

export const selectQuestion = (state: RootState) => state.question;
export default questionSlice.reducer;
