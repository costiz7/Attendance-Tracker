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
import EventDashboard from './EventDashboard.jsx';
import YourGroups from './YourGroups.jsx';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={ <Navigate to="/login" replace /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/registersuccess" element={ <SuccessPage title="Account Created!" btnText="Go to the Login Page" path="/login"/> } />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={ <Home /> } />
          <Route path="/home/join" element={ <Join /> } />
          <Route path="/joinedsuccess" element={ <SuccessPage title="Joined successfully!" btnText="Go to the Home Page" path="/home"/>}/>
          <Route path="/home/organize" element={ <OrganizeMenu /> } />
          <Route path="/home/organize/creategroup" element={ <CreateGroup /> } />
          <Route path="/home/organize/createdgroup" element={ <SuccessPage title="Group Created!" btnText="Create an Event" path="/home/organize/createevent"/> } />
          <Route path="/home/organize/createevent" element={ <CreateEvent /> } />
          <Route path="/home/organize/createdevent" element={ <SuccessPage title="Event created!" btnText="Show Event details" path="/home"/> } />
          <Route path="/event/:id" element={ <EventDashboard /> } />
          <Route path="/home/organize/yourgroups" element={ <YourGroups /> } />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}