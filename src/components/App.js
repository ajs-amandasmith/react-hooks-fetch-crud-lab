import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questionList) => setQuestions(questionList))
  }, [])

  function newQuestionSubmit(question) {
    setQuestions([...questions, question])
  }

  function deleteQuestion(id) {
    const updatedQuestions = questions.filter(question => question.id !== id);
    setQuestions(updatedQuestions)
  }

  function updateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map(question => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    })
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm newQuestionSubmit={newQuestionSubmit} /> : <QuestionList questions={questions} deleteQuestion={deleteQuestion} updateQuestion={updateQuestion} />}
    </main>
  );
}

export default App;
