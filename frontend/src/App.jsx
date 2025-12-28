import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login.jsx'
import Register from './Register.jsx'
import ConfirmationPage from './ConfirmationPage.jsx';
import Home from './Home.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" replace /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/confirmationPage" element={ <ConfirmationPage /> } />

        {/*Here we have all the routes that reuqire the user to be logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={ <Home /> } />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
