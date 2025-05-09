import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6 text-black">
        {children}
      </main>
    </div>
  );
};

export default Layout;
