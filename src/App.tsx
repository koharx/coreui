import React, { useContext } from "react";
import { ThemeContext } from "./app/contexts/ThemeContext";
import { ThemeContextInterface } from "./types/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./app/sign-in/SignIn";
import SignUp from "./app/sign-up/SignUp";
import Blog from "./app/blog/Blog";

const App: React.FC = () => {
  return (
    <Router>
      <div className="h-screen bg-bgColor text-textColor">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/registration" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
