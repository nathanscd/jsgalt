document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const resetBtn = document.getElementById('resetBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Estado: Enviando
    submitBtn.disabled = true;
    btnText.textContent = 'Enviando...';
    
    // Simula envio (2 segundos)
    setTimeout(() => {
      // Esconde form, mostra sucesso
      form.style.display = 'none';
      successMessage.style.display = 'flex';
      
      // Reseta o botão para uso futuro
      submitBtn.disabled = false;
      btnText.textContent = 'ENVIAR MENSAGEM';
      form.reset();
    }, 2000);
  });

  resetBtn.addEventListener('click', () => {
    // Esconde sucesso, mostra form
    successMessage.style.display = 'none';
    form.style.display = 'block';
  });
});