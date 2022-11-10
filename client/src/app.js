import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./pages/pages.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Index />}></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
