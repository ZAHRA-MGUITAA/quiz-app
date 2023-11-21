import { useSelector } from "react-redux";
import { selectScore } from "../../Store/scoreSlice";
import Score from "./Score";
import SingleQuiz from "./SingleQuiz";

const Home = () => {
  const completQuiz = useSelector(selectScore).quizComplet;

  return completQuiz ? <Score /> : <SingleQuiz />;
};

export default Home;
