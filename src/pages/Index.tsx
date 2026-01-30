import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Login from './Login';

export default function Index() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/orders');
    }
  }, [user, isLoading, navigate]);

  // If loading, show the login page which handles its own loading state
  // If not logged in, show login
  // If logged in, redirect to orders (handled by useEffect)
  if (isLoading) {
    return <Login />;
  }

  if (user) {
    return null; // Will redirect
  }

  return <Login />;
}
