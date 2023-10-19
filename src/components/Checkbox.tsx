import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectQuestion } from "../app/questionSlice";

const Checkbox = ({
  answer,
  handelAnswer,
  handelChange,
  isChecked,
 
}: {
  answer: string;
  handelAnswer: any;
  handelChange :any
  isChecked : boolean;
}) => {
  // const [selectedOptions, setselectedOptions] = useState(
  //   useSelector(selectQuestion).selectOption
  // );

 
  // function handelChange(e: ChangeEvent) {
  //   const target = e.target as HTMLInputElement;
  //   setselectedOptions(target.checked);
  //   setIsChecked(!selectedOptions);
  // }
  console.log(answer + "==>" +isChecked)

  return (
    <div
      className={
        (isChecked ? "bg-primaryColor" : "bg-white") +
        " group   px-4 w-96 rounded-lg "
      }
      key={answer}
    >
      <label className="w-full flex items-center gap-8 h-full relative  py-4">
        <input
          type="checkbox"
          className="opacity-0"
          name="answer"
          id=""
          value={answer}
          onClick={(e) => {
            handelAnswer(e);
          }}
          checked={isChecked}
          onChange={handelChange}
                  />
        <span className="px-2 py-1 w-8 rounded-full bg-greenLight absolute left-0 text-primaryColor text-center group-hover:bg-primaryColor group-hover:text-white">
          A
        </span>
        <p
          className={
            (isChecked ? "text-white" : "text-primaryColor") +
            " text-lg  text-start"
          }
        >
          {answer}
        </p>
      </label>
    </div>
  );
};

export default Checkbox;
