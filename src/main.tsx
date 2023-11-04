import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Quizzes/index.tsx";
import Quizzes from "./pages/Quizzes/quizzes.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Score from "./pages/Quizzes/Score.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "quiz/:id",
    element: <Home />,
  },
  {
    path: "quizzes",
    element: <Quizzes />,
  },
  {
    path: "score",
    element: <Score />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
