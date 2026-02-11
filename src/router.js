const routes = {
  '': { html: 'LandingPage.html', init: () => window.initClassChange?.() },
  'about': { html: 'We.html', init: null },
  'events': { html: 'Events.html', init: null },
  'gallery': { html: 'Fotos.html', init: () => window.initGallery3D?.() },
  'contact': { html: 'Contato.html', init: () => window.initContactLogic?.() },
  'join': { html: 'JoinUs.html', init: null },
  'bus': { html: 'HalleluyaBus.html', init: () => window.initBusFormLogic?.() }
};

const navigate = async () => {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const route = routes[hash] || routes[''];
  const root = document.getElementById('root');

  if (!root) return;

  try {
    const response = await fetch(`src/pages/${route.html}`);
    if (!response.ok) throw new Error('Falha ao carregar página');
    
    const html = await response.text();
    
    root.innerHTML = ''; 
    root.innerHTML = html;
    
    // 3. Reset do Scroll usando Lenis (Imediato para não ver o rastro da página anterior)
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    if (route.init) {
      setTimeout(route.init, 50);
    }

  } catch (err) {
    console.error("Router Error:", err);
    root.innerHTML = `<div style="color:white;text-align:center;margin-top:100px;">
      <h2>Erro ao carregar página</h2>
      <a href="#/" style="color:#a054d6">Voltar ao início</a>
    </div>`;
  }
};

window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);

// --- Inicialização do Lenis (Smooth Scroll Luxuoso) ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
window.lenis = lenis;