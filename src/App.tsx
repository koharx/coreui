import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./app/sign-in/SignIn";
import SignUp from "./app/sign-up/SignUp";
import { AuthProvider, useAuth } from "./hooks/authcontext";
import Dashboard from "./app/dashboard/Dashboard";

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
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
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
