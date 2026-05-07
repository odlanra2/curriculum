import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { href: '#inicio',      label: 'Inicio'      },
  { href: '#habilidades', label: 'Skills'      },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#portafolio',  label: 'Portafolio'  },
  { href: '#sobre-mi',    label: 'Sobre mí'    },
  { href: '#contacto',    label: 'Contacto'    },
];

export const NavbarPage = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (open && drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleLinkClick = () => setOpen(false);

  if (location.pathname === '/admin') return null;

  return (
    <>
      <nav
        className="navbar"
        style={{ boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none' }}
      >
        <a href="/" className="navbar-logo">
          Arnal<span>do</span><span style={{ color: 'var(--accent3)' }}>.</span>
        </a>

        <ul className="navbar-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>

        <button
          className={`navbar-burger${open ? ' open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>
      </nav>

      <div ref={drawerRef} className={`navbar-drawer${open ? ' open' : ''}`}>
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href} onClick={handleLinkClick}>{l.label}</a></li>
          ))}
        </ul>
      </div>
    </>
  );
};
