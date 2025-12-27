import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    setError("");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
        }
      );

      if (!res.ok) {
        setError("Invalid username or password");
        return;
      }

      const user = await res.json();

      // Go to quotes page with logged-in user
      navigate("/quotes", { state: { user } });

    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={login} style={{ width: "100%" }}>
        Login
      </button>
    </div>
  );
}
