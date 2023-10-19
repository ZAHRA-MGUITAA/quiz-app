import data from "../../data/data.json";
import { useParams } from "react-router-dom";
import { Answer, Question, Quiz } from "../../types";
import Checkbox from "../../components/Checkbox";
import { completQuiz } from "../../app/scoreSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import questionSlice, { allQuestion, nextQuestion } from "../../app/questionSlice";
import { useEffect, useState } from "react";
import { selectQuestion } from "../../app/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { incrementScore } from "../../app/scoreSlice";

const SingleQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const { id } = useParams<string>();
  const currentQuestionIndex = useAppSelector(
    (state) => state.question.currentQuestionIndex
  );
  const dispatch = useAppDispatch();
  const question = useAppSelector(
    (state) => state.question.currentQuestionIndex
  );
  const allquestion = useAppSelector(selectQuestion).questions;
  const currentQuestion = allquestion[currentQuestionIndex];
  // console.log(allquestion)
  // useEffect(() => {
  //   setQuestions(data?.quizzes.filter((quiz) => quiz.id === id)[0].questions);
  // }, []);
  useEffect(() => {
    dispatch(allQuestion(id));
  }, [id]);
  // console.log(allquestion)
  // const [isChecked, setIsChecked] = useState(false);
  const [isCheckedList, setIsCheckedList] = useState<boolean[]>(Array(allquestion[currentQuestionIndex]?.options.length).fill(false));
    console.log(isCheckedList)
  const handelChange = (index: number) => {
    const updatedIsCheckedList = isCheckedList.map((value, i) => i === index ? !value : value);
    console.log("updatedIsCheckedList  =>"+updatedIsCheckedList)
    setIsCheckedList(updatedIsCheckedList);
  };
  const handelNextButton = () => {
    if (Number(allquestion[question]?.id) === allquestion.length) {
      dispatch(completQuiz());
    } else {
      dispatch(nextQuestion());
     setIsCheckedList(Array(allquestion[currentQuestionIndex]?.options.length).fill(false)) 
        }
  };
  
  const [selectedOptions,setselectedOptions] = useState(useSelector(selectQuestion).selectOption) 
  // const options = useSelector(selectQuestion).selectOption
  // setselectedOptions(options)
  //  console.log(selectedOptions)

  const handelAnswer = (e: Event) => {
    const target = e.target as HTMLInputElement;
    // const answersname = document.getElementsByName(
    //   target.name
    // ) as NodeListOf<HTMLInputElement>;
    // const checked = target.checked;
    // if (checked) {
    //   answersname.forEach((item) => {
    //     if (!item.checked) {
    //       item.disabled = true;
    //     } else {
    //       item.disabled = false;
    //       // setselectedOptions(item.value)
    //       // console.log(item.value);
    //     }
    //   });
    // } else {
    //   answersname.forEach((item) => {
    //     item.disabled = false;
    //   });
    // }
    if (target.value === currentQuestion?.correctAnswer) {
      if (Number(currentQuestionIndex) === allquestion.length - 1) {
        dispatch(completQuiz());
      }
      dispatch(incrementScore());
    } else {
      if (Number(currentQuestionIndex) === allquestion.length - 1) {
        dispatch(completQuiz());
      }
    }
  };

  return (
    <div className="bg-[#CEF7F1]">
      <div className="flex flex-col container mx-auto h-screen items-center justify-center">
        <div className="flex flex-col relative w-96 py-14">
          <p className="text-lg text-center text-primaryColor ">
            Question {allquestion[question]?.id}/{allquestion.length}
          </p>
          <p className="text-xl font-bold text-center text-primaryColor my-12">
            {allquestion[question]?.question}
          </p>
          <div className="answers flex flex-col gap-4 justify-center items-center">
            {allquestion[question]?.options.map((answer: string, index) => (
              <Checkbox
                answer={answer}
                handelAnswer={handelAnswer}
                key={index}
                isChecked = {isCheckedList[index]}
                handelChange={() => handelChange(index)}                
              />
            ))}
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
