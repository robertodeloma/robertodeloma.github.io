/* ============================================================
   ROBERTO DE LOMA-OSSORIO SALAS — PORTFOLIO & CV INTERACTIVITY
   Interactive Sysadmin Animations, Network Topology & Console
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Sysadmin Boot Sequence
  initBootSequence();

  // 2. Hero Interactive Network Topology Canvas
  initNetworkCanvas();

  // 3. Hero Typewriter Eyebrow
  initHeroTypewriter();

  // 4. Project Card 3D Tilt
  initCardTilt();

  // 5. Scroll Stagger Reveal
  initScrollReveal();

  // 6. Interactive Sysadmin Terminal Console
  initTerminal();

  // 7. Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  // 8. Theme Toggle (Dark / Light)
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
      themeToggle.setAttribute('title', 'Cambiar a modo oscuro');
    } else {
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
      themeToggle.setAttribute('title', 'Cambiar a modo claro');
    }
  }

  // 9. Navigation Active Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -70% 0px' });

  sections.forEach(sec => navObserver.observe(sec));

  // 10. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 11. Projects Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card, idx) => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.removeAttribute('data-hidden');
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = `popIn 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 40}ms both`;
          });
        } else {
          card.setAttribute('data-hidden', 'true');
        }
      });
    });
  });

  // Dynamic keyframes for filter animation
  const filterStyle = document.createElement('style');
  filterStyle.textContent = `@keyframes popIn { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: none; } }`;
  document.head.appendChild(filterStyle);

  // 12. Copy Email with Toast Feedback
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('copy-toast');

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = copyBtn.getAttribute('data-email') || 'robertodeloma10@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Correo copiado al portapapeles');
      }).catch(() => {
        showToast('✓ ' + email);
      });
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  }

  // 13. Print / Save CV button & print listeners
  let prePrintTheme = 'dark';
  window.addEventListener('beforeprint', () => {
    prePrintTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', 'light');
  });

  window.addEventListener('afterprint', () => {
    document.documentElement.setAttribute('data-theme', prePrintTheme);
  });

  const downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      showToast('Descargando CV_Roberto_de_Loma-Ossorio_Salas.pdf...');
    });
  }

  /* ------------------------------------------------------------
     FUNCTIONS: BOOT, NETWORK CANVAS, TERMINAL, TILT, TYPEWRITER
  ------------------------------------------------------------ */

  // Sysadmin Boot Sequence
  function initBootSequence() {
    const overlay = document.getElementById('boot-overlay');
    const body = document.getElementById('boot-body');
    if (!overlay || !body) return;

    if (isReducedMotion || sessionStorage.getItem('sys_booted')) {
      overlay.remove();
      return;
    }

    const lines = [
      { text: '[<span class="boot-tag-ok">  OK  </span>] systemd 252.5: Initializing network interfaces (192.168.1.0/24)...', delay: 70 },
      { text: '[<span class="boot-tag-ok">  OK  </span>] Active Directory Domain Services &amp; DNS replication synchronized.', delay: 75 },
      { text: '[<span class="boot-tag-ok">  OK  </span>] Mounting VMware ESXi 7.0 &amp; Hyper-V virtual pools...', delay: 85 },
      { text: '[<span class="boot-tag-ok">  OK  </span>] Container runtime: Docker daemon &amp; Kubernetes kubelet ready.', delay: 80 },
      { text: '[<span class="boot-tag-info"> INFO </span>] Stratio GenAI Data Fabric &amp; Azure AI Nodes connected.', delay: 90 },
      { text: '[<span class="boot-tag-ok">  OK  </span>] Loading Roberto de Loma-Ossorio Salas Portfolio environment...', delay: 85 },
      { text: '<span class="boot-tag-cmd">$ systemctl start sysadmin-portfolio.service --now</span>', delay: 180 },
    ];

    let current = 0;
    let finished = false;

    function finishBoot() {
      if (finished) return;
      finished = true;
      sessionStorage.setItem('sys_booted', 'true');
      overlay.classList.add('fade-out');
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 420);
    }

    // Dismiss on click or any keypress
    overlay.addEventListener('click', finishBoot);
    window.addEventListener('keydown', finishBoot, { once: true });

    function printNextLine() {
      if (finished) return;
      if (current >= lines.length) {
        setTimeout(finishBoot, 350);
        return;
      }

      const item = lines[current];
      const div = document.createElement('div');
      div.className = 'boot-line';
      div.innerHTML = item.text + (current === lines.length - 1 ? '<span class="boot-cursor"></span>' : '');
      body.appendChild(div);

      requestAnimationFrame(() => div.classList.add('visible'));
      body.scrollTop = body.scrollHeight;

      current++;
      setTimeout(printNextLine, item.delay);
    }

    printNextLine();
  }

  // Hero Network Topology Canvas (Optimized 60-120fps GPU friendly)
  function initNetworkCanvas() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas || isReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let canvasRect = canvas.getBoundingClientRect();

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      canvasRect = canvas.getBoundingClientRect();
    }, { passive: true });

    window.addEventListener('scroll', () => {
      if (isHeroVisible) {
        canvasRect = canvas.getBoundingClientRect();
      }
    }, { passive: true });

    // Balanced node count: sleek visuals without O(N^2) CPU drag
    const nodeCount = Math.min(24, Math.max(14, Math.floor(width / 45)));
    const nodes = [];
    const packets = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 1.6,
        isServer: Math.random() > 0.72,
        pulse: Math.random() * Math.PI * 2
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const hero = document.getElementById('hero');
    hero.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX - canvasRect.left;
      mouse.y = e.clientY - canvasRect.top;
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    }, { passive: true });

    // Spawn packets along lines periodically
    setInterval(() => {
      if (!isHeroVisible || nodes.length < 2) return;
      const a = Math.floor(Math.random() * nodes.length);
      let closest = -1;
      let minD = 135;
      for (let j = 0; j < nodes.length; j++) {
        if (a === j) continue;
        const dx = nodes[a].x - nodes[j].x;
        const dy = nodes[a].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < minD) {
          minD = d;
          closest = j;
        }
      }
      if (closest !== -1) {
        packets.push({
          from: a,
          to: closest,
          progress: 0,
          speed: 0.016 + Math.random() * 0.018
        });
      }
    }, 550);

    let isHeroVisible = true;
    let rafId = null;

    function renderFrame() {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const lineBaseColor = isDark ? 'rgba(56, 189, 248,' : 'rgba(2, 132, 199,';
      const nodeColor = isDark ? '#38bdf8' : '#0284c7';
      const serverColor = isDark ? '#34d399' : '#059669';

      // Update and draw nodes (NO expensive shadowBlur to guarantee 60-120fps)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        n.pulse += 0.025;

        // Mouse attraction
        const dxMouse = mouse.x - n.x;
        const dyMouse = mouse.y - n.y;
        const dMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (dMouse < 130) {
          n.x += dxMouse * 0.012;
          n.y += dyMouse * 0.012;
        }

        // Draw core node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + Math.sin(n.pulse) * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = n.isServer ? serverColor : nodeColor;
        ctx.fill();

        // Draw clean outer ring for servers (fast vector path, zero blur lag)
        if (n.isServer) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? 'rgba(52, 211, 153, 0.4)' : 'rgba(5, 150, 105, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Connect nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.24;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `${lineBaseColor} ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (dMouse < 130) {
          const alpha = (1 - dMouse / 130) * 0.38;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw and update packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1 || !nodes[pkt.from] || !nodes[pkt.to]) {
          packets.splice(p, 1);
          continue;
        }

        const n1 = nodes[pkt.from];
        const n2 = nodes[pkt.to];
        const px = n1.x + (n2.x - n1.x) * pkt.progress;
        const py = n1.y + (n2.y - n1.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#34d399' : '#059669';
        ctx.fill();
      }
    }

    function loop() {
      if (!isHeroVisible) {
        rafId = null;
        return;
      }
      renderFrame();
      rafId = requestAnimationFrame(loop);
    }

    // Automatically pause canvas execution when hero is offscreen
    const heroObserver = new IntersectionObserver((entries) => {
      isHeroVisible = entries[0].isIntersecting;
      if (isHeroVisible && !rafId) {
        rafId = requestAnimationFrame(loop);
      }
    }, { threshold: 0 });
    heroObserver.observe(hero);

    // Initial start
    rafId = requestAnimationFrame(loop);
  }

  // Hero Typewriter Eyebrow
  function initHeroTypewriter() {
    const eyebrow = document.querySelector('.hero-eyebrow');
    if (!eyebrow || isReducedMotion) return;

    const fullText = eyebrow.getAttribute('data-full') || eyebrow.textContent;
    eyebrow.textContent = '';

    let i = 0;
    function type() {
      if (i <= fullText.length) {
        eyebrow.textContent = fullText.slice(0, i++);
        setTimeout(type, 35 + Math.random() * 25);
      } else {
        eyebrow.classList.add('done');
      }
    }

    setTimeout(type, 300);
  }

  // Project Card 3D Tilt (Optimized with cached rect and RAF)
  function initCardTilt() {
    if (isReducedMotion) return;
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
      let rect = null;
      let ticking = false;

      card.addEventListener('mouseenter', () => {
        rect = card.getBoundingClientRect();
      }, { passive: true });

      card.addEventListener('mousemove', (e) => {
        if (!rect || ticking) return;
        ticking = true;
        const clientX = e.clientX;
        const clientY = e.clientY;
        requestAnimationFrame(() => {
          if (!rect) { ticking = false; return; }
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5;
          const rotateY = ((x - centerX) / centerX) * 5;
          card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
          ticking = false;
        });
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        rect = null;
        card.style.transform = '';
      });
    });
  }

  // Smooth Scroll Reveal System (Elements appear gradually as you scroll)
  function initScrollReveal() {
    if (isReducedMotion) return;

    // Comprehensive selector list: all sections, cards, and modules reveal gracefully
    const selectors = [
      '.section-header',
      '.about-grid > *',
      '.stat-card',
      '.timeline-item',
      '.cert-card',
      '.skill-category-card',
      '.projects-grid .project-card',
      '.pfg-card',
      '.pfg-architecture-card',
      '.pfg-specs-card',
      '.edu-card',
      '.contact-card',
      '.contact-form-card'
    ];

    const elementsToReveal = document.querySelectorAll(selectors.join(', '));
    elementsToReveal.forEach((el) => {
      el.classList.add('stagger-item');
    });

    // Stagger delay within key grids so children reveal in smooth cascade
    const staggerContainers = [
      { sel: '.certifications-grid', step: 75, max: 4 },
      { sel: '.skills-bento', step: 80, max: 4 },
      { sel: '.projects-grid', step: 85, max: 3 },
      { sel: '.stats-grid', step: 70, max: 4 },
      { sel: '.edu-grid', step: 90, max: 2 }
    ];

    staggerContainers.forEach(({ sel, step, max }) => {
      const container = document.querySelector(sel);
      if (container) {
        const items = container.querySelectorAll('.stagger-item');
        items.forEach((item, idx) => {
          item.style.transitionDelay = `${(idx % max) * step}ms`;
        });
      }
    });

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -45px 0px',
      threshold: 0.05
    });

    elementsToReveal.forEach(el => revealObs.observe(el));
  }

  // Interactive Sysadmin Terminal Console
  function initTerminal() {
    const trigger = document.getElementById('terminal-trigger-btn');
    const modal = document.getElementById('terminal-modal');
    const closeBtn = document.getElementById('term-close-btn');
    const input = document.getElementById('terminal-input');
    const history = document.getElementById('terminal-history');
    const body = document.getElementById('terminal-body');

    if (!trigger || !modal || !input) return;

    trigger.addEventListener('click', () => {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      input.focus();
    });

    function closeTerminal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeTerminal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTerminal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeTerminal();
      }
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        modal.classList.toggle('open');
        if (modal.classList.contains('open')) input.focus();
      }
    });

    const commandList = {
      help: () => `Comandos disponibles:
  <span class="term-cyan">cv</span>        - Descargar CV (PDF) de Roberto de Loma-Ossorio
  <span class="term-cyan">whoami</span>    - Información del perfil profesional
  <span class="term-cyan">skills</span>    - Stack de virtualización, servidores y redes
  <span class="term-cyan">certs</span>     - Certificaciones oficiales Microsoft y Stratio
  <span class="term-cyan">pfg</span>       - Detalles del Proyecto Fin de Grado ASIR
  <span class="term-cyan">neofetch</span>  - Telemetría y especificaciones del sistema
  <span class="term-cyan">ping</span>      - Simulación de conectividad ICMP
  <span class="term-cyan">contact</span>   - Canales directos de contacto
  <span class="term-cyan">clear</span>     - Limpiar pantalla
  <span class="term-cyan">exit</span>      - Cerrar consola`,

      cv: () => {
        const link = document.createElement('a');
        link.href = 'CV_Roberto_de_Loma-Ossorio_Salas.pdf';
        link.download = 'CV_Roberto_de_Loma-Ossorio_Salas.pdf';
        link.click();
        return 'Descargando <span class="term-cyan">CV_Roberto_de_Loma-Ossorio_Salas.pdf</span>...';
      },

      whoami: () => `<strong>Roberto de Loma-Ossorio Salas</strong>
Puesto: Técnico de Analítica Avanzada &amp; Administrador de Sistemas
Empresa: Grupo Solutia · Sevilla, España
Enfoque: Virtualización, VMware ESXi, VDI en Justicia, Kubernetes, Docker, Azure AI y Stratio GenAI Data Fabric.`,

      skills: () => `[ STACK SYSADMIN &amp; CLOUD ]
• Virtualización: VMware ESXi, Hyper-V, VirtualBox, VDI
• Contenedores:   Docker, Kubernetes (K8s)
• Cloud &amp; IA:     Microsoft Azure, Azure AI (AI-900), Copilot (AB-900), Stratio Data Fabric
• Sistemas:       Windows Server (2012/2019/2022), Active Directory, GPOs, Linux (Ubuntu/Debian)
• Redes &amp; Soporte: DNS, DHCP Failover, TCP/IP, VLANs, VPNs, Grafana, Jira
• Bases de Datos: SQL Server, MySQL, PostgreSQL, phpMyAdmin, WordPress`,

      certs: () => `[ CERTIFICACIONES OFICIALES ]
1. Microsoft Certified: Azure AI Fundamentals (AI-900)
2. Microsoft 365 Copilot &amp; Agent Administration Fundamentals (AB-900)
3. Stratio Generative AI Data Fabric — Certificación Operaciones (v14.1)
4. Stratio Generative AI Data Processing Certification (v14.8)
5. Stratio Generative AI Data Governance Certification (v14.8)
6. Stratio Generative AI Data Fabric Basics Certification (v14.8)`,

      pfg: () => `[ PROYECTO FIN DE GRADO ASIR · IES TRIANA ]
Título: Despliegue de Infraestructura de Red y Servicios para Entorno Educativo
Servidores: 2x Windows Server 2022 (AD DS, DHCP Failover 50/50, DNS) + 1x Ubuntu LAMP (Moodle, WordPress SSO con LDAP)
Documento oficial disponible: Memoria_Proyecto_ASIR_Roberto_Salas.pdf (53 páginas)`,

      neofetch: () => `<span class="term-green">
       .---.          <strong style="color:#f8fafc;">roberto@solutia-srv</strong>
      /     \\         ----------------------
     | () () |        <strong>OS:</strong> Ubuntu 22.04 LTS / Windows Server 2022
      \\  _  /         <strong>Host:</strong> VMware ESXi / Hyper-V Cluster
       \`---\`          <strong>Kernel:</strong> Linux 6.8.0-sysadmin-cloud
                      <strong>Uptime:</strong> 4+ años en soporte y administración TIC
                      <strong>Shell:</strong> bash 5.2 / PowerShell 7.4
                      <strong>Cluster:</strong> Kubernetes &amp; Docker Engine
                      <strong>Fabric:</strong> Stratio GenAI Data Fabric
                      <strong>Ubicación:</strong> Sevilla, España
</span>`,

      ping: () => `PING solutia.es (192.168.1.1): 56 data bytes
64 bytes from solutia.es: icmp_seq=0 ttl=64 time=11.2 ms
64 bytes from solutia.es: icmp_seq=1 ttl=64 time=10.8 ms
64 bytes from solutia.es: icmp_seq=2 ttl=64 time=11.5 ms
--- solutia.es ping statistics: 3 packets transmitted, 3 received, 0.0% packet loss ---
rtt min/avg/max = 10.8/11.1/11.5 ms`,

      contact: () => `• Email:    <a href="mailto:robertodeloma10@gmail.com" class="term-cyan">robertodeloma10@gmail.com</a>
• LinkedIn: <a href="https://www.linkedin.com/in/roberto-de-loma-ossorio-salas-042647317" target="_blank" class="term-cyan">linkedin.com/in/roberto-de-loma-ossorio-salas</a>
• GitHub:   <a href="https://github.com/robertodeloma" target="_blank" class="term-cyan">github.com/robertodeloma</a>`,

      clear: () => null,
      cls: () => null,
      exit: () => {
        closeTerminal();
        return '';
      }
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim().toLowerCase();
        input.value = '';
        if (!val) return;

        if (val === 'clear' || val === 'cls') {
          history.innerHTML = '';
          return;
        }

        const entry = document.createElement('div');
        entry.className = 'term-entry';

        const cmdLine = document.createElement('div');
        cmdLine.className = 'term-cmd-line';
        cmdLine.innerHTML = `<span class="term-cmd-prompt">roberto@solutia:~$</span> ${val}`;
        entry.appendChild(cmdLine);

        const outLine = document.createElement('div');
        outLine.className = 'term-output';

        if (commandList[val]) {
          const res = commandList[val]();
          if (res !== null) outLine.innerHTML = res;
        } else {
          outLine.innerHTML = `<span class="term-warn">Comando no reconocido: '${val}'. Escribe <span class="term-cyan">help</span> para ver las opciones disponibles.</span>`;
        }

        entry.appendChild(outLine);
        history.appendChild(entry);
        body.scrollTop = body.scrollHeight;
      }
    });
  }
});
