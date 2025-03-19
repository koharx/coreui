import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./app/sign-in/SignIn";
import SignUp from "./app/sign-up/SignUp";
import Blog from "./app/blog/Blog";
import { AuthProvider, useAuth } from "./core/authcontext";
import { Navigate } from "../node_modules/react-router-dom/dist/index";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="h-screen bg-bgColor text-textColor">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/registration" element={<SignUp />} />
            <Route
              path="/blog"
              element={
                <PrivateRoute>
                  <Blog />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
