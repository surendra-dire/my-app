import { useLocation } from "react-router-dom";

export default function Welcome() {
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const name = location.state?.name || storedUser?.name;

  return <h1>Welcome {name}</h1>;
}
