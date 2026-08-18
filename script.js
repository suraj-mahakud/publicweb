/* ===== Vivek Aluminium Fabricator - Main Script ===== */

// ---------- Navbar ----------
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ---------- Three.js Hero Canvas ----------
(function initHero3D() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 28;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Lights
  const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(10, 15, 10);
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0x00d4ff, 1.5, 80);
  pointLight.position.set(-10, 5, 15);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0xa0a0c0, 0.8, 60);
  pointLight2.position.set(15, -8, 10);
  scene.add(pointLight2);

  // Metallic material (aluminium-like)
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xc8c8d0,
    metalness: 0.95,
    roughness: 0.18,
    envMapIntensity: 1.2
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    metalness: 0.7,
    roughness: 0.25,
    emissive: 0x003344,
    emissiveIntensity: 0.3
  });

  // Create abstract aluminium profiles / bars
  const group = new THREE.Group();
  scene.add(group);

  // Long rectangular profiles (like extrusion bars)
  function createBar(w, h, d, mat) {
    const geo = new THREE.BoxGeometry(w, h, d);
    return new THREE.Mesh(geo, mat);
  }

  // Central structure - interlocking bars
  const bars = [];
  const positions = [
    { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, s: [8, 0.6, 0.6] },
    { x: 0, y: 2.5, z: 0, rx: 0, ry: 0.3, rz: 0, s: [6, 0.5, 0.5] },
    { x: 0, y: -2.5, z: 0, rx: 0, ry: -0.3, rz: 0, s: [6, 0.5, 0.5] },
    { x: 3, y: 0, z: 1, rx: 0.4, ry: 0, rz: 0.5, s: [0.5, 5, 0.5] },
    { x: -3, y: 0, z: -1, rx: -0.3, ry: 0, rz: -0.4, s: [0.5, 5, 0.5] },
    { x: 0, y: 0, z: 2.5, rx: 0, ry: 0.6, rz: 0.2, s: [5, 0.4, 0.4] },
    { x: 1.5, y: 1.5, z: -2, rx: 0.5, ry: 0.2, rz: 0, s: [4, 0.35, 0.35] },
    { x: -2, y: -1.2, z: 1.5, rx: -0.2, ry: -0.4, rz: 0.3, s: [4.5, 0.4, 0.4] }
  ];

  positions.forEach((p, i) => {
    const mat = i % 3 === 0 ? accentMat : metalMat;
    const bar = createBar(...p.s, mat);
    bar.position.set(p.x, p.y, p.z);
    bar.rotation.set(p.rx, p.ry, p.rz);
    group.add(bar);
    bars.push(bar);
  });

  // Floating rings (like frames / profiles)
  const ringGeo = new THREE.TorusGeometry(3.5, 0.15, 16, 64);
  const ring1 = new THREE.Mesh(ringGeo, metalMat);
  ring1.rotation.x = Math.PI / 2.5;
  group.add(ring1);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5, 0.12, 16, 80), accentMat);
  ring2.rotation.x = Math.PI / 3;
  ring2.rotation.y = 0.4;
  group.add(ring2);

  // Small spheres as joints / rivets
  const sphereGeo = new THREE.SphereGeometry(0.25, 16, 16);
  for (let i = 0; i < 12; i++) {
    const sphere = new THREE.Mesh(sphereGeo, i % 2 ? accentMat : metalMat);
    const angle = (i / 12) * Math.PI * 2;
    const r = 4 + Math.random() * 3;
    sphere.position.set(
      Math.cos(angle) * r,
      (Math.random() - 0.5) * 6,
      Math.sin(angle) * r
    );
    group.add(sphere);
  }

  // Particles (sparks / metal dust)
  const particleCount = 180;
  const particlesGeo = new THREE.BufferGeometry();
  const positionsArr = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    positionsArr[i * 3] = (Math.random() - 0.5) * 40;
    positionsArr[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positionsArr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    velocities.push({
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02
    });
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positionsArr, 3));

  const particlesMat = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 0.08,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);

  // Mouse interaction
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Resize
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onResize);

  // Animation loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Rotate main group slowly
    group.rotation.y = t * 0.12;
    group.rotation.x = Math.sin(t * 0.2) * 0.08;

    // Individual bar subtle motion
    bars.forEach((bar, i) => {
      bar.rotation.z += 0.002 * (i % 2 ? 1 : -1);
    });

    // Rings
    ring1.rotation.z = t * 0.15;
    ring2.rotation.z = -t * 0.1;

    // Mouse parallax
    targetX += (mouseX * 3 - targetX) * 0.05;
    targetY += (mouseY * 2 - targetY) * 0.05;
    group.position.x = targetX;
    group.position.y = targetY;

    // Particles drift
    const pos = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      pos[i * 3 + 2] += velocities[i].z;

      // Wrap around
      if (Math.abs(pos[i * 3]) > 25) velocities[i].x *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 20) velocities[i].y *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 20) velocities[i].z *= -1;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y = t * 0.02;

    // Subtle camera float
    camera.position.x = Math.sin(t * 0.1) * 1.5;
    camera.position.y = Math.cos(t * 0.15) * 0.8;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
})();

// ---------- Scroll Animations (GSAP) ----------
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // About content
  gsap.from('.about-content', {
    scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
    x: -50,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out'
  });
  gsap.from('.about-card', {
    scrollTrigger: { trigger: '.about-card', start: 'top 80%' },
    x: 50,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out'
  });

  // Service cards stagger
  gsap.from('.service-card', {
    scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
    y: 60,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out'
  });

  // Gallery items
  gsap.from('.gallery-item', {
    scrollTrigger: { trigger: '.gallery-grid', start: 'top 80%' },
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  });

  // Contact
  gsap.from('.info-card', {
    scrollTrigger: { trigger: '.contact-wrapper', start: 'top 80%' },
    x: -40,
    opacity: 0,
    duration: 0.8
  });
  gsap.from('.enquiry-form', {
    scrollTrigger: { trigger: '.contact-wrapper', start: 'top 80%' },
    x: 40,
    opacity: 0,
    duration: 0.8
  });
}

// ---------- Stats Counter ----------
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target;
    }
    requestAnimationFrame(update);
  });
}

const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(aboutSection);
}

// ---------- Form Handling ----------
const form = document.getElementById('enquiryForm');
const modal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');

    btnText.hidden = true;
    btnLoader.hidden = false;
    btn.disabled = true;

    // Simulate submission (in production, send to backend / email service)
    setTimeout(() => {
      btnText.hidden = false;
      btnLoader.hidden = true;
      btn.disabled = false;
      form.reset();
      modal.hidden = false;
    }, 1200);
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.hidden = true;
  });
}

modal?.addEventListener('click', (e) => {
  if (e.target === modal) modal.hidden = true;
});

// ---------- Simple tilt effect on service cards ----------
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
