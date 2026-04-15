import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-full">
      <Header />
      <main className="container py-10">
        <Outlet />
      </main>
    </div>
  );
}
