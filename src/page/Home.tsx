import { useState, useEffect, useRef } from 'react';



 
/* ── TYPEWRITER HOOK ── */
const useTypewriter = (phrases: string[], speed = 80, deleteSpeed = 40, pause = 1800) => {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const [idx, setIdx] = useState(0);
  const charRef = useRef(0);
   


  useEffect(() => {
    const current = phrases[idx];
    let timeout: NodeJS.Timeout;

    if (phase === 'typing') {
      if (charRef.current < current.length) {
        timeout = setTimeout(() => {
          charRef.current++;
          setDisplayed(current.slice(0, charRef.current));
        }, speed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pause);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 300);
    } else {
      if (charRef.current > 0) {
        timeout = setTimeout(() => {
          charRef.current--;
          setDisplayed(current.slice(0, charRef.current));
        }, deleteSpeed);
      } else {
        setIdx((i) => (i + 1) % phrases.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, idx, phrases, speed, deleteSpeed, pause]);

  return displayed;
};

/* ── SKILLS DATA ── */
const skills = [
  { icon: '🐘', name: 'PHP', pct: 92 },
  { icon: '☕', name: 'Java', pct: 75 },
  { icon: '⚡', name: 'JavaScript', pct: 90 },
  { icon: '⚛️', name: 'React', pct: 88 },
  { icon: '🅰️', name: 'Angular', pct: 78 },
  { icon: '💚', name: 'Vue.js', pct: 82 },
  { icon: '🔴', name: 'Laravel', pct: 91 },
  { icon: '🟦', name: 'TypeScript', pct: 80 },
  { icon: '🐬', name: 'MySQL', pct: 87 },
  { icon: '🐘', name: 'PostgreSQL', pct: 82 },
  { icon: '🟠', name: 'WordPress', pct: 85 },
  { icon: '🔷', name: 'CodeIgniter', pct: 79 },
];

/* ── EXPERIENCE DATA ── */
const experiences = [
  {
    company: 'Fénixpuntonet S.A.S',
    role: 'DESARROLLADOR DE SOFTWARE A MEDIDA + IA',
    date: 'Enero 2025 - Actualidad',
    desc: 'Lideré el desarrollo y mantenimiento de sistemas críticos como ERP y Facturación Electrónica, Website etc, optimizando la integridad de los datos y el rendimiento del sistema con buenas prácticas de patrones de diseño y desacoplamiento. Automaticé los flujos de despliegue y control de versiones, Administré infraestructuras en la nube, logre reducir procesos que se hacian manuales codigo mas limpio y escalable.'
,
    tags: ['Laravel', 'Vue.js', 'React', 'MySQL','Python','Wordpress','REST API','GIT','CI/CD','Docker','AWS'],
  },
  {
    company: 'Contractor Campus',
    role: 'DESARROLLADOR FULL-STACK PROGRAMMING',
    date: 'Abril 2022 - Diciembre 2024',
    desc: 'Desarrollé aplicaciones web fullstack Trabajé principalmente con PHP (nativo y Laravel) y JavaScript (Vue, Nuxt y React),  donde traducía diseños UI/UX a interfaces funcionales, Gestioné el flujo de trabajo con Git, apoyé procesos de despliegue y automatización usando GitHub Actions. Logre dejar codigo mas limpio y mantenible y test de pruebas mas faciles.',
    tags: ['PHP', 'Laravel', 'Java', 'Bootstrap', 'jQuery', 'MySQL', 'Joomla','Vue','Nuxt','React'],
  },
  {
    company: 'GRADIWEB',
    role: 'Desarrollador web (wordpress)',
    date: 'Octubre 2019 - Febrero 2020',
    desc: 'En este rol me enfoqué en el desarrollo de sitios web a medida utilizando WordPress, creando soluciones completamente personalizadas según los requerimientos de cada proyecto. Trabajé en la construcción y personalización de tiendas en WooCommerce, realizando modificaciones tanto a nivel de frontend como de backend e incluso desarrollando funcionalidades desde cero cuando era necesario.',
    tags: ['PHP', 'Wordpress', 'Bootstrap', 'jQuery', 'MySQL', 'React'],
  },
];

/* ── SKILL CARD ── */
const SkillCard = ({ icon, name, pct }: { icon: string; name: string; pct: number }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="skill-card" ref={ref}>
      <span className="skill-icon">{icon}</span>
      <span className="skill-name">{name}</span>
      <div className="skill-bar-wrap">
        <div className="skill-bar" style={{ width: animated ? `${pct}%` : '0%' }} />
      </div>
    </div>
  );
};
// 1. Define la estructura del objeto


   
  

/* ── MAIN HOME ── */
export const Home = () => {
  const typed = useTypewriter(['Full-Stack Developer', 'PHP / Laravel y Wordpress Expert', 'React & Angular Dev', 'Software Engineer + IA']);
  interface IFormData {
    nombre: string;
    email: string;
    mensaje: string;
  }
  const [formData, setFormData] = useState<IFormData>({
    nombre: "",
    email: "",
    mensaje: "",
  });

   const [error, setError] = useState("");
  
  const validarEmail = (email:string) => {
    // Expresión regular simple para validar email
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

   const handleSubmit = () => {
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validarEmail(formData.email)) {
      setError("El correo electrónico no es válido.");
      return;
    }

    setError(""); // limpiar errores si todo está bien
    
    
    
    const telefono = "573216663861"; // Cambia por tu número
    const mensaje = `Hola, soy ${formData.nombre} (%20${formData.email}%20).%0A%0A${formData.mensaje}`;
    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, "_blank");
  };
  return (
    <>
      {/* ORBS */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* ── HERO ── */}
      <section id="inicio">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-tag animate-fade-up">
              <span className="hero-tag-dot" />
              Disponible para proyectos
            </div>

            <h1 className="hero-title animate-fade-up delay-1">
              <span className="line">Hola, soy</span>
              <span className="line accent-word">Arnaldo.</span>
            </h1>

            <div className="hero-typewriter animate-fade-up delay-2">
              {typed}<span className="cursor" />
            </div>

            <p className="hero-desc animate-fade-up delay-3">
             Full Stack Developer + IA especializado en PHP (Laravel · Symfony)  experiencia en frontend
              moderno (React · Vue · Angular). He construido ecosistemas complejos como ERPs, e-Invoicing
              microservicios, ecommerce, integrando servicios en Java(Spring Boot) y Python según las
              necesidades del proyecto. Aplico prácticas DevOps (CI/CD, Docker, AWS) para garantizar despliegues
              confiables y entregas continuas.

            </p>

            <div className="hero-actions animate-fade-up delay-4">
              <a download="resumen" href="/image/resumen.pdf" className="btn-primary">Descargar resumen ↓</a>
              <a href="#portafolio" className="btn-outline">Ver portafolio</a>
              {/*<a  download="resumen" href="/image/resumen.pdf" className="btn-outline">Resumen</a>*/}
            </div>

            <div className="hero-stats animate-fade-up delay-5">
              {/*<div><span className="stat-num">40+</span><span className="stat-label">Proyectos</span></div>
              <div><span className="stat-num">12+</span><span className="stat-label">Tecnologías</span></div>*/}
            </div>
          </div>

          <div className="hero-img-wrap animate-fade-up delay-2">
            <div className="hero-img-ring" />
            <img
              className="hero-img"
              src="/image/FotoArnaldo.png"
              alt="Arnaldo"
            />
          </div>
        </div>
      </section>

      {/* ── HABILIDADES ── */}
      <section id="habilidades" style={{ background: 'var(--bg2)' }}>
        <div className="section-wrap">
          <p className="section-label">Stack tecnológico</p>
          <h2 className="section-title">Mis Habilidades</h2>
          <p className="section-sub">Tecnologías que domino para construir productos digitales de alto impacto.</p>
          <div className="skills-grid">
            {skills.map((s) => <SkillCard key={s.name} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCIA ── */}
      <section id="experiencia">
        <div className="section-wrap">
          <p className="section-label">Trayectoria profesional</p>
          <h2 className="section-title">Experiencia</h2>
          <p className="section-sub">años construyendo soluciones que importan.</p>
          <div className="exp-list">
            {experiences.map((e) => (
              <div className="exp-card" key={e.company}>
                <div>
                  <div className="exp-company">{e.company}</div>
                  <div className="exp-role">{e.role}</div>
                </div>
                <div className="exp-date">{e.date}</div>
                <p className="exp-desc">{e.desc}</p>
                <div className="exp-tags">
                  {e.tags.map((t) => <span className="exp-tag" key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE MI ── */}
      <section id="sobre-mi" style={{ background: 'var(--bg2)' }}>
        <div className="section-wrap">
          <div className="about-grid">
            <img
              className="about-img"
              src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=900&auto=format&fit=crop"
              alt="Workspace"
            />
            <div className="about-text">
              <p className="section-label">Un poco sobre mí</p>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Apasionado por el código y los resultados</h2>
              <p>Soy una persona con fuertes competencias interpersonales, capacidad de gestión y actitud de liderazgo. Me enfoco en entregar soluciones de calidad con efectividad.</p>
              <p>Mi experiencia abarca desde aplicaciones empresariales hasta plataformas de comercio electrónico, siempre con atención al detalle y las mejores prácticas.</p>
              <a href="#contacto" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>Trabajemos juntos →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTAFOLIO ── */}
      <section id="portafolio">
        <div className="section-wrap">
          <p className="section-label">Trabajos destacados</p>
          <h2 className="section-title">Portafolio</h2>
          <p className="section-sub">Proyectos reales construidos con tecnología moderna.</p>
          <div className="portfolio-grid">

            <div className="port-card port-featured">
              <div className="port-img-wrap">
                <img src="/image/portafolio/cousbox.png" alt="E-commerce" className="port-img" />
                <div className="port-overlay">
                  <div className="port-links">
                    <a href="https://cousbox.com/" target="_blank" className="port-link">Ver sitio →</a>
                    {/*<a href="https://github.com/odlanra2" target="_blank" rel="noreferrer" className="port-link-ghost">GitHub</a>*/}
                  </div>
                </div>
              </div>
              <div className="port-info">
                <span className="port-type">E-Commerce</span>
                <h3 className="port-title">Plataforma de ventas online</h3>
                <p className="port-desc">Sistema completo con carrito, pasarela de pago, panel admin y gestión de inventario en tiempo real, a medida, seguridad, SEO</p>
                <div className="port-techs">
                  <span className="port-tech">Wordpress</span><span className="port-tech">React</span><span className="port-tech">MySQL</span><span className="port-tech">Php</span>
                </div>
              </div>
            </div>

            <div className="port-card">
              <div className="port-img-wrap">
                <img src="/image/portafolio/satori.png" alt="Dashboard" className="port-img" />
                <div className="port-overlay"><div className="port-links"><a href="https://satoribelleza.com/" target="_blank" className="port-link">Ver sitio →</a></div></div>
              </div>
              <div className="port-info">
                 <span className="port-type">E-commerce</span>
                 <h3 className="port-title">Plataforma de venta online</h3>
                 <p className="port-desc">Sistema completo con carrito, pasarela de pago, panel admin, a medida </p>
                <span className="port-tech">Wordpress</span><span className="port-tech">React</span><span className="port-tech">MySQL</span><span className="port-tech">Php</span>
              </div>
            </div>

            <div className="port-card">
              <div className="port-img-wrap">
                <img src="/image/portafolio/fabuleuse.png" alt="CMS" className="port-img" />
                <div className="port-overlay"><div className="port-links"><a href="https://fabuleusefrenchfabrique.fr/" target="_blank" className="port-link">Ver sitio →</a></div></div>
              </div>
              <div className="port-info">
                <span className="port-type">Blog</span>
                <h3 className="port-title">Sitio innformativo y blog</h3>
                <p className="port-desc">Tema WordPress personalizado con constructores visuales, SEO optimizado, seguridad y velocidad máxima.</p>
                <div className="port-techs"><span className="port-tech">WordPress</span><span className="port-tech">PHP</span><span className="port-tech">react</span></div>
              </div>
            </div>

            <div className="port-card">
              <div className="port-img-wrap">
                <img src="/image/portafolio/itel.png" alt="API" className="port-img" />
                <div className="port-overlay"><div className="port-links"><a href="https://itelcorp.com" target="_blank" className="port-link">Ver sitio →</a></div></div>
              </div>
              <div className="port-info">
                <span className="port-type">Informativo</span>
                <h3 className="port-title">Sitio informativo</h3>
                <p className="port-desc">Tema WordPress personalizado con constructores visuales, Elementor, SEO optimizado, seguridad y velocidad máxima.</p>
                <div className="port-techs"><span className="port-tech">Worpress</span><span className="port-tech">Elementor</span><span className="port-tech">MySQL</span></div>
              </div>
            </div>

            <div className="port-card">
              <div className="port-img-wrap">
                <img src="/image/portafolio/navicu.png" alt="CMS" className="port-img" />
                <div className="port-overlay"><div className="port-links"><a href="https://www.navicu.com/" target="_blank" className="port-link">Ver sitio →</a></div></div>
              </div>
              <div className="port-info">
                <span className="port-type">Navicu</span>
                <h3 className="port-title">Portal de Reservas y Destinos</h3>
                <p className="port-desc">Tema WordPress personalizado con constructores visuales, SEO optimizado, seguridad y velocidad máxima.</p>
                <div className="port-techs"><span className="port-tech">Laravel</span><span className="port-tech">Angular</span><span className="port-tech">Api rest</span><span className="port-tech">MySQL</span><span className="port-tech">Java</span></div>
              </div>
            </div>
             <div className="port-card">
              <div className="port-img-wrap">
                <img src="/image/portafolio/transucarcar.png" alt="CMS" className="port-img" />
                <div className="port-overlay"><div className="port-links"><a  className="port-link">Ver demo →</a></div></div>
              </div>
              <div className="port-info">
                <span className="port-type">Transurcar</span>
                <h3 className="port-title">ERP operativo de trazabilidad de vehiculos de carga</h3>
                <p className="port-desc">Seguimiento de camiones y otros vehiculos de carga, Geolocalizacion,trazabilidad, Encuestas, roles de usuario, Progressive Web App, socket etc</p>
                <div className="port-techs"><span className="port-tech">Codeigniter</span><span className="port-tech">PWA</span><span className="port-tech">Node.js</span><span className="port-tech">Posgresql</span><span className="port-tech">Api rest</span></div>
              </div>
            </div>

             <div className="port-card">
              <div className="port-img-wrap">
                <img src="/image/portafolio/frigorivalle.png" alt="CMS" className="port-img" />
                <div className="port-overlay"><div className="port-links"><a className="port-link">Ver demo →</a></div></div>
              </div>
              <div className="port-info">
                <span className="port-type">Agroindustria</span>
                <h3 className="port-title">ERP operativo Agroindustrial</h3>
                <p className="port-desc">Este ERP es una solución tecnológica integral para la gestión de frigoríficos y plantas de beneficio, diseñada para controlar todo el ciclo de vida del producto cárnico, desde que el animal llega en el camión hasta que sale hacia el cliente.</p>
                <div className="port-techs"><span className="port-tech">Symfony</span><span className="port-tech">Python</span><span className="port-tech">Mysql</span><span className="port-tech">Ext JS</span><span className="port-tech">Php</span><span className="port-tech">Node</span></div>
              </div>
            </div>

            <div className="port-card">
              <div className="port-img-wrap">
                <img src="/image/portafolio/asocarnes.png" alt="CMS" className="port-img" />
                <div className="port-overlay"><div className="port-links"><a className="port-link">Ver demo →</a></div></div>
              </div>
              <div className="port-info">
                <span className="port-type">ERP Administrativo</span>
                <h3 className="port-title">ERP Comercial y Administrativo.</h3>
                <p className="port-desc"> Control de venta (dinero, factura, stock de productos), sistema desacoplado ApirestFull</p>
                <div className="port-techs"><span className="port-tech">React</span><span className="port-tech">Laravel</span><span className="port-tech">JWT</span><span className="port-tech">Mysql</span></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto">
        <div className="section-wrap">
          <p className="section-label">¿Tienes un proyecto?</p>
          <h2 className="section-title">Contáctame</h2>
          <div className="contact-wrap">
            <div className="contact-info">
              <h3>Trabajemos juntos</h3>
              <p>¿Necesitas un desarrollador Full-Stack para tu próximo proyecto? Escríbeme y conversemos.</p>
              <a className="contact-link" href="mailto:arnaldolameda@gmail.com">
                <span className="contact-link-icon">✉️</span> arnaldolameda@gmail.com
              </a>
              <a className="contact-link" href="https://github.com/odlanra2" target="_blank" rel="noreferrer">
                <span className="contact-link-icon">🐙</span> github.com/odlanra2
              </a>
              <a className="contact-link" href="https://www.linkedin.com/in/arnaldo-lameda-03aa92122/" target="_blank" rel="noreferrer">
                <span className="contact-link-icon">💼</span> LinkedIn
              </a>
            </div>
            <div className="contact-form">
              <div className="form-field">
                <label className="form-label">Nombre</label>
                <input 
                className="form-input" 
                type="text" 
                 placeholder="Tu nombre" 
                 name="nombre"
                 value={formData.nombre}
                 onChange={handleChange}
                
                />
              </div>
              <div className="form-field">
                <label className="form-label">Email</label>
                <input 
                className="form-input" 
                type="email" 
                placeholder="tu@email.com" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                
                />
              </div>
              <div className="form-field">
                <label className="form-label">Mensaje</label>
                <textarea 
                className="form-textarea" 
                placeholder="Cuéntame sobre tu proyecto..." 
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                
                />
              </div>

              <button onClick={handleSubmit} className="btn-primary" style={{ marginTop: '8px' }}>Enviar mensaje →</button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <p>Hecho con ❤️ por <span>Arnaldo</span> {/*new Date().getFullYear()*/}</p>
      </footer>
    </>
  );
};
