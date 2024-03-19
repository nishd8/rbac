import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup, Login, RBAC } from "./pages";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rbac" element={<RBAC />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
