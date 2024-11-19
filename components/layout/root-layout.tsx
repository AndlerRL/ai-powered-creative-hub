'use client'

import { FilterProvider } from '@/hooks/context/layout-filter';
import FilterSidebar from './filter-sidebar';


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FilterProvider>
      <aside className="w-64 border-r">
        <FilterSidebar />
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </FilterProvider>
  );
};

export default Layout;