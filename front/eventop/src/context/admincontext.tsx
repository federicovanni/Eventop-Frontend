"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AdminContextProps {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const adminToken = Cookies.get('adminToken');
    if (adminToken) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextProps => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};