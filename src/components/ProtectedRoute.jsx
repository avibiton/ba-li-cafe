import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

export default function ProtectedRoute({ fallback = <DefaultFallback />, requireAdmin = false }) {
  const { user, isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth, navigateToLogin } = useAuth();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  useEffect(() => {
    if (authChecked && !isAuthenticated && (!authError || authError.type !== 'user_not_registered')) {
      navigateToLogin();
    }
  }, [authChecked, isAuthenticated, authError, navigateToLogin]);

  if (isLoadingAuth || !authChecked) {
    return fallback;
  }

  if (authError?.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  if (!isAuthenticated) {
    return fallback;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <UserNotRegisteredError />;
  }

  return <Outlet />;
}