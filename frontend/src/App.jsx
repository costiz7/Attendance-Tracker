import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './Login.jsx'
import Register from './Register.jsx'
import ConfirmationPage from './ConfirmationPage.jsx';
import Home from './Home.jsx';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" replace /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/confirmationPage" element={ <ConfirmationPage /> } />
        <Route path="/home" element={ <Home /> } />
      </Routes>
    </BrowserRouter>
  );
}
