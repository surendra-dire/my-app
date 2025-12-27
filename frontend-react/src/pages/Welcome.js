import { useLocation } from "react-router-dom";

export default function Welcome() {
  const { state } = useLocation();
  return <h1>Welcome {state?.name}</h1>;
}
