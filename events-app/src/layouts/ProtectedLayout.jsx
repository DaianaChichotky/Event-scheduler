import { Navigate } from 'react-router';

const ProtectedLayout = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to='/login' />;
  return children;
};

export default ProtectedLayout;
