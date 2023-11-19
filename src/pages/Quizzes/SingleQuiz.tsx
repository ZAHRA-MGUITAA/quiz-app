import { useParams } from "react-router-dom";
import Checkbox from "../../components/Checkbox";
import { completQuiz, decrementScore } from "../../Store/scoreSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { fetchQuestion, nextQuestion } from "../../Store/questionSlice";
import { useEffect, useState } from "react";
import { selectQuestion } from "../../Store/questionSlice";
import { incrementScore } from "../../Store/scoreSlice";

const SingleQuiz = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<string>();
  const status = useAppSelector((state) => state?.question?.loading);
  const currentQuestionIndex = useAppSelector(
    (state) => state?.question?.currentQuestionIndex
  );
  const [disabledList, setDisabledList] = useState<boolean[]>([]);
  const allquestion = useAppSelector(selectQuestion).questions;
  const currentQuestion = allquestion[currentQuestionIndex];
  const [isCheckedList, setIsCheckedList] = useState<boolean[]>([]);

  useEffect(() => {
    dispatch(fetchQuestion(id));
    if (status === "success") {
      setIsCheckedList(
        Array(allquestion[currentQuestionIndex]?.options?.length).fill(false)
      );
      setDisabledList(
        Array(allquestion[currentQuestionIndex]?.options?.length).fill(false)
      );
    }
  }, [status, dispatch]);

  const handelCheckboxChange = (e: Event, index: number) => {
    const updatedIsCheckedList = isCheckedList?.map((value, i) =>
      i === index ? !value : value
    );
    const updateIsDisabledList = disabledList?.map((item, i) =>
      i === index ? item : !item
    );
    setIsCheckedList(updatedIsCheckedList);
    setDisabledList(updateIsDisabledList);
    const target = e.target as HTMLInputElement;

    if (target.value === currentQuestion?.correctAnswer) {
      if (target.checked) {
        dispatch(incrementScore());
      } else {
        dispatch(decrementScore());
      }
    }
  };

  const handelNextButton = () => {
    if (Number(allquestion[currentQuestionIndex]?.id) === allquestion?.length) {
      dispatch(completQuiz());
    } else {
      dispatch(nextQuestion());
      setIsCheckedList(
        Array(allquestion[currentQuestionIndex]?.options?.length).fill(false)
      );
      setDisabledList(
        Array(allquestion[currentQuestionIndex]?.options?.length).fill(false)
      );
    }
  };

  return (
    <div className="container flex flex-col mx-auto h-screen items-center justify-center px-4">
      <div className="flex flex-col relative w-full py-14">
        <p className="text-lg text-left text-primaryColor font-bold bg-secondaryColor w-fit p-4 rounded-md">
          Question No.<span>{allquestion[currentQuestionIndex]?.id}</span> of
          <span className="ml-2">{allquestion?.length}</span>
        </p>
        <p className="text-xl font-bold text-left text-primaryColor my-6 border-2 bg-gray-300 py-4 px-4 rounded-md">
          {allquestion[currentQuestionIndex]?.question}
        </p>
        <div className="answers flex flex-col justify-center items-center border-2 rounded-md divide-y">
          {allquestion[currentQuestionIndex]?.options?.map(
            (answer: string, index: number) => (
              <Checkbox
                answer={answer}
                key={index}
                index={index}
                isChecked={isCheckedList[index]}
                isDisabled={disabledList[index]}
                handelChange={handelCheckboxChange}
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
  );
};

export default SingleQuiz;
