import data from "../../data/data.json";
import { useEffect, useState } from "react";
// import { Quiz } from "../../types";
import { Link } from "react-router-dom";
// import SingleQuiz from "../../components/SingleQuizdd";
import { Quiz } from "../../types";


const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  
  useEffect(() => {
    setQuizzes(data.quizzes);
  });

  return (
    <div className="container mx-auto flex flex-col items-center gap-6 py-44">
      <h1 className="text-3xl text-red font-bold text-center text-violet-300 ">
        Get Your Skills Certified
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        {quizzes.map((quiz)=> (
          <div className="py-4 px-8 bg-white shadow-xl flex flex-col justify-around h-44 rounded-lg items-center" key={quiz.id}>
            <h3 className="text-lg font-bold text-center text-black ">
                {quiz.title}
            </h3>
            <button className="bg-violet-300 text-black py-2 px-4 rounded-md w-fit">
              <Link to={"/quiz/"+quiz.id}>Start your test </Link>
              {/* <Quiz  id={id}/> */}
              {/* <SingleQuiz id={quiz.id} title={quiz.title} /> */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
