import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// importing pages
import Home from './pages/home/Home';
import About from './pages/about/About'
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Verify from './pages/verify/Verify';
import Dashboard from './pages/dashboard/Dashboard';
import ResendEmail from './pages/resendEmail/ResendEmail';
import Contact from './pages/contact/Contact';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:email" element={<Verify />} />
          <Route path="/resend-email/:email" element={<ResendEmail />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:page" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:page" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
