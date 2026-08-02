import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getProfileForRole = (role, username) => {
    switch (role) {
      case 'Master':
        return {
          name: 'Alexander Pierce (App Owner)',
          flatNo: 'Global Executive HQ',
          societyName: 'SocietyPrime Platform Network',
        };
      case 'Super Admin':
        return {
          name: 'Dev Lead (Super Admin Inspector)',
          flatNo: 'Dev Console & Inspector',
          societyName: 'Multi-Role Testing Suite',
        };
      case 'Society Admin':
        return {
          name: 'Rajesh Sharma (Society Admin)',
          flatNo: 'Admin Office A-01',
          societyName: 'Royal Palm Heights',
        };
      case 'Security Guard':
        return {
          name: 'Vikram Singh (Head Guard)',
          flatNo: 'Main Gate Checkpoint',
          societyName: 'Royal Palm Heights',
        };
      case 'Resident':
      default:
        return {
          name: 'Ansh Gadoya (Resident)',
          flatNo: 'B-304, Palm Tower',
          societyName: 'Royal Palm Heights',
        };
    }
  };

  const login = async (username, password, role = 'Master') => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const profile = getProfileForRole(role, username);
      const mockUser = {
        id: 'usr_' + Date.now(),
        username: username || 'user_admin',
        email: `${username || 'user'}@societyprime.com`,
        role: role,
        ...profile,
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

      setUser(mockUser);
      setUserToken(mockToken);
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const switchRole = (newRole) => {
    if (!user) return;
    const profile = getProfileForRole(newRole, user.username);
    setUser((prev) => ({
      ...prev,
      role: newRole,
      ...profile,
    }));
  };

  const logout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setUser(null);
    setUserToken(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userToken,
        isLoading,
        login,
        switchRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
