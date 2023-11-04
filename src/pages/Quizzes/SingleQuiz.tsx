import { useParams } from "react-router-dom";
import Checkbox from "../../components/Checkbox";
import { completQuiz, decrementScore } from "../../app/scoreSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchQuestion, nextQuestion } from "../../app/questionSlice";
import { useEffect, useState } from "react";
import { selectQuestion } from "../../app/questionSlice";
import { incrementScore } from "../../app/scoreSlice";

const SingleQuiz = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<string>();
  const status = useAppSelector((state) => state.question.loading);
  const currentQuestionIndex = useAppSelector(
    (state) => state.question.currentQuestionIndex
  );

  const allquestion = useAppSelector(selectQuestion).questions;
  const currentQuestion = allquestion[currentQuestionIndex];
  const [isCheckedList, setIsCheckedList] = useState<boolean[]>([]);
  useEffect(() => {
    dispatch(fetchQuestion(id));
    if (status === "success") {
      setIsCheckedList(
        Array(allquestion[currentQuestionIndex]?.options.length).fill(false)
      );
    }
  }, [status, dispatch]);

  // handel change of the checkbox ( checke answer )
  const handelChange = (e: Event, index: number) => {
    const updatedIsCheckedList = isCheckedList.map((value, i) =>
      i === index ? !value : value
    );
    setIsCheckedList(updatedIsCheckedList);
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      if (target.value === currentQuestion?.correctAnswer) {
        dispatch(incrementScore());
      }
    } else {
      dispatch(decrementScore());
    }
  };

  // handel click on next button
  const handelNextButton = () => {
    if (Number(allquestion[currentQuestionIndex]?.id) === allquestion.length) {
      dispatch(completQuiz());
    } else {
      dispatch(nextQuestion());
      setIsCheckedList(
        Array(allquestion[currentQuestionIndex]?.options.length).fill(false)
      );
    }
  };

  return (
    <div className="">
      <div className="flex flex-col container mx-auto h-screen items-center justify-center">
        <div className="flex flex-col relative w-full py-14">
          <p className="text-lg text-left text-primaryColor font-bold bg-secondaryColor w-fit p-4 rounded-md">
            Question No.{allquestion[currentQuestionIndex]?.id} of{" "}
            {allquestion.length}
          </p>
          <p className="text-xl font-bold text-left text-primaryColor my-6 border-2 bg-gray-300 py-4 px-4 rounded-md">
            {allquestion[currentQuestionIndex]?.question}
          </p>
          <div className="answers flex flex-col justify-center items-center border-2 rounded-md divide-y">
            {allquestion[currentQuestionIndex]?.options.map(
              (answer: string, index) => (
                <Checkbox
                  answer={answer}
                  key={index}
                  index={index}
                  isChecked={isCheckedList[index]}
                  handelChange={handelChange}
                />
              )
            )}
          </div>
          <button
            className="bg-secondaryColor px-4 py-2 w-fit rounded-md absolute right-0 bottom-0"
            onClick={handelNextButton}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleQuiz;
