import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Quotes() {
  const { state } = useLocation();
  const user = state.user;

  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [quotes, setQuotes] = useState([]);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/api/quotes/${user.id}`)
      .then(res => res.json())
      .then(setQuotes);
  }, []);

  const addQuote = async () => {
    const res = await fetch(`${API}/api/quotes/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, author })
    });

    const q = await res.json();
    setQuotes([...quotes, q]);
    setText("");
    setAuthor("");
  };

  const deleteQuote = async (id) => {
    await fetch(`${API}/api/quotes/${id}`, { method: "DELETE" });
    setQuotes(quotes.filter(q => q.id !== id));
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>

      <input
        placeholder="Quote"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />

      <button onClick={addQuote}>Add Quote</button>

      <hr />

      {quotes.map(q => (
        <div key={q.id}>
          <p>"{q.text}" — {q.author}</p>
          <button onClick={() => deleteQuote(q.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
