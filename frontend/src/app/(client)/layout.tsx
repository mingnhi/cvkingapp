// Layout.js
import { ClientLayout } from '@/components/layout/MainLayout';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ClientLayout>
        {children}
    </ClientLayout>;

};

export default Layout;
