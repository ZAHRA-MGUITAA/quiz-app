import { useDispatch, useSelector } from "react-redux";
import { incrementScore, selectScore } from "../../app/scoreSlice";

const Score = () => {
  const quiz = useSelector(selectScore);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto my-auto items-center h-full w-full">
      <div className="bg-[url('assets/Dayflow.png')] bg-contain w-96 h-96 bg-no-repeat flex items-center justify-center">your score is {quiz.score}</div>
      <div className="mx-3">
        <div className="border-2 bg-gray text-center py-4 text-bold">
          your quiz is end
        </div>
      </div>
    </div>
  );
};

export default Score;
