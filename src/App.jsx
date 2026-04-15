import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import CatalogPage from '@/pages/CatalogPage';
import SpecialistPage from '@/pages/SpecialistPage';
import MyBookingsPage from '@/pages/MyBookingsPage';
import StubPage from '@/pages/StubPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/specialists/:id" element={<SpecialistPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/profile" element={<StubPage title="Мій профіль" />} />
          <Route path="/dashboard" element={<StubPage title="Дашборд" />} />
          <Route path="/documents" element={<StubPage title="Документи" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
