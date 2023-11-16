import { Outlet } from "react-router-dom";
import Header from "./Header";
import useOnline from "../utils/hooks/useOnline";

const App = () => {
  // registering custom hook to track user's internet connectivity
  useOnline();

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
