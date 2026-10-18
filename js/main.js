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

  const printBtn = document.getElementById('print-cv-btn');
  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
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

  // Hero Network Topology Canvas
  function initNetworkCanvas() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas || isReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    const nodeCount = Math.min(36, Math.floor(width / 32));
    const nodes = [];
    const packets = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.8,
        isServer: Math.random() > 0.75,
        pulse: Math.random() * Math.PI * 2
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const hero = document.getElementById('hero');
    hero.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // Spawn packets along lines periodically
    setInterval(() => {
      if (nodes.length < 2) return;
      const a = Math.floor(Math.random() * nodes.length);
      let closest = -1;
      let minD = 140;
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
          speed: 0.015 + Math.random() * 0.02
        });
      }
    }, 450);

    let isVisible = true;
    const heroObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    heroObserver.observe(hero);

    function animate() {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        const lineBaseColor = isDark ? 'rgba(56, 189, 248,' : 'rgba(2, 132, 199,';
        const nodeColor = isDark ? '#38bdf8' : '#0284c7';
        const serverColor = isDark ? '#34d399' : '#059669';

        // Update and draw nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          n.pulse += 0.03;

          // Mouse attraction
          const dxMouse = mouse.x - n.x;
          const dyMouse = mouse.y - n.y;
          const dMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (dMouse < 140) {
            n.x += dxMouse * 0.015;
            n.y += dyMouse * 0.015;
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + Math.sin(n.pulse) * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = n.isServer ? serverColor : nodeColor;
          ctx.shadowColor = n.isServer ? serverColor : nodeColor;
          ctx.shadowBlur = n.isServer ? 8 : 4;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Connect nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const m = nodes[j];
            const dx = n.x - m.x;
            const dy = n.y - m.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 125) {
              const alpha = (1 - dist / 125) * 0.28;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(m.x, m.y);
              ctx.strokeStyle = `${lineBaseColor} ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }

          // Connect to mouse
          if (dMouse < 140) {
            const alpha = (1 - dMouse / 140) * 0.45;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
            ctx.lineWidth = 1.2;
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
          ctx.fillStyle = isDark ? '#34d399' : '#047857';
          ctx.shadowColor = '#34d399';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
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

  // Project Card 3D Tilt
  function initCardTilt() {
    if (isReducedMotion) return;
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // Scroll Stagger Reveal
  function initScrollReveal() {
    if (isReducedMotion) return;

    // Apply stagger class & delays
    document.querySelectorAll('.skill-category-card').forEach((el, i) => {
      el.classList.add('stagger-item');
      el.style.transitionDelay = `${i * 70}ms`;
    });

    document.querySelectorAll('.projects-grid .project-card').forEach((el, i) => {
      el.classList.add('stagger-item');
      el.style.transitionDelay = `${(i % 3) * 90}ms`;
    });

    document.querySelectorAll('.timeline-item').forEach((el, i) => {
      el.classList.add('stagger-item');
      el.style.transitionDelay = `${i * 100}ms`;
    });

    document.querySelectorAll('.cert-card').forEach((el, i) => {
      el.classList.add('stagger-item');
      el.style.transitionDelay = `${(i % 3) * 70}ms`;
    });

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stagger-item').forEach(el => revealObs.observe(el));
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
  <span class="term-cyan">whoami</span>    - Información del perfil profesional
  <span class="term-cyan">skills</span>    - Stack de virtualización, servidores y redes
  <span class="term-cyan">certs</span>     - Certificaciones oficiales Microsoft y Stratio
  <span class="term-cyan">pfg</span>       - Detalles del Proyecto Fin de Grado ASIR
  <span class="term-cyan">neofetch</span>  - Telemetría y especificaciones del sistema
  <span class="term-cyan">ping</span>      - Simulación de conectividad ICMP
  <span class="term-cyan">contact</span>   - Canales directos de contacto
  <span class="term-cyan">clear</span>     - Limpiar pantalla
  <span class="term-cyan">exit</span>      - Cerrar consola`,

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
