import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import Register from './components/Register';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
            <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* ✅ Protected Route */}
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        }
      />
        <Route path="/create" element={<CreateNote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
