document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos ---
  const bookingSection = document.getElementById('bookingFormSection');
  const ticketSection = document.getElementById('ticketSection');
  const mainContainer = document.getElementById('mainContainer');
  const form = document.getElementById('busForm');
  const ticketsGallery = document.getElementById('ticketsGallery');
  
  const tripOptions = document.querySelectorAll('.trip-option');
  const selectedTypeInput = document.getElementById('selectedTripType');
  const selectedPriceInput = document.getElementById('selectedTripPrice');
  
  const seatInput = document.getElementById('seatCount');
  const totalPriceDisplay = document.getElementById('totalPriceDisplay');
  const extraPassengersContainer = document.getElementById('extraPassengersContainer');

  const printBtn = document.getElementById('printBtn');
  const newReservaBtn = document.getElementById('newReservaBtn');

  // --- Estado ---
  let currentPrice = 35;
  
  // --- Funções Auxiliares ---
  const generateTicketId = () => Math.random().toString(36).substr(2, 9).toUpperCase();

  const formatCurrency = (val) => {
    return `R$ ${val.toFixed(2).replace('.', ',')}`;
  };

  const updateTotal = () => {
    const seats = parseInt(seatInput.value) || 1;
    const total = seats * currentPrice;
    totalPriceDisplay.textContent = formatCurrency(total);
  };

  const renderExtraPassengers = () => {
    const seats = parseInt(seatInput.value) || 1;
    const currentExtras = extraPassengersContainer.children.length;
    const neededExtras = seats - 1;

    // Se precisar adicionar campos
    if (neededExtras > currentExtras) {
      for (let i = currentExtras; i < neededExtras; i++) {
        const row = document.createElement('div');
        row.className = 'passenger-row';
        row.innerHTML = `
          <div class="input-group">
            <label>Nome Passageiro ${i + 2}</label>
            <input type="text" name="extraName_${i}" required />
          </div>
          <div class="input-group">
            <label>WhatsApp</label>
            <input type="tel" name="extraPhone_${i}" required />
          </div>
        `;
        extraPassengersContainer.appendChild(row);
      }
    } 
    // Se precisar remover campos (reduziu assentos)
    else if (neededExtras < currentExtras) {
      while (extraPassengersContainer.children.length > neededExtras) {
        extraPassengersContainer.removeChild(extraPassengersContainer.lastChild);
      }
    }
    updateTotal();
  };

  const createTicketHTML = (passenger) => {
    const typeLabel = selectedTypeInput.value === 'ida-volta' ? 'Ida/Volta' : 'Ida';
    
    return `
      <div class="ticket-card">
        <div class="ticket-header">
          <span class="ticket-type">Halleluya 2026 • ${typeLabel}</span>
          <span class="ticket-logo">BUS</span>
        </div>
        <div class="ticket-body">
          <div class="ticket-row">
            <div class="ticket-field">
              <label>Passageiro</label>
              <span>${passenger.name}</span>
            </div>
          </div>
          <div class="ticket-row">
            <div class="ticket-field">
              <label>Embarque</label>
              <span>IGREJA SÃO GERARDO</span>
            </div>
            <div class="ticket-field right">
              <label>Contato</label>
              <span>${passenger.phone}</span>
            </div>
          </div>
        </div>
        <div class="ticket-rip"></div>
        <div class="ticket-footer">
          <div class="qr-code" style="background: repeating-linear-gradient(45deg, #000 0, #000 2px, #fff 2px, #fff 4px);"></div>
          <span class="ticket-id">#${passenger.id}</span>
        </div>
      </div>
    `;
  };

  // --- Event Listeners ---

  // 1. Troca de Tipo de Viagem
  tripOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      // Remove active de todos
      tripOptions.forEach(o => o.classList.remove('active'));
      // Add active no clicado
      opt.classList.add('active');
      
      // Atualiza valores hidden
      const type = opt.getAttribute('data-type');
      const price = parseFloat(opt.getAttribute('data-price'));
      
      selectedTypeInput.value = type;
      selectedPriceInput.value = price;
      currentPrice = price;
      
      updateTotal();
    });
  });

  // 2. Mudança de Assentos
  seatInput.addEventListener('input', renderExtraPassengers);

  // 3. Submissão do Formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Coletar Passageiro Principal
    const passengers = [];
    passengers.push({
      id: generateTicketId(),
      name: document.getElementById('mainName').value,
      phone: document.getElementById('mainPhone').value
    });

    // Coletar Passageiros Extras
    const extraRows = extraPassengersContainer.querySelectorAll('.passenger-row');
    extraRows.forEach(row => {
      const inputs = row.querySelectorAll('input');
      passengers.push({
        id: generateTicketId(),
        name: inputs[0].value,
        phone: inputs[1].value
      });
    });

    // Gerar HTML dos Tickets
    ticketsGallery.innerHTML = passengers.map(createTicketHTML).join('');

    // Trocar View
    bookingSection.style.display = 'none';
    ticketSection.style.display = 'block';
    mainContainer.classList.add('wide-mode');
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 4. Ações Finais
  printBtn.addEventListener('click', () => {
    window.print();
  });

  newReservaBtn.addEventListener('click', () => {
    // Resetar
    form.reset();
    extraPassengersContainer.innerHTML = '';
    tripOptions[0].click(); // Volta para padrão
    
    // Trocar View
    ticketSection.style.display = 'none';
    bookingSection.style.display = 'block';
    mainContainer.classList.remove('wide-mode');
  });

  // Inicialização
  updateTotal();
});