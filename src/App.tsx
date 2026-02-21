import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SubmitLink from './pages/SubmitLink';
import LinkDetail from './pages/LinkDetail';
import Profile from './pages/Profile';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AcceptableUse from './pages/AcceptableUse';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import CookiePolicy from './pages/CookiePolicy';
import Disclaimer from './pages/Disclaimer';
import Dmca from './pages/Dmca';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import GuestPost from './pages/GuestPost';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateBlog from './pages/admin/CreateBlog';

import ScrollToTop from './components/ScrollToTop';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import UserLayout from './layouts/UserLayout';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            {/* Public/User Routes with Navbar & Footer */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<UserRoute><Home /></UserRoute>} />
              <Route path="/login" element={<UserRoute><Login /></UserRoute>} />
              <Route path="/signup" element={<UserRoute><Signup /></UserRoute>} />
              <Route path="/submit" element={<PrivateRoute><UserRoute><SubmitLink /></UserRoute></PrivateRoute>} />
              <Route path="/links/:id" element={<UserRoute><LinkDetail /></UserRoute>} />
              <Route path="/profile/:id" element={<UserRoute><Profile /></UserRoute>} />
              <Route path="/about" element={<UserRoute><About /></UserRoute>} />
              <Route path="/blog" element={<UserRoute><Blog /></UserRoute>} />
              <Route path="/blog/:id" element={<UserRoute><BlogPost /></UserRoute>} />
              <Route path="/acceptable-use" element={<UserRoute><AcceptableUse /></UserRoute>} />
              <Route path="/contact" element={<UserRoute><Contact /></UserRoute>} />
              <Route path="/faq" element={<UserRoute><Faq /></UserRoute>} />
              <Route path="/cookie-policy" element={<UserRoute><CookiePolicy /></UserRoute>} />
              <Route path="/disclaimer" element={<UserRoute><Disclaimer /></UserRoute>} />
              <Route path="/dmca" element={<UserRoute><Dmca /></UserRoute>} />
              <Route path="/privacy" element={<UserRoute><Privacy /></UserRoute>} />
              <Route path="/terms" element={<UserRoute><Terms /></UserRoute>} />
              <Route path="/guest-post" element={<UserRoute><GuestPost /></UserRoute>} />
            </Route>

            {/* Admin Routes (No User Navbar/Footer) */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/create-blog" element={<AdminRoute><CreateBlog /></AdminRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

