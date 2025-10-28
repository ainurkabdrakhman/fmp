const API_URL = "http://localhost:5000"; 

export async function sendAnswer(question, userAnswer, correctAnswer) {
  const response = await fetch(`${API_URL}/api/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, userAnswer, correctAnswer }),
  });
  return response.json();
}
