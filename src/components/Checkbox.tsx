type CheckboxDataType = {
  answer: string;
  index: number;
  handelChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  isChecked: boolean;
  isDisabled: boolean;
};

const Checkbox = ({
  answer,
  index,
  handelChange,
  isChecked,
  isDisabled,
}: CheckboxDataType) => {
  const asciiToLetter = (value: number): string => String.fromCharCode(value);

  return (
    <div
      className={
        (isChecked ? "bg-gray-300" : "bg-white") + " group px-4 w-full"
      }
      key={answer} //more stable
    >
      <label className="w-full flex items-center gap-8 h-full relative py-4 cursor-pointer">
        <input
          type="checkbox"
          className="opacity-0"
          name="answer"
          value={answer}
          checked={isChecked}
          disabled={isDisabled}
          onChange={(e) => handelChange(e, index)}
        />
        <span className=" absolute left-0 text-primaryColor text-center">
          {asciiToLetter(65 + index)}.
        </span>
        <p className="text-primaryColor text-lg  text-start">{answer}</p>
      </label>
    </div>
  );
};

export default Checkbox;
