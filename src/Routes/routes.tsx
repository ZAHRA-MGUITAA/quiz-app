import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Score from "../pages/Quizzes/Score.tsx";
import Quizzes from "../pages/Quizzes/quizzes.tsx";
import Home from "../pages/Quizzes/index.tsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/quiz/:id",
      element: <Home />,
    },
    {
      path: "/quizzes",
      element: <Quizzes />,
    },
    {
      path: "/score",
      element: <Score />,
    },
  ],
  { basename: "/quiz-app/" }
);
