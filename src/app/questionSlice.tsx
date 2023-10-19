import {createSlice} from "@reduxjs/toolkit"
import type {PayloadAction} from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { Question } from "../types"
import data from "../data/data.json"


interface QuestionsState  {
    questions : Question[]
    currentQuestionIndex : number,
    selectOption : boolean
}

const initialState : QuestionsState = {
    questions : [],
    currentQuestionIndex : 0,
    selectOption : false
}


export const questionSlice = createSlice({
    name : "question",
    initialState,
    reducers:{
        nextQuestion : (state) => {
            state.currentQuestionIndex +=1;
            state.selectOption = false
        },
        skipQuestion : (state) => {
            console.log('skip question')
        },
        allQuestion : (state,action:PayloadAction<string|undefined>) => {
            const quiz = data?.quizzes.find((quiz) => quiz.id === action.payload);
            state.questions = quiz ? quiz.questions : [];        
        }
      
    }
})


export const {nextQuestion,skipQuestion,allQuestion} = questionSlice.actions

export const selectQuestion = (state : RootState) => state.question
export default questionSlice.reducer
