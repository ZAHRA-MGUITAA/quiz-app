import { useSelector } from "react-redux";
import { selectScore } from "../../app/scoreSlice";
import { selectQuestion } from "../../app/questionSlice";
import { Link } from "react-router-dom";
const Score = () => {
  const score = useSelector(selectScore);
  const quiz = useSelector(selectQuestion);
  return (
    <div className="flex flex-col container mx-auto my-auto h-screen w-full items-center justify-center ">
      <div className="space-y-4 border-2 p-4  w-full ">
        <div className="w-full border-2 bg-gray text-center py-4 font-bold text-3xl">
          Learning is a journey. Keep going, and you'll get there.
        </div>
        <div className="w-full flex flex-row justify-center border-2 bg-gray text-center py-4 font-bold text-2xl">
          <p>Total Questions : </p>
          <p>{quiz.questions.length}</p>
        </div>
        <div className="w-full flex flex-row justify-center border-2 bg-gray text-center py-4 font-bold text-2xl">
          <p>Correct Answers : </p>
          <p>{score.score}</p>
        </div>
        <div className="w-full flex flex-row justify-center border-2 bg-gray text-center py-4 font-bold text-2xl">
          <p>Your Score : </p>
          <p>{((score.score / quiz.questions.length) * 100).toFixed()}%</p>
        </div>
        <Link
          reloadDocument
          to={"/"}
          className="bg-secondaryColor w-full  px-4 py-2 rounded-md flex justify-center items-center "
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Score;
