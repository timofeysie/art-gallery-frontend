import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add header, navigation, etc. here */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      {/* Add footer here */}
    </div>
  );
};

export default MainLayout; 