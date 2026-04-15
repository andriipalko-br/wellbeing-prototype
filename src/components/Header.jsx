import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { to: '/', label: 'Каталог', end: true },
  { to: '/my-bookings', label: 'Мої записи' },
  { to: '/profile', label: 'Мій профіль' },
  { to: '/dashboard', label: 'Дашборд' },
  { to: '/documents', label: 'Документи' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-200/70 bg-white/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between gap-6">
        <NavLink to="/" className="flex items-center gap-2 py-2">
          <img src="./logo.webp" alt="Wellbeing" className="h-12 w-auto sm:h-14" />
        </NavLink>
        <nav className="flex min-w-0 items-center gap-1 md:gap-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  'relative rounded-md px-3 py-2 text-sm font-bold transition-colors whitespace-nowrap',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={cn(
                      'pointer-events-none absolute left-3 right-3 bottom-1 h-[2px] rounded-full bg-primary transition-transform duration-200 origin-left',
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
