import { Outlet } from "react-router-dom";
import Header from "./Header";
import useOnline from "../utils/hooks/useOnline";

const App = () => {
  const online = useOnline();

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
