import { useSelector } from "react-redux"
import { completQuiz, selectScore } from "../../app/scoreSlice"
import Score from "./Score"
import SingleQuiz from "./SingleQuiz"




const Home = () => {
    const completQuiz = useSelector(selectScore).quizComplet


    return(
  completQuiz ? <Score /> : <SingleQuiz />

    )
}


export default Home;