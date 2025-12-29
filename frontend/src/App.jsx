import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ConfirmationPage from './ConfirmationPage.jsx';
import Home from './Home.jsx';
import Join from './Join.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import OrganizeMenu from './OrganizeMenu.jsx';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publice */}
        <Route path="/" element={ <Navigate to="/login" replace /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/confirmationPage" element={ <ConfirmationPage /> } />

        {/* Rute Protejate (Trebuie să fii logat pentru a le accesa) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={ <Home /> } />
          <Route path="/home/join" element={ <Join /> } />
          <Route path="/home/organize" element={ <OrganizeMenu /> }/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}