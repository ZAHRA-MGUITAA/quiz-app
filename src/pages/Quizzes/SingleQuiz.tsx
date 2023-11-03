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
  // const [checkedAnswer, setCheckedAnswer] = useState<{}[]>([]);
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
    // const qidtocheck = currentQuestion.id
    const updatedIsCheckedList = isCheckedList.map((value, i) =>
      i === index ? !value : value
    );
    setIsCheckedList(updatedIsCheckedList);
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      // const isQidalreadyChecked = checkedAnswer.some(obj => obj.qId === qidtocheck)
      // console.log(isQidalreadyChecked)
      // if(!isQidalreadyChecked){
      //   setCheckedAnswer([...checkedAnswer, { qId: currentQuestion.id, userAnswer : target.value }]);
      // }
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
    <div className="bg-[#CEF7F1]">
      <div className="flex flex-col container mx-auto h-screen items-center justify-center">
        <div className="flex flex-col relative w-96 py-14">
          <p className="text-lg text-center text-primaryColor ">
            Question {allquestion[currentQuestionIndex]?.id}/
            {allquestion.length}
          </p>
          <p className="text-xl font-bold text-center text-primaryColor my-12">
            {allquestion[currentQuestionIndex]?.question}
          </p>
          <div className="answers flex flex-col gap-4 justify-center items-center">
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
