import { useState } from 'react'
import './App.css'
import Quizzes from './pages/Quizzes/quizzes'
import { Provider } from 'react-redux'
import { store } from './app/store'



function App() {

  return (
    <Quizzes />
  )
}

export default App
