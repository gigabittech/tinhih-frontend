import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import './index.css';
import router from './routes/routes';
import { RouterProvider } from 'react-router';
import useUserStore from './store/global/userStore';
import AppLoader from './components/global/AppLoader';

// Initialize the store
const { getUser } = useUserStore.getState();

// Create a wrapper component to handle auth initialization
function AuthInitializer() {
  const { isLoading } = useUserStore();

  useEffect(() => {
    getUser(); // Check auth status on mount
  }, []);

  if (isLoading.user) {
    return <AppLoader />; // Show loader while checking auth
  }

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="bottom-right" expand={true} />
    <AuthInitializer />
  </StrictMode>
);