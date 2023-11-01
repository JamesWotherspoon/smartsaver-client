import { createContext, useContext, useState, useEffect } from 'react';
import { useSessionApi } from '../../utils/apiHooks';
import LoadingPage from '../LoadingPage';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Set isRequestPending to true
  const { isRequestPending, sendRequest } = useSessionApi(true);

  useEffect(() => {
    sendRequest('get').then((response) => {
      console.log('response' + response.status);
      if (response.status === 200) setIsAuthenticated(true);
      if (response.status === 404) setIsAuthenticated(false);
      if (response.status === 500) console.log('Server Error');
    });
  }, [sendRequest]);

  const login = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const logout = async () => {
    const response = await sendRequest('delete');
    if (response.status !== 200) console.log('Failed to logout');
    setIsAuthenticated(false);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {isRequestPending ? <LoadingPage /> : children}
    </AuthContext.Provider>
  );
};
