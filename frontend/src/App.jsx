import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import SignUp from './pages/SignUp.jsx';
import './App.css';

// A simple Home/Dashboard component for testing
function Home() {
  const { user, logout } = useContext(AuthContext);
  console.log("🚀 ~ Home ~ user:", user)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.fullName || user?.email}!</h1>
      <p className="text-gray-600 mt-2">You have successfully logged in via React Router.</p>
      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all cursor-pointer"
      >
        Log Out
      </button>
    </div>
  );
}

// A wrapper component to protect routes from unauthenticated users
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // If there is no user logged in, send them straight to the signup page
  return user ? children : <Navigate to="/signup" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Route (Only accessible if logged in) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route: Redirect everything else to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;