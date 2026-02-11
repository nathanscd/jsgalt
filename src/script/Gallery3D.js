window.initGallery3D = () => {
  const cards = document.querySelectorAll('.photo-card');
  
  // Se não houver cards na tela, sai da função para não dar erro
  if (cards.length === 0) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      card.style.setProperty('--rotate-y', `${x / 10}deg`);
      card.style.setProperty('--rotate-x', `${-y / 10}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rotate-y', `0deg`);
      card.style.setProperty('--rotate-x', `0deg`);
    });
  });
};