export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  id: string;
  title: string;
  questions?: Question[];
};

export type Answer = {
  answer: string;
};
