import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import SuccessPage from './SuccessPage.jsx';
import Home from './Home.jsx';
import Join from './Join.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import OrganizeMenu from './OrganizeMenu.jsx';
import CreateGroup from './CreateGroup.jsx';
import CreateEvent from './CreateEvent.jsx';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publice */}
        <Route path="/" element={ <Navigate to="/login" replace /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/registersuccess" element={ <SuccessPage title="Account Created!" btnText="Go to Login Page" path="/login"/> } />

        {/* Rute Protejate (Trebuie să fii logat pentru a le accesa) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={ <Home /> } />
          <Route path="/home/join" element={ <Join /> } />
          <Route path="/home/organize" element={ <OrganizeMenu /> } />
          <Route path="/home/organize/creategroup" element={ <CreateGroup /> } />
          <Route path="/home/organize/createdgroup" element={ <SuccessPage title="Group Created!" btnText="Create an Event" path="/home/organize/createevent"/> } />
          <Route path="/home/organize/createevent" element={ <CreateEvent /> } />
          <Route path="/home/organize/createdevent" element={ <SuccessPage title="Event created!" btnText="Show Event details" path="nu stiu cum dar trebuie implementat un link dinamic" /> } />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}