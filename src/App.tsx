import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import History from "./components/pages/History";
import Scan from "./components/pages/Scan";
import Patients from "./components/pages/Patients";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import routes from "tempo-routes";
import { supabase } from "./lib/supabase";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated with Supabase
  useEffect(() => {
    // Get current session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
      }
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        setIsAuthenticated(true);
      } else if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scan"
            element={
              <ProtectedRoute>
                <Scan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
