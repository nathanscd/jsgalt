class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;700;800&family=Syne:wght@700;800&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :host {
          display: flex;
          align-items: center;
          gap: 20px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 20px 70px;
          background: transparent;
          transition: all 0.5s ease;
          z-index: 1000;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        :host(.scrolled) {
          padding: 10px 40px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .Title {
          font-size: medium;
          font-weight: bold;
          text-transform: uppercase;
          margin-left: 0;
          margin-right: auto;
          color: #ededed; 
        }

        .nav-link {
          overflow: hidden;
          position: relative;
          display: inline-block;
          color: #ededed;
          text-decoration: none;
          font-size: medium;
          font-weight: bold;
          text-transform: uppercase;
          padding: 10px 5px;
        }

        .nav-link span {
          display: block;
          transition: transform 0.3s ease;
        }

        .nav-link::after {
          content: attr(data-replace);
          position: absolute;
          top: 100%;
          left: 0;
          padding: 10px 5px;
          color: #a054d6;
          transition: transform 0.3s ease;
        }

        .nav-link:hover span {
          transform: translateY(-152%);
        }

        .nav-link:hover::after {
          transform: translateY(-110%);
        }
      </style>

      <h1 class="Title">Juventude São Gerardo</h1>
      <a href="/src/pages/LandingPage.html" class="nav-link" data-replace="Início"><span>Início</span></a>
      <a href="/src/pages/About.html" class="nav-link" data-replace="Quem Somos"><span>Quem Somos</span></a>
      <a href="/src/pages/Events.html" class="nav-link" data-replace="Eventos"><span>Eventos</span></a>
      <a href="/src/pages/Gallery.html" class="nav-link" data-replace="Fotos"><span>Fotos</span></a>
      <a href="/src/pages/Contact.html" class="nav-link" data-replace="Contato"><span>Contato</span></a>
    `;
  }
}

customElements.define('header-component', Header);