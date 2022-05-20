import { SideNav } from ".";

function Layout({ children }) {
  return (
    <main className="flex flex-col gap-4 bg-indigo-50 sm:flex-row sm:p-1 max-w-full md:pt-6 sm:gap-6 md:gap-8 h-full">
      <SideNav />
      {children}
    </main>
  );
}

export default Layout;
