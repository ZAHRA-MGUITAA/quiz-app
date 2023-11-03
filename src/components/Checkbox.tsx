import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectQuestion } from "../app/questionSlice";

const Checkbox = ({
  answer,
  index,
  handelChange,
  isChecked,
}: {
  answer: string;
  index: number;
  handelChange: any;
  isChecked: boolean;
}) => {
  const asciiToLetter = (value: number): string => String.fromCharCode(value);
  
  return (
    <div
      className={
        (isChecked ? "bg-primaryColor" : "bg-white") +
        " group   px-4 w-96 rounded-lg "
      }
      key={index}
    >
      <label className="w-full flex items-center gap-8 h-full relative  py-4">
        <input
          type="checkbox"
          className="opacity-0"
          name="answer"
          id=""
          value={answer}
          checked={isChecked}
          onChange={(e) => handelChange(e,index)}
        />
        <span className="px-2 py-1 w-8 rounded-full bg-greenLight absolute left-0 text-primaryColor text-center group-hover:bg-primaryColor group-hover:text-white">
          {asciiToLetter(65 + index)}
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
