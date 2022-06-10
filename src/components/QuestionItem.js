import React from "react";

function QuestionItem({ question, deleteQuestion, updateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(() => deleteQuestion(id))
  }

  function handleUpdate(e) {
    const newIndex = options.find(option => option.key === e.target.value)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: Number(newIndex.key)
      })
    })
      .then(r => r.json())
      .then(updated => updateQuestion(updated))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={e => handleUpdate(e)}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
