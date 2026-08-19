import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import Home from './pages/Home';
import Menu from './pages/Menu';
import AdminMenu from './pages/AdminMenu';
import About from './pages/About';
import Gallery from './pages/Gallery';
import FindUs from './pages/FindUs';
import OnlineOrdering from './pages/OnlineOrdering';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from '@/components/ProtectedRoute';
import FloatingOrderButton from '@/components/FloatingOrderButton';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/find-us" element={<FindUs />} />
        <Route path="/visit-us" element={<Navigate to="/find-us" replace />} />
        <Route path="/contact" element={<Navigate to="/find-us" replace />} />
        <Route path="/coming-soon" element={<Navigate to="/" replace />} />
        <Route path="/online-ordering" element={<OnlineOrdering />} />
        <Route path="/admin" element={<Navigate to="/admin/menu" replace />} />
        <Route element={<ProtectedRoute requireAdmin />}>
          <Route path="/admin/menu" element={<AdminMenu />} />
        </Route>
        {/* Add your page Route elements here */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <FloatingOrderButton />
    </>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App